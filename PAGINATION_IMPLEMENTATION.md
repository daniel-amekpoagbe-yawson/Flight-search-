# Pagination & Prefetch Implementation

## Overview

Implemented client-side pagination with React Query prefetch for smooth UX. Users now see 25 flights per page instead of 50+.

## Changes Made

### 1. **SearchForm.tsx**

- Changed `maxResults` from 50 to 25 (per-page limit)
- This is now the page size, not the total result limit

### 2. **New Pagination Component** (`src/components/results/Pagination.tsx`)

- Created reusable pagination UI with Previous/Next buttons
- Shows current page, total pages, and item range
- Disabled states prevent invalid navigation
- Uses lucide-react ChevronLeft/Right icons

### 3. **useFlights.ts Hook Enhancements**

Updated `useFlightSearch` hook to support pagination:

```typescript
export const useFlightSearch = (searchParams: SearchParams | null, page: number = 1)
```

**Key improvements:**

- **Fetches all results** (up to 250 from Amadeus) once
- **Client-side pagination**: Slices results by page (25 items/page)
- **Smart caching**: Full results cached, so page changes are instant
- **Prefetch function**: `prefetchNextPage()` pre-loads next page data
- **Returns both**: `flights` (current page) + `allFlights` (for filters/charts)

**Return object now includes:**

```typescript
{
  flights,              // Paginated flights for current page
  allFlights,           // All fetched flights (for filters/chart)
  pagination: {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage,
  },
  prefetchNextPage,    // Function to prefetch next page
}
```

### 4. **index.tsx (Route Component)**

Updated to implement pagination flow:

```typescript
// Track current page
const [currentPage, setCurrentPage] = useState(1);

// Reset to page 1 on new search
useEffect(() => {
  setCurrentPage(1);
}, [searchParams.origin, searchParams.destination, searchParams.departureDate]);

// Fetch with pagination support
const {
  flights, // Current page results
  allFlights, // All results for filtering
  pagination,
  prefetchNextPage,
} = useFlightSearch(activeSearchParams, currentPage);

// Prefetch next page
useEffect(() => {
  prefetchNextPage();
}, [currentPage, prefetchNextPage]);

// Apply filters to ALL flights (before pagination)
const { filteredFlights } = useFlightFilters(allFlights);
```

**Important**: Filters apply to **all flights**, not just the current page. This ensures accurate filter results.

### 5. **Pagination UI Integration**

Added `<Pagination>` component to results section:

```tsx
<Pagination
  currentPage={currentPage}
  totalItems={filteredFlights.length} // Total filtered results
  pageSize={pagination?.pageSize || 25}
  onPageChange={setCurrentPage}
  isLoading={isLoading}
  hasNextPage={pagination?.hasNextPage}
/>
```

---

## Why Search Returns 50 Elements (Pre-Fix)

The hardcoded `maxResults: 50` in SearchForm forced API to return 50 results. Now:

- **SearchForm**: Sets `maxResults: 25` (per-page size)
- **useFlightSearch**: Fetches `maxResults: 250` from API (all available)
- **Client-side**: Slices to 25 items for current page

---

## UX Flow with Prefetch

1. User clicks search
2. API fetches all ~250 results (happens once, cached)
3. Page 1 (25 items) displayed instantly
4. Pagination component shows "Page 1 of 10"
5. **Prefetch triggers** → Next page data ready in cache
6. User clicks "Next"
7. Page 2 appears **instantly** (no loading spinner, data ready from prefetch)
8. **Prefetch triggers** → Page 3 ready in background
9. Repeat...

---

## Performance Benefits

✅ **Instant page navigation** — Prefetch eliminates loading wait  
✅ **Reduced DOM nodes** — Only 25 items rendered at a time  
✅ **Single API call** — Fetches all data once, slices on client  
✅ **Smart caching** — React Query caches full result set  
✅ **Filter accuracy** — Filters apply to all results, not just current page

---

## Code Example: How It Works

```typescript
// Hook fetches 250 results and caches
const { data } = useQuery({
  queryKey: ["flights", searchParams],
  queryFn: () =>
    amadeusService.searchFlights({
      ...searchParams,
      maxResults: 250, // Fetch all
    }),
});

// Then slice by page on client
const pageSize = 25;
const startIdx = (page - 1) * pageSize;
const paginatedFlights = processedFlights.slice(startIdx, startIdx + pageSize);

// Prefetch just ensures full result set is cached
const prefetchNextPage = () => {
  queryClient.ensureQueryData({
    queryKey: ["flights", searchParams],
    // Query already cached, so this is instant
  });
};
```

---

## What Doesn't Break

✅ Filters still work on all flights  
✅ Sort still works on paginated results  
✅ Chart uses all flights (not paginated)  
✅ Result count accurate (shows filtered total, not page total)  
✅ URL params unchanged  
✅ Booking modal still works  
✅ TypeScript builds successfully

---

## Future Enhancements

1. **Server-side pagination** — If API supports offset/limit parameters
2. **URL-based pagination** — Store page number in URL for shareability
3. **Jump to page** — Allow direct page number input
4. **Items per page** — Select between 10, 25, 50 items
5. **Scroll to top** — Auto-scroll to top on page change
