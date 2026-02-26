import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import './RouteStyles.css';

/**
 * Proof Route
 * 
 * Placeholder page for proof/completed items.
 */
export function Proof() {
  return (
    <div className="route-page">
      <ContextHeader 
        title="Proof"
        subtitle="This section will be built in the next step."
      />
      <Workspace />
    </div>
  );
}
