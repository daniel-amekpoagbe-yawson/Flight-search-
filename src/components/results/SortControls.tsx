import React from 'react';

interface SortControlsProps {
  sortField: 'price' | 'duration' | 'departure';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'price' | 'duration' | 'departure') => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  sortField,
  sortDirection,
  onSort,
}) => {

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
      <h3 className="text-base font-semibold text-gray-900">
        Sort Results
      </h3>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Sort by:</span>
        <div className="flex gap-2 flex-wrap">
          {(['price', 'duration', 'departure'] as const).map((field) => (
            <button
              key={field}
              onClick={() => onSort(field)}
              className={`px-4 py-2.5 rounded-lg text-sm font-normal transition-all duration-200 ${
                sortField === field
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {field === 'price' && 'Price'}
              {field === 'duration' && 'Duration'}
              {field === 'departure' && 'Departure'}
              {sortField === field && (
                <span className="ml-2">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
