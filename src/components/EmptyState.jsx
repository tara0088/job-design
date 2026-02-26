import React from 'react';
import './EmptyState.css';
import { Button } from './Button';

/**
 * EmptyState Component
 * 
 * Empty states must guide next action.
 * Never leave blank screens.
 */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`empty-state ${className}`}>
      {icon ? (
        <div className="empty-state__icon-wrapper">
          {icon}
        </div>
      ) : (
        <svg 
          className="empty-state__icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      )}
      
      {title && (
        <h3 className="empty-state__title">{title}</h3>
      )}
      
      {description && (
        <p className="empty-state__description">{description}</p>
      )}
      
      {actionLabel && onAction && (
        <div className="empty-state__action">
          <Button onClick={onAction} variant="primary">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
