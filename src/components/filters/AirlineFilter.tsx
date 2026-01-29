
import React from 'react';

interface AirlineFilterProps {
  airlines: string[];
  selected: string[];
  onChange: (airlines: string[]) => void;
  dictionaries?: Record<string, string>;
}

export const AirlineFilter: React.FC<AirlineFilterProps> = ({
  airlines,
  selected,
  onChange,
  dictionaries,
}) => {
  const toggleAirline = (code: string) => {
    if (selected.includes(code)) {
      onChange(selected.filter((a) => a !== code));
    } else {
      onChange([...selected, code]);
    }
  };

  const getAirlineName = (code: string) => {
    return dictionaries?.[code] || code;
  };

  return (
    <div className="space-y-4">
      <label className="text-xs font-semibold uppercase tracking-wide text-gray-900">Airlines</label>
      <div className="max-h-56 overflow-y-auto space-y-2 pr-2">
        {airlines.map((code) => (
          <label key={code} className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(code)}
              onChange={() => toggleAirline(code)}
              className="mr-3 h-4 w-4 accent-black rounded cursor-pointer"
            />
            <span className="text-sm font-normal text-gray-900 group-hover:text-black transition-colors">{getAirlineName(code)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};