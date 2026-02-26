import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import './RouteStyles.css';

/**
 * Settings Route
 * 
 * Placeholder page for user settings.
 */
export function Settings() {
  return (
    <div className="route-page">
      <ContextHeader 
        title="Settings"
        subtitle="This section will be built in the next step."
      />
      <Workspace />
    </div>
  );
}
