import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { EmptyState } from '../components/EmptyState';
import './RouteStyles.css';

/**
 * Saved Route
 * 
 * Premium empty state for saved jobs.
 */
export function Saved() {
  return (
    <div className="route-page">
      <ContextHeader 
        title="Saved Jobs"
        subtitle="Jobs you save will appear here for quick access."
      />
      <Workspace
        primary={
          <EmptyState
            title="No saved jobs"
            description="When you find jobs that interest you, save them here to review later."
          />
        }
      />
    </div>
  );
}
