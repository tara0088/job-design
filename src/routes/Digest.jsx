import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { EmptyState } from '../components/EmptyState';
import './RouteStyles.css';

/**
 * Digest Route
 * 
 * Premium empty state indicating future daily summary feature.
 */
export function Digest() {
  return (
    <div className="route-page">
      <ContextHeader 
        title="Daily Digest"
        subtitle="Your personalized job summary delivered at 9AM."
      />
      <Workspace
        primary={
          <EmptyState
            title="No digest yet"
            description="Your daily job digest will appear here each morning at 9AM, featuring the best matches based on your preferences."
          />
        }
      />
    </div>
  );
}
