import React from 'react';
import './LoadingState.css';

/**
 * LoadingState Component
 * 
 * Simple, non-intrusive loading indicator
 */
export function LoadingState({
  message = 'Loading...',
  className = ''
}) {
  return (
    <div className={`loading-state ${className}`}>
      <div className="loading-state__spinner" aria-hidden="true" />
      <span className="loading-state__message">{message}</span>
    </div>
  );
}

/**
 * SkeletonCard Component
 * 
 * Skeleton loading placeholder for cards
 */
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`skeleton-card ${className}`}>
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line skeleton--short" />
    </div>
  );
}

/**
 * SkeletonText Component
 */
export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`skeleton-text-group ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={`skeleton skeleton--line ${i === lines - 1 ? 'skeleton--short' : ''}`}
        />
      ))}
    </div>
  );
}
