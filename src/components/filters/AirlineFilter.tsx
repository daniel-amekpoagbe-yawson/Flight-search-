
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
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Airlines</label>
      <div className="max-h-48 overflow-y-auto space-y-2">
        {airlines.map((code) => (
          <label key={code} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(code)}
              onChange={() => toggleAirline(code)}
              className="mr-2 h-4 w-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">{getAirlineName(code)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};