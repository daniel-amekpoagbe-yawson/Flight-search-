/**
 * Select Component
 */

import React, { useId } from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  fullWidth = false,
  placeholder = 'Select an option',
  className = '',
  id,
  ...props
}) => {
  // Generate unique ID if not provided
  const generatedId = useId();
  const selectId = id || generatedId;

  // Determine border color based on error state
  const borderColor = error 
    ? 'border-red-500 focus:ring-red-500' 
    : 'border-gray-200 focus:border-black focus:ring-black';

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-gray-900 mb-1.5 uppercase tracking-wide"
        >
          {label}
        </label>
      )}

      {/* Select input */}
      <select
        id={selectId}
        className={`
          block w-full px-4 py-2.5 border rounded-lg text-gray-900
          focus:outline-none focus:ring-0.5 focus:ring-offset-0 focus:border-black/60
          disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500
          transition-all duration-200 font-extralight
          appearance-none
          bg-white
          cursor-pointer
          ${borderColor}
          ${className}
        `.trim()}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Helper text or error message */}
      {(helperText || error) && (
        <p className={`mt-1.5 text-sm font-medium ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};