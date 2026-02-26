import React from 'react';
import './Workspace.css';

/**
 * Workspace Component
 * 
 * Main content area following the layout:
 * [Primary Workspace (70%)] + [Secondary Panel (30%)]
 */
export function Workspace({ 
  primary,
  secondary,
  children 
}) {
  return (
    <div className="workspace">
      <div className="workspace__container">
        <div className="workspace__main">
          {primary || children}
        </div>
        {secondary && (
          <aside className="workspace__sidebar">
            {secondary}
          </aside>
        )}
      </div>
    </div>
  );
}

/**
 * PrimaryPanel Component
 * 
 * Clean cards, predictable components, no crowding
 */
export function PrimaryPanel({ children, className = '' }) {
  return (
    <div className={`primary-panel ${className}`}>
      {children}
    </div>
  );
}

/**
 * SecondaryPanel Component
 * 
 * Step explanation, copyable prompt box, consistent buttons
 */
export function SecondaryPanel({ children, className = '' }) {
  return (
    <div className={`secondary-panel ${className}`}>
      {children}
    </div>
  );
}
