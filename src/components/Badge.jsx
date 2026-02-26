import React from 'react';
import './Badge.css';

/**
 * Badge Component
 * 
 * Variants:
 * - default: neutral gray
 * - accent: deep red
 * - success: muted green
 * - warning: muted amber
 */
export function Badge({
  children,
  variant = 'default', // 'default' | 'accent' | 'success' | 'warning'
  className = '',
  ...props
}) {
  const variantClass = `badge--${variant}`;
  
  return (
    <span className={`badge ${variantClass} ${className}`} {...props}>
      {children}
    </span>
  );
}
