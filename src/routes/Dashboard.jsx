import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { EmptyState } from '../components/EmptyState';
import './RouteStyles.css';

/**
 * Dashboard Route
 * 
 * Clean empty state:
 * "No jobs yet. In the next step, you will load a realistic dataset."
 */
export function Dashboard() {
  return (
    <div className="route-page">
      <ContextHeader 
        title="Dashboard"
        subtitle="Your job matches will appear here."
      />
      <Workspace
        primary={
          <EmptyState
            title="No jobs yet"
            description="In the next step, you will load a realistic dataset."
          />
        }
      />
    </div>
  );
}
