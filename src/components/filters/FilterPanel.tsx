import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PriceFilter } from './PriceFilter';
import { StopsFilter } from './StopsFilter';
import { AirlineFilter } from './AirlineFilter';
import { TimeFilter } from './TimeFilter';
import type { FilterState } from '../../types/flight';

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
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              ✕ Clear
            </Button>
          )}
        </div>

        {/* Result count */}
        <div className="text-base font-normal text-gray-800 px-2 py-2 bg-gray-50 rounded-lg text-center">
          {resultCount} flight{resultCount !== 1 ? 's' : ''} found
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Price Filter */}
        <PriceFilter
          value={filters.priceRange}
          min={filterOptions.priceRange[0]}
          max={filterOptions.priceRange[1]}
          onChange={(value) => updateFilter('priceRange', value)}
        />

        <div className="border-t border-gray-100" />

        {/* Departure Time Filter */}
        <TimeFilter
          label="Departure Time"
          value={filters.departureTimeRange}
          onChange={(value) => updateFilter('departureTimeRange', value)}
        />

        <div className="border-t border-gray-100" />

        {/* Arrival Time Filter */}
        <TimeFilter
          label="Arrival Time"
          value={filters.arrivalTimeRange}
          onChange={(value) => updateFilter('arrivalTimeRange', value)}
        />

        <div className="border-t border-gray-100" />

        {/* Stops Filter */}
        <StopsFilter
          value={filters.stops}
          onChange={(value) => updateFilter('stops', value)}
        />

        <div className="border-t border-gray-100" />

        {/* Airline Filter */}
        <AirlineFilter
          airlines={filterOptions.airlines}
          selected={filters.airlines}
          onChange={(value) => updateFilter('airlines', value)}
          dictionaries={dictionaries}
        />
      </div>
    </Card>
  );
};