# Flight Search Engine - Complete Implementation Guide

## 🎯 Quick Start (10 Hours Remaining)

### Time Allocation
- ✅ Setup & Structure: DONE (30 mins)
- ✅ API & Types: DONE (1 hour)
- ✅ Utilities & Hooks: DONE (1 hour)
- ⏳ Filter Components: 1.5 hours (NEXT)
- ⏳ Results Display: 1.5 hours
- ⏳ Price Chart: 1 hour
- ⏳ Main App & Routing: 1 hour
- ⏳ Styling & Polish: 1.5 hours
- ⏳ Deployment & Demo: 1 hour

---

## 📂 Project Structure (Created)

```
src/
├── types/index.ts               ✅ DONE
├── services/amadeus.ts          ✅ DONE
├── utils/helpers.ts             ✅ DONE
├── hooks/useFlights.ts          ✅ DONE
├── components/
│   ├── ui/                      ✅ DONE
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Select.tsx
│   ├── search/                  ✅ DONE
│   │   └── SearchForm.tsx
│   ├── filters/                 ⏳ CREATE NEXT
│   │   ├── FilterPanel.tsx
│   │   ├── PriceFilter.tsx
│   │   ├── StopsFilter.tsx
│   │   ├── AirlineFilter.tsx
│   │   └── TimeFilter.tsx
│   ├── results/                 ⏳ CREATE
│   │   ├── FlightList.tsx
│   │   ├── FlightCard.tsx
│   │   └── SortControls.tsx
│   └── charts/                  ⏳ CREATE
│       └── PriceChart.tsx
├── routes/                      ⏳ CREATE
│   └── __root.tsx
│   └── index.tsx
└── main.tsx                     ⏳ CREATE
```

---

## 🚀 Next Steps - Filter Components (1.5 hours)

### 1. Create `src/components/filters/PriceFilter.tsx`

```tsx
/**
 * PriceFilter Component
 * Dual range slider for min/max price filtering
 */


```

### 2. Create `src/components/filters/StopsFilter.tsx`

```tsx
/**
 * StopsFilter Component
 * Checkbox group for filtering by number of stops
 */

```

### 3. Create `src/components/filters/AirlineFilter.tsx`

```tsx
/**
 * AirlineFilter Component
 * Multi-select checkbox list for airline filtering
 */

```

### 4. Create `src/components/filters/FilterPanel.tsx`

```tsx
/**
 * FilterPanel Component
 * Main container for all filter controls
 * Responsive - sidebar on desktop, modal on mobile
 */

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PriceFilter } from './PriceFilter';
import { StopsFilter } from './StopsFilter';
import { AirlineFilter } from './AirlineFilter';
import type { FilterState } from '@/types';

interface FilterPanelProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  filterOptions: {
    airlines: string[];
    priceRange: [number, number];
    durationRange: [number, number];
  };
  dictionaries?: Record<string, string>;
  resultCount: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  updateFilter,
  resetFilters,
  hasActiveFilters,
  filterOptions,
  dictionaries,
  resultCount,
}) => {
  return (
    <Card className="sticky top-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Clear All
            </Button>
          )}
        </div>

        {/* Result count */}
        <div className="text-sm text-gray-600">
          {resultCount} flight{resultCount !== 1 ? 's' : ''} found
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Price Filter */}
        <PriceFilter
          value={filters.priceRange}
          min={filterOptions.priceRange[0]}
          max={filterOptions.priceRange[1]}
          onChange={(value) => updateFilter('priceRange', value)}
        />

        <div className="border-t border-gray-200" />

        {/* Stops Filter */}
        <StopsFilter
          value={filters.stops}
          onChange={(value) => updateFilter('stops', value)}
        />

        <div className="border-t border-gray-200" />

        {/* Airline Filter */}
        <AirlineFilter
          airlines={filterOptions.airlines}
          selected={filters.airlines}
          onChange={(value) => updateFilter('airlines', value)}
          dictionaries={dictionaries?.carriers}
        />
      </div>
    </Card>
  );
};
```

---

## 🎨 Results Components (1.5 hours)

### Create `src/components/results/FlightCard.tsx`

```tsx
/**
 * FlightCard Component
 * Displays individual flight offer with itinerary details
 */

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { ProcessedFlight } from '@/types';
import { formatDateTime, formatDuration, formatPrice, getTimeFromISO } from '@/utils/helpers';

interface FlightCardProps {
  flight: ProcessedFlight;
  dictionaries?: { carriers?: Record<string, string> };
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, dictionaries }) => {
  const itinerary = flight.itineraries[0];
  const firstSegment = itinerary.segments[0];
  const lastSegment = itinerary.segments[itinerary.segments.length - 1];

  const airlineName = dictionaries?.carriers?.[flight.mainAirline] || flight.mainAirline;

  return (
    <Card hover className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Flight details - Left side */}
        <div className="md:col-span-9 space-y-4">
          {/* Airline logo/name */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
              <span className="text-xs font-bold text-blue-600">
                {flight.mainAirline}
              </span>
            </div>
            <span className="text-sm text-gray-600">{airlineName}</span>
          </div>

          {/* Route information */}
          <div className="flex items-center space-x-4">
            {/* Departure */}
            <div className="flex-1">
              <div className="text-2xl font-bold">{getTimeFromISO(firstSegment.departure.at)}</div>
              <div className="text-sm text-gray-600">{firstSegment.departure.iataCode}</div>
            </div>

            {/* Duration and stops */}
            <div className="flex-1 text-center">
              <div className="text-sm text-gray-600">{formatDuration(flight.totalDuration)}</div>
              <div className="flex items-center justify-center my-2">
                <div className="h-px bg-gray-300 flex-1" />
                <div className="mx-2">
                  {flight.totalStops === 0 ? (
                    <span className="text-xs text-green-600 font-medium">Non-stop</span>
                  ) : (
                    <span className="text-xs text-gray-600">{flight.totalStops} stop{flight.totalStops > 1 ? 's' : ''}</span>
                  )}
                </div>
                <div className="h-px bg-gray-300 flex-1" />
              </div>
            </div>

            {/* Arrival */}
            <div className="flex-1 text-right">
              <div className="text-2xl font-bold">{getTimeFromISO(lastSegment.arrival.at)}</div>
              <div className="text-sm text-gray-600">{lastSegment.arrival.iataCode}</div>
            </div>
          </div>
        </div>

        {/* Price and CTA - Right side */}
        <div className="md:col-span-3 flex flex-col justify-between items-end">
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {formatPrice(flight.priceNumeric, flight.price.currency)}
            </div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
          
          <Button variant="primary" size="md" className="mt-4 md:mt-0">
            Select Flight
          </Button>
        </div>
      </div>
    </Card>
  );
};
```

### Create `src/components/results/FlightList.tsx`

```tsx
/**
 * FlightList Component
 * Container for flight results with sorting and empty states
 */

import React from 'react';
import { FlightCard } from './FlightCard';
import type { ProcessedFlight } from '@/types';

interface FlightListProps {
  flights: ProcessedFlight[];
  dictionaries?: { carriers?: Record<string, string> };
  isLoading?: boolean;
}

export const FlightList: React.FC<FlightListProps> = ({
  flights,
  dictionaries,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">✈️</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No flights found</h3>
        <p className="text-gray-500">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div>
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} dictionaries={dictionaries} />
      ))}
    </div>
  );
};
```

---

## 📊 Price Chart Component (1 hour)

### Create `src/components/charts/PriceChart.tsx`

```tsx
/**
 * PriceChart Component
 * Real-time price trend visualization using Recharts
 * Updates dynamically as filters are applied
 */

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/Card';
import type { PriceTrend } from '@/types';
import { formatPrice } from '@/utils/helpers';

interface PriceChartProps {
  priceTrend: PriceTrend;
  currency?: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({
  priceTrend,
  currency = 'USD',
}) => {
  // Group data by price buckets for cleaner visualization
  const chartData = useMemo(() => {
    const allPrices = priceTrend.current.map(d => d.price).sort((a, b) => a - b);
    const filteredPrices = priceTrend.filtered.map(d => d.price).sort((a, b) => a - b);

    // Create buckets
    const bucketSize = 50;
    const min = Math.floor(Math.min(...allPrices) / bucketSize) * bucketSize;
    const max = Math.ceil(Math.max(...allPrices) / bucketSize) * bucketSize;
    
    const buckets: Record<number, { all: number; filtered: number }> = {};
    
    for (let i = min; i <= max; i += bucketSize) {
      buckets[i] = { all: 0, filtered: 0 };
    }

    // Count flights in each bucket
    allPrices.forEach(price => {
      const bucket = Math.floor(price / bucketSize) * bucketSize;
      if (buckets[bucket]) buckets[bucket].all++;
    });

    filteredPrices.forEach(price => {
      const bucket = Math.floor(price / bucketSize) * bucketSize;
      if (buckets[bucket]) buckets[bucket].filtered++;
    });

    return Object.entries(buckets).map(([price, counts]) => ({
      price: Number(price),
      allFlights: counts.all,
      filtered: counts.filtered,
    }));
  }, [priceTrend]);

  return (
    <Card className="mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Price Distribution</h2>
        <div className="flex gap-6 text-sm">
          <div>
            <span className="text-gray-600">Average: </span>
            <span className="font-semibold">{formatPrice(priceTrend.average, currency)}</span>
          </div>
          <div>
            <span className="text-gray-600">Lowest: </span>
            <span className="font-semibold text-green-600">{formatPrice(priceTrend.lowest, currency)}</span>
          </div>
          <div>
            <span className="text-gray-600">Highest: </span>
            <span className="font-semibold text-red-600">{formatPrice(priceTrend.highest, currency)}</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="price" 
            tickFormatter={(value) => `$${value}`}
            label={{ value: 'Price', position: 'insideBottom', offset: -5 }}
          />
          <YAxis label={{ value: '# of Flights', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value) => [`${value} flights`, '']}
            labelFormatter={(value) => `Price: $${value}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="allFlights" 
            stroke="#9CA3AF" 
            strokeWidth={2}
            name="All Flights"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="filtered" 
            stroke="#3B82F6" 
            strokeWidth={3}
            name="Filtered"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
