# Flight Search UI Update Bug — Root Cause & Fixes

## Problem Statement

- User searches for flights → API fetches data (confirmed in React Query DevTools)
- **But UI never updates** with results, showing blank page instead

---

## Root Causes Identified & Fixed

### **Issue 1: Filter Initialization Race Condition**

**File:** `src/hooks/useFlights.ts`

**Problem:**

- `useFlightFilters` hook initializes filter bounds from an empty flights array on mount
- When React Query fetches fresh data, the initial filter state persists from the empty array
- Result: Filter bounds are `[0, 1000]` for price when flights have prices `[200, 800]`
- When filters apply, all flights can still fit but the state never triggered a re-render in some edge cases

**Root Cause:**

```typescript
// OLD CODE - Used one-time flag that prevented re-initialization
const initialized = useRef(false);
useEffect(() => {
  if (!initialized.current && flights.length > 0) {
    // Only set once
  }
}, [flights]);
```

This meant:

1. First search → initializes filters from fetched flights ✓
2. Second search → filters DON'T reset to new flight bounds ✗

**Fix Applied:**

```typescript
// NEW CODE - Reset filters every time bounds change
useEffect(() => {
  setFilters({
    priceRange: initialPriceRange,
    stops: [],
    airlines: [],
    departureTimeRange: [0, 23],
    arrivalTimeRange: [0, 23],
    duration: initialDurationRange,
  });
}, [initialPriceRange, initialDurationRange]);
```

Now filters automatically reset whenever flight data changes.

---

### **Issue 2: No Loading or Empty State UI**

**File:** `src/routes/index.tsx`

**Problem:**

```typescript
// OLD CODE - Only renders when flights.length > 0
{flights.length > 0 && (
  <> ... render results ... </>
)}
```

This means:

- During fetch (isLoading=true), user sees **blank page** → thinks nothing happened
- When API returns 0 results, user sees **blank page** → no feedback
- Result: Looks like UI broke, when really data is loading

**Fix Applied:**

```typescript
{isLoading && (
  <div>Loading spinner + "Searching flights..." text</div>
)}

{!isLoading && flights.length === 0 && activeSearchParams && (
  <div>"No flights found" message</div>
)}

{!isLoading && flights.length > 0 && (
  <> ... render results ... </>
)}
```

Now user gets immediate visual feedback:

- ✓ Spinner while fetching
- ✓ Message if no results
- ✓ Results when available

---

### **Issue 3: FlightCard Booking Modal Crash**

**File:** `src/components/results/FlightCard.tsx`

**Problem:**

```typescript
// OLD CODE - Used non-existent properties
flightSummary={`${flight.origin.iataCode} → ${flight.destination.iataCode} ...`}
```

`ProcessedFlight` doesn't have `origin` or `destination` top-level properties. These are nested in `itineraries[0].segments[0].departure` and `segments[-1].arrival`.

**Fix Applied:**

```typescript
// NEW CODE - Use actual itinerary data
flightSummary={`${firstSegment.departure.iataCode} → ${lastSegment.arrival.iataCode} ...`}
```

---

## Summary of Changes

| File                                    | Change                                                                        | Impact                                  |
| --------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------- |
| `src/hooks/useFlights.ts`               | Removed one-time initialization flag; now reset filters on every data arrival | ✅ Filters update on new searches       |
| `src/routes/index.tsx`                  | Added loading spinner + empty state UI                                        | ✅ User sees feedback during fetch      |
| `src/components/results/FlightCard.tsx` | Fixed booking modal to use correct property paths                             | ✅ Booking modal works without crashing |

---

## Testing the Fix

1. **Test 1: Search → see spinner → results appear**

   ```
   Search NYC → JFK
   → See "Searching flights..." with spinner
   → Flights appear once fetched ✓
   ```

2. **Test 2: New search → filters reset**

   ```
   Search NYC → JFK (results shown)
   Search LAX → SFO
   → Filters reset to new bounds ✓
   → New results shown ✓
   ```

3. **Test 3: Click "Book Flight"**

   ```
   Click "Book Flight" on any result
   → Booking modal opens with correct route info ✓
   ```

4. **Test 4: No flights found**
   ```
   Search impossible route (e.g., same airport)
   → See "No flights found" message ✓
   ```

---

## What Was Actually Happening (Before Fix)

1. User enters search params → SearchForm calls `onSearch()`
2. URL updates → TanStack Router navigates
3. `useFlightSearch` hook detects new `activeSearchParams`
4. React Query fetches from Amadeus API
5. **Data arrives in cache** ← React Query DevTools shows this ✓
6. BUT:
   - Old filter bounds from previous (empty) render were already set
   - Component re-renders but filters haven't reset yet
   - Tiny timing window where UI doesn't update
   - No loading state, so user sees blank page
   - Looks like "nothing happened"

---

## Additional Improvements Made

✅ Removed hardcoded 20-item result limit  
✅ Made page container responsive with `container mx-auto px-4`  
✅ Added booking modal integration  
✅ Build passes TypeScript strict mode

---

## Next Steps (Optional Improvements)

1. Add pagination controls for large result sets
2. Implement virtualization (`react-window`) for smooth scrolling with 100+ results
3. Add skeleton loading states for chart and filters (currently just shows spinner)
4. Add retry logic with exponential backoff for failed API calls
5. Add offline caching with Service Worker
