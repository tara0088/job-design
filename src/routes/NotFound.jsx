import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { Card, CardContent } from '../components/Card';
import './RouteStyles.css';

/**
 * NotFound Route (404)
 * 
 * Displayed when the user navigates to an unknown path.
 * Never shows a blank screen.
 */
export function NotFound() {
  return (
    <div className="route-page">
      <ContextHeader 
        title="Page Not Found"
        subtitle="The page you are looking for does not exist."
      />
      <Workspace
        primary={
          <Card>
            <CardContent>
              <p className="text-body">
                The requested page could not be found. Please check the URL 
                or navigate back to the dashboard.
              </p>
            </CardContent>
          </Card>
        }
      />
    </div>
  );
}
