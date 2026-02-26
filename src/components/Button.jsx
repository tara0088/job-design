import React from 'react';
import './Button.css';

/**
 * Button Component
 * 
 * Variants:
 * - primary: solid deep red (#8B0000)
 * - secondary: outlined
 * - ghost: text only
 * 
 * Sizes: sm, md (default), lg
 */
export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const stateClass = loading ? 'btn--loading' : '';
  
  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${stateClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="btn__spinner" aria-hidden="true" />
      )}
      <span className={`btn__content ${loading ? 'btn__content--hidden' : ''}`}>
        {children}
      </span>
    </button>
  );
}
