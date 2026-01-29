/**
 * Button Component
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  children,
  ...props
}) => {
  // Base styles applied to all buttons
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant-specific styles with professional black theme
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-slate-900 focus:ring-slate-800 active:bg-slate-950 shadow-md hover:shadow-lg',
    secondary: 'bg-slate-700 text-white hover:bg-slate-800 focus:ring-slate-700 active:bg-slate-900 shadow-sm hover:shadow-md',
    outline: 'border border-black text-black hover:bg-black hover:text-white focus:ring-black active:bg-slate-900 transition-colors',
    ghost: 'text-slate-700 hover:bg-slate-100 focus:ring-slate-300 active:bg-slate-200',
  };

  // Size-specific styles with better typography
  const sizeStyles = {
    sm: 'px-1 py-1.5 text-sm font-normal',
    md: 'px-3 py-2.5 text-base font-normal',
    lg: 'px-4 py-3 text-lg font-normal',
  };

  // Combine all style classes
  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 className="animate-spin mr-2 h-4 w-4" />
      )}
      {children}
    </button>
  );
};