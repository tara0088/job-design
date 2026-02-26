import React from 'react';
import './TopBar.css';

/**
 * TopBar Component
 * 
 * Global navigation bar with:
 * - Left: App name
 * - Center: Progress indicator
 * - Right: Status badge
 */
export function TopBar({ 
  appName = 'Job Notification App', 
  currentStep = 1, 
  totalSteps = 5,
  status = 'not-started' // 'not-started' | 'in-progress' | 'shipped'
}) {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  const statusConfig = {
    'not-started': { label: 'Not Started', dotClass: 'status-dot--not-started' },
    'in-progress': { label: 'In Progress', dotClass: 'status-dot--in-progress' },
    'shipped': { label: 'Shipped', dotClass: 'status-dot--shipped' }
  };
  
  const currentStatus = statusConfig[status] || statusConfig['not-started'];

  return (
    <header className="top-bar">
      <div className="top-bar__container">
        {/* Left: App Name */}
        <div className="top-bar__brand">
          <span className="top-bar__app-name">{appName}</span>
        </div>
        
        {/* Center: Progress Indicator */}
        <div className="top-bar__progress">
          <span className="top-bar__progress-text">
            Step {currentStep} / {totalSteps}
          </span>
          <div className="top-bar__progress-bar">
            <div 
              className="top-bar__progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Right: Status Badge */}
        <div className="top-bar__status">
          <span className={`top-bar__status-dot ${currentStatus.dotClass}`} />
          <span className="top-bar__status-label">{currentStatus.label}</span>
        </div>
      </div>
    </header>
  );
}
