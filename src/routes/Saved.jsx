import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import './RouteStyles.css';

/**
 * Saved Route
 * 
 * Placeholder page for saved jobs.
 */
export function Saved() {
  return (
    <div className="route-page">
      <ContextHeader 
        title="Saved Jobs"
        subtitle="This section will be built in the next step."
      />
      <Workspace />
    </div>
  );
}
