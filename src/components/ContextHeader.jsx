import React from 'react';
import './ContextHeader.css';

/**
 * ContextHeader Component
 * 
 * Provides page context with:
 * - Large serif headline
 * - One-line subtext
 * - Clear purpose without hype
 */
export function ContextHeader({ 
  title, 
  subtitle,
  children 
}) {
  return (
    <div className="context-header">
      <div className="context-header__container">
        <h1 className="context-header__title">{title}</h1>
        {subtitle && (
          <p className="context-header__subtitle">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