```

---

## 🏠 Main App & Routing (1 hour)

### Create `src/routes/__root.tsx`

```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">✈️ Flight Search</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  ),
});
```

### Create `src/routes/index.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { SearchForm } from '@/components/search/SearchForm';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { FlightList } from '@/components/results/FlightList';
import { PriceChart } from '@/components/charts/PriceChart';
import { useFlightSearch, useFlightFilters, useFlightSort, usePriceTrend } from '@/hooks/useFlights';
import type { SearchParams } from '@/types';

function FlightSearchPage() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  // Fetch flights
  const { flights, dictionaries, isLoading, error } = useFlightSearch(searchParams);

  // Apply filters
  const { filters, filteredFlights, updateFilter, resetFilters, filterOptions, hasActiveFilters } =
    useFlightFilters(flights);

  // Sort results
  const { sortedFlights } = useFlightSort(filteredFlights);

  // Generate price trend data
  const priceTrend = usePriceTrend(flights, filteredFlights);

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <SearchForm onSearch={setSearchParams} isLoading={isLoading} />

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error.message}</p>
        </div>
      )}

      {/* Results Section */}
      {flights.length > 0 && (
        <>
          {/* Price Chart */}
          <PriceChart priceTrend={priceTrend} />

          {/* Filters and Results */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Panel - Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
                hasActiveFilters={hasActiveFilters}
                filterOptions={filterOptions}
                dictionaries={dictionaries}
                resultCount={filteredFlights.length}
              />
            </div>

            {/* Flight Results */}
            <div className="lg:col-span-3">
              <FlightList flights={sortedFlights} dictionaries={dictionaries} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: FlightSearchPage,
});
```

### Create `src/main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import './index.css';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Create router
const router = createRouter({ routeTree });

// Type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
```

---

## 🎨 Styling (30 mins)

### Update `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom scrollbar */
@layer utilities {
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

/* Smooth animations */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
```

---

## 🚀 Deployment (1 hour)

### 1. Create `.env` file
```bash
VITE_AMADEUS_API_KEY=your_actual_api_key
VITE_AMADEUS_API_SECRET=your_actual_api_secret
VITE_AMADEUS_API_URL=https://test.api.amadeus.com/v2
```

### 2. Build & Deploy to Vercel

```bash
# Install dependencies
npm install

# Build
npm run build

# Test locally
npm run preview

# Deploy to Vercel
npx vercel --prod
```

### 3. Environment Variables on Vercel
Add your environment variables in Vercel dashboard:
- VITE_AMADEUS_API_KEY
- VITE_AMADEUS_API_SECRET
- VITE_AMADEUS_API_URL

---

## 🎥 Loom Demo Script (3-4 mins)

### Opening (30s)
"Hi! I'm Daniel, and I built this flight search engine. Let me walk you through the key features and technical decisions."

### Search & Results (1 min)
- Show airport autocomplete
- Execute a search
- Highlight real-time results loading

### Filtering & Price Graph (1.5 min)
- Demonstrate multiple simultaneous filters
- Show price graph updating in real-time
- Explain data visualization approach

### Technical Highlights (1 min)
- Mention React Query for caching
- TanStack Router for routing
- Recharts for visualization
- Component architecture
- Responsive design

### Closing (30s)
- Quick mobile demo
- Thank reviewers
- GitHub + Live link

---

## ✅ Final Checklist

- [ ] All components created
- [ ] Filters work simultaneously
- [ ] Price chart updates in real-time
- [ ] Fully responsive (mobile + desktop)
- [ ] Error handling implemented
- [ ] Loading states everywhere
- [ ] Clean, commented code
- [ ] GitHub repo with README
- [ ] Deployed to Vercel
- [ ] Loom demo recorded
- [ ] Submit within 4 days

---

## 💡 Extra Polish Ideas (If Time Permits)

1. **Skeleton loading states** for better UX
2. **Persist search in URL** for shareable links
3. **Compare flights** side-by-side
4. **Export results** to CSV
5. **Dark mode** toggle
6. **Keyboard shortcuts** for power users
7. **Animation** when applying filters
8. **Toast notifications** for errors

Good luck! 🚀