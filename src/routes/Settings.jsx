import React from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Input, Select } from '../components/Input';
import './RouteStyles.css';

/**
 * Settings Route
 * 
 * Preference fields (UI placeholders only):
 * - Role keywords
 * - Preferred locations
 * - Mode (Remote / Hybrid / Onsite)
 * - Experience level
 */
export function Settings() {
  const modeOptions = [
    { value: '', label: 'Select mode' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'Onsite' }
  ];

  const experienceOptions = [
    { value: '', label: 'Select experience level' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (5+ years)' },
    { value: 'lead', label: 'Lead / Principal' }
  ];

  return (
    <div className="route-page">
      <ContextHeader 
        title="Settings"
        subtitle="Configure your job preferences."
      />
      <Workspace
        primary={
          <Card>
            <CardHeader>
              <CardTitle>Job Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Input 
                  label="Role Keywords"
                  placeholder="e.g., Product Designer, UX Researcher"
                />
                <Input 
                  label="Preferred Locations"
                  placeholder="e.g., San Francisco, New York, Remote"
                />
                <Select 
                  label="Work Mode"
                  options={modeOptions}
                />
                <Select 
                  label="Experience Level"
                  options={experienceOptions}
                />
              </div>
            </CardContent>
          </Card>
        }
      />
    </div>
  );
}
