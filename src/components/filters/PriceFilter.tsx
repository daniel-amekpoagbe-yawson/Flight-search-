import React from 'react';

interface PriceFilterProps {
  value: [number, number];
  min: number;
  max: number;
  onChange: (value: [number, number]) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  value,
  min,
  max,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Price Range</label>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">
            ${value[0].toLocaleString()} — ${value[1].toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 pt-2">
        {/* Min slider */}
        <div>
          <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            onChange={(e) => onChange([Number(e.target.value), value[1]])}
            className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
        </div>
        
        {/* Max slider */}
        <div>
          <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            onChange={(e) => onChange([value[0], Number(e.target.value)])}
            className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
        </div>
      </div>
    </div>
  );
};