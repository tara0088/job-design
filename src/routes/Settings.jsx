import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Input, Select, Textarea } from '../components/Input';
import { Button } from '../components/Button';
import './RouteStyles.css';

// Local storage key for preferences
const PREFERENCES_KEY = 'jobTrackerPreferences';

/**
 * Settings Route
 * 
 * Full preference configuration with localStorage storage:
 * - Role keywords
 * - Preferred locations
 * - Mode (Remote, Hybrid, Onsite)
 * - Experience level
 * - Skills
 * - Minimum match score threshold
 */
export function Settings() {
  const [preferences, setPreferences] = useState({
    roleKeywords: '',
    preferredLocations: '',
    preferredMode: [],
    experienceLevel: '',
    skills: '',
    minMatchScore: 40
  });

  const modeOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' }
  ];

  const experienceOptions = [
    { value: 'fresher', label: 'Fresher (0 years)' },
    { value: '0-1', label: 'Entry Level (0-1 years)' },
    { value: '1-3', label: 'Mid Level (1-3 years)' },
    { value: '3-5', label: 'Mid Level (3-5 years)' },
    { value: '5+', label: 'Senior Level (5+ years)' }
  ];

  const locationOptions = [
    'Bangalore',
    'Chennai',
    'Mumbai',
    'Pune',
    'Hyderabad',
    'Gurgaon',
    'Noida',
    'Delhi',
    'Kolkata',
    'Remote'
  ];

  // Load preferences on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem(PREFERENCES_KEY);
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        setPreferences(prev => ({
          ...prev,
          ...parsedPreferences,
          // Convert string to array if needed
          preferredMode: Array.isArray(parsedPreferences.preferredMode) 
            ? parsedPreferences.preferredMode 
            : (parsedPreferences.preferredMode || [])
        }));
      } catch (error) {
        console.error('Error parsing preferences:', error);
      }
    }
  }, []);

  // Handle preference changes
  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle checkbox changes
  const handleModeChange = (modeValue) => {
    setPreferences(prev => {
      const currentModes = prev.preferredMode || [];
      const newModes = currentModes.includes(modeValue)
        ? currentModes.filter(m => m !== modeValue)
        : [...currentModes, modeValue];
      return {
        ...prev,
        preferredMode: newModes
      };
    });
  };

  // Save preferences
  const handleSave = () => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    alert('Preferences saved successfully!');
  };

  // Clear all preferences
  const handleClear = () => {
    const confirmation = window.confirm('Are you sure you want to clear all preferences?');
    if (confirmation) {
      setPreferences({
        roleKeywords: '',
        preferredLocations: '',
        preferredMode: [],
        experienceLevel: '',
        skills: '',
        minMatchScore: 40
      });
      localStorage.removeItem(PREFERENCES_KEY);
      alert('Preferences cleared.');
    }
  };

  return (
    <div className="route-page">
      <ContextHeader 
        title="Settings"
        subtitle="Configure your job preferences for intelligent matching."
      />
      <Workspace
        primary={
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="input-label mb-2 block">Role Keywords *</label>
                    <Textarea
                      value={preferences.roleKeywords}
                      onChange={(e) => handlePreferenceChange('roleKeywords', e.target.value)}
                      placeholder="Enter job titles you're interested in (e.g., SDE Intern, Full Stack Developer, Product Manager)"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label className="input-label mb-2 block">Preferred Locations</label>
                    <Input
                      value={preferences.preferredLocations}
                      onChange={(e) => handlePreferenceChange('preferredLocations', e.target.value)}
                      placeholder="e.g., Bangalore, Chennai, Mumbai (comma-separated)"
                    />
                    <div className="text-caption mt-1">
                      Quick picks: {locationOptions.map((loc, idx) => (
                        <span key={idx}>
                          <button
                            className="text-link inline p-1 text-accent hover:underline"
                            onClick={() => handlePreferenceChange('preferredLocations', preferences.preferredLocations.includes(loc) ? 
                              preferences.preferredLocations : 
                              (preferences.preferredLocations ? `${preferences.preferredLocations},${loc}` : loc))}
                            style={{
                              color: 'var(--color-accent)',
                              background: 'none',
                              border: 'none',
                              padding: '4px 8px',
                              cursor: 'pointer',
                              borderRadius: '4px'
                            }}
                            type="button"
                          >
                            {loc}{idx < locationOptions.length - 1 ? ',' : ''}
                          </button> 
                          {loc !== 'Remote' ? <span>''</span> : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="input-label mb-2 block">Work Mode</label>
                    <div className="flex flex-col gap-2">
                      {modeOptions.map(option => (
                        <label key={option.value} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={preferences.preferredMode?.includes(option.value)}
                            onChange={() => handleModeChange(option.value)}
                            style={{
                              width: '18px',
                              height: '18px',
                              border: '2px solid #cccccc',
                              borderRadius: '3px'
                            }}
                          />
                          <span className="text-sm text-caption">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="input-label mb-2 block">Experience Level</label>
                    <Select
                      value={preferences.experienceLevel}
                      onChange={(e) => handlePreferenceChange('experienceLevel', e.target.value)}
                      options={[
                        { value: '!', label: 'Please select' },
                        ...experienceOptions
                      ]}
                    />
                  </div>
                  
                  <div>
                    <label className="input-label mb-2 block">Skills</label>
                    <Textarea
                      value={preferences.skills}
                      onChange={(e) => handlePreferenceChange('skills', e.target.value)}
                      placeholder="Enter your skills (e.g., React, JavaScript, Python, Node.js)"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label className="input-label mb-2 block">Minimum Match Score</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={preferences.minMatchScore}
                        onChange={(e) => handlePreferenceChange('minMatchScore', parseInt(e.target.value))}
                        className="w-full"
                        style={{
                          height: '6px',
                          borderRadius: '3px',
                          background: '#e0e0e0',
                          outline: 'none',
                          opacity: '0.7',
                          WebkitTransition: '.2s',
                          transition: 'opacity .2s'
                        }}
                      />
                      <span className="text-lg font-medium w-12 text-center">{preferences.minMatchScore}%</span>
                    </div>
                    <div className="text-caption mt-1">
                      Jobs below this threshold will be hidden when "Show only matches" is enabled
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex gap-2 justify-end">
              <Button variant="secondary" onClick={handleClear}>Clear All</Button>
              <Button variant="primary" onClick={handleSave}>Save Preferences</Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
