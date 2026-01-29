/**
 * Input Component
 * Reusable text input with label, error states, and icons
 * Supports various input types and validation states
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
    : 'border-gray-300 focus:ring-blue-500';

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Icon (if provided) */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input field */}
        <input
          id={inputId}
          className={`
            block w-full px-3 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-colors duration-200
            ${icon ? 'pl-10' : ''}
            ${borderColor}
            ${className}
          `.trim()}
          {...props}
        />
      </div>

      {/* Helper text or error message */}
      {(helperText || error) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};