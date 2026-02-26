import React from 'react';
import './Card.css';

/**
 * Card Component
 * 
 * Subtle border, no drop shadows
 * Clean and predictable
 */
export function Card({
  children,
  variant = 'default', // 'default' | 'subtle'
  className = '',
  ...props
}) {
  const variantClass = variant === 'subtle' ? 'card--subtle' : '';
  
  return (
    <div className={`card ${variantClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * CardHeader Component
 */
export function CardHeader({ children, className = '' }) {
  return (
    <div className={`card__header ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardTitle Component
 */
export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`card__title ${className}`}>
      {children}
    </h3>
  );
}

/**
 * CardDescription Component
 */
export function CardDescription({ children, className = '' }) {
  return (
    <p className={`card__description ${className}`}>
      {children}
    </p>
  );
}

/**
 * CardContent Component
 */
export function CardContent({ children, className = '' }) {
  return (
    <div className={`card__content ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardFooter Component
 */
export function CardFooter({ children, className = '' }) {
  return (
    <div className={`card__footer ${className}`}>
      {children}
    </div>
  );
}
