import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { Card, CardContent } from '../components/Card';
import './RouteStyles.css';

/**
 * Proof Route
 * 
 * Placeholder page for artifact collection.
 */
export function Proof() {
  return (
    <div className="route-page">
      <ContextHeader 
        title="Proof"
        subtitle="Artifacts and evidence of completed work."
      />
      <Workspace
        primary={
          <Card>
            <CardContent>
              <p className="text-body">
                This section will contain artifacts, screenshots, and evidence 
                of completed work for review and verification.
              </p>
            </CardContent>
          </Card>
        }
      />
    </div>
  );
}
