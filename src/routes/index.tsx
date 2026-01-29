import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import type { SearchParams } from '../types/flight';
import { useFlightFilters, useFlightSearch, useFlightSort, usePriceTrend } from '../hooks/useFlights';
import { useSearchParamsURL } from '../hooks/useLocalStorage';
import { SearchForm } from '../components/search/SearchForm';
import { PriceChart } from '../components/charts/PriceChart';
import { FilterPanel } from '../components/filters/FilterPanel';
import { FlightList } from '../components/results/FlightList';
import { SortControls } from '../components/results/SortControls';

function FlightSearchPage() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const { getQueryParams, setQueryParams } = useSearchParamsURL();

  // Initialize from URL if available
  useEffect(() => {
    const urlParams = getQueryParams();
    if (urlParams && !searchParams) {
      setSearchParams(urlParams);
    }
  }, [getQueryParams, searchParams]);

  // Update URL when search params change
  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setQueryParams(params);
  };

  // Fetch flights
  const { flights, dictionaries, isLoading, error } = useFlightSearch(searchParams);

  // Apply filters
  const { filters, filteredFlights, updateFilter, resetFilters, filterOptions, hasActiveFilters } =
    useFlightFilters(flights);

  // Sort results
  const { sortedFlights, sortField, sortDirection, toggleSort } = useFlightSort(filteredFlights);

  // Generate price trend data
  const priceTrend = usePriceTrend(flights, filteredFlights);

  return (
    <div className="space-y-4">
      {/* Search Form */}
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
          <p className="text-sm font-semibold text-red-900">✕ Error</p>
          <p className="text-red-800 font-medium mt-2">{error.message}</p>
        </div>
      )}

      {/* Results Section */}
      {flights.length > 0 && (
        <>
          {/* Price Chart */}
          <PriceChart priceTrend={priceTrend} />

          {/* Filters and Results */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Filter Panel - Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
                hasActiveFilters={hasActiveFilters}
                filterOptions={filterOptions}
                dictionaries={dictionaries?.carriers}
                resultCount={filteredFlights.length}
              />
            </div>

            {/* Flight Results */}
            <div className="lg:col-span-3">
              <SortControls
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={toggleSort}
              />
              <FlightList flights={sortedFlights} dictionaries={dictionaries} isLoading={isLoading} />
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