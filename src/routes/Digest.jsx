import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import './RouteStyles.css';

/**
 * Digest Route
 * 
 * Placeholder page for job digest/notifications.
 */
export function Digest() {
  return (
    <div className="route-page">
      <ContextHeader 
        title="Job Digest"
        subtitle="This section will be built in the next step."
      />
      <Workspace />
    </div>
  );
}
