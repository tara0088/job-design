import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import './RouteStyles.css';

/**
 * Dashboard Route
 * 
 * Placeholder page for the main dashboard.
 */
export function Dashboard() {
  return (
    <div className="route-page">
      <ContextHeader 
        title="Dashboard"
        subtitle="This section will be built in the next step."
      />
      <Workspace />
    </div>
  );
}
