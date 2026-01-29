import React from 'react';

interface TimeFilterProps {
  value: [number, number];
  label: string;
  onChange: (value: [number, number]) => void;
}

export const TimeFilter: React.FC<TimeFilterProps> = ({ value, label, onChange }) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= value[1]) {
      onChange([newMin, value[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= value[0]) {
      onChange([value[0], newMax]);
    }
  };

  const formatHour = (hour: number): string => {
    return hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`;
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wide">{label}</label>
      
      <div className="space-y-4">
        {/* Min Time */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-normal text-gray-700 uppercase">From</span>
            <span className="text-base font-normal text-gray-900">{formatHour(value[0])}</span>
          </div>
          <input
            type="range"
            min="0"
            max="23"
            value={value[0]}
            onChange={handleMinChange}
            className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
        </div>

        {/* Max Time */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-normal text-gray-700 uppercase">To</span>
            <span className="text-base font-normal text-gray-900">{formatHour(value[1])}</span>
          </div>
          <input
            type="range"
            min="0"
            max="23"
            value={value[1]}
            onChange={handleMaxChange}
            className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
        </div>
      </div>
    </div>
  );
};
