/**
 * Input Component
 */

import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  // Generate unique ID if not provided
  const generatedId = useId();
  const inputId = id || generatedId;

  // Determine border color based on error state
  const borderColor = error 
    ? 'border-red-500 focus:ring-red-500' 
    : 'border-gray-200 focus:border-black focus:ring-black';

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-gray-900 mb-1.5 uppercase tracking-wide"
        >
          {label}
        </label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Icon (if provided) */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        {/* Input field */}
        <input
          id={inputId}
          className={`
            block w-full px-4 py-2.5 border rounded-lg text-gray-900
            focus:outline-none focus:ring-0.5 focus:ring-offset-0 focus:border-black/60
            disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500
            transition-all duration-200 font-normal
            placeholder:text-gray-400 placeholder:font-extralight
            ${icon ? 'pl-10' : ''}
            ${borderColor}
            ${className}
          `.trim()}
          {...props}
        />
      </div>

      {/* Helper text or error message */}
      {(helperText || error) && (
        <p className={`mt-1.5 text-sm font-normal${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};