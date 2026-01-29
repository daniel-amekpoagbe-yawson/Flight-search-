
import React from 'react';

interface StopsFilterProps {
  value: ('0' | '1' | '2+')[];
  onChange: (value: ('0' | '1' | '2+')[]) => void;
}

export const StopsFilter: React.FC<StopsFilterProps> = ({ value, onChange }) => {
  const options = [
    { value: '0' as const, label: 'Non-stop' },
    { value: '1' as const, label: '1 Stop' },
    { value: '2+' as const, label: '2+ Stops' },
  ];

  const toggleStop = (stop: '0' | '1' | '2+') => {
    if (value.includes(stop)) {
      onChange(value.filter((s) => s !== stop));
    } else {
      onChange([...value, stop]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-normal text-gray-900">Stops</label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => toggleStop(option.value)}
              className="mr-3 h-4 w-4 accent-black rounded cursor-pointer"
            />
            <span className="text-sm font-normal text-gray-900 group-hover:text-black transition-colors">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};