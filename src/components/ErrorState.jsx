import React from 'react';
import './ErrorState.css';
import { Button } from './Button';

/**
 * ErrorState Component
 * 
 * Errors must clearly explain what went wrong and how to fix it.
 * Never blame the user.
 */
export function ErrorState({
  title = 'Something went wrong',
  message,
  solution,
  onRetry,
  onDismiss,
  className = ''
}) {
  return (
    <div className={`error-state ${className}`} role="alert">
      <div className="error-state__header">
        <svg 
          className="error-state__icon" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <h3 className="error-state__title">{title}</h3>
      </div>
      
      {message && (
        <p className="error-state__message">{message}</p>
      )}
      
      {solution && (
        <div className="error-state__solution">
          <span className="error-state__solution-label">How to fix:</span>
          <p className="error-state__solution-text">{solution}</p>
        </div>
      )}
      
      {(onRetry || onDismiss) && (
        <div className="error-state__actions">
          {onRetry && (
            <Button onClick={onRetry} variant="primary">
              Try Again
            </Button>
          )}
          {onDismiss && (
            <Button onClick={onDismiss} variant="ghost">
              Dismiss
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
