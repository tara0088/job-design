import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { Badge } from '../components/Badge';
import { getTodaysDigest, generateDailyDigest, saveTodaysDigest, 
         formatDigestAsText, createEmailDraftLink, getFormattedDate, 
         hasValidPreferences } from '../utils/dailyDigest';
import { getUserPreferences } from '../utils/matchScore';
import jobsData from '../data/jobs.json';
import './Digest.css';

/**
 * Digest Route
 * 
 * Daily Digest Engine with email-style layout.
 * Generates top 10 jobs based on match score and recency.
 */
export function Digest() {
  const [digestJobs, setDigestJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [dateStr] = useState(getFormattedDate());
  
  // Load preferences and existing digest on mount
  useEffect(() => {
    setPreferences(getUserPreferences());
    const existingDigest = getTodaysDigest();
    if (existingDigest) {
      setDigestJobs(existingDigest);
    }
  }, []);
  
  // Check if user has valid preferences
  const hasPreferences = hasValidPreferences();
  
  // Generate today's digest
  const handleGenerateDigest = async () => {
    if (!hasPreferences) return;
    
    setIsLoading(true);
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newDigest = generateDailyDigest(jobsData, preferences);
    setDigestJobs(newDigest);
    saveTodaysDigest(newDigest);
    
    setIsLoading(false);
  };
  
  // Copy digest to clipboard
  const handleCopyToClipboard = async () => {
    try {
      const text = formatDigestAsText(digestJobs, dateStr);
      await navigator.clipboard.writeText(text);
      alert('Digest copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy to clipboard');
    }
  };
  
  // Create email draft
  const handleCreateEmailDraft = () => {
    const mailtoLink = createEmailDraftLink(digestJobs, dateStr);
    window.location.href = mailtoLink;
  };
  
  // Render digest content
  const renderDigestContent = () => {
    if (!hasPreferences) {
      return (
        <EmptyState
          title="Set preferences to generate a personalized digest."
          description="Configure your job preferences in the Settings page to receive daily job recommendations."
          actionLabel="Go to Settings"
          onAction={() => window.location.hash = '/settings'}
        />
      );
    }
    
    if (digestJobs.length === 0 && !isLoading) {
      return (
        <EmptyState
          title="No matching roles today."
          description="Check again tomorrow for new opportunities based on your preferences."
        />
      );
    }
    
    return (
      <div className="digest-container">
        <Card className="digest-card">
          <CardContent>
            {/* Header */}
            <div className="digest-header">
              <h1 className="digest-title">Top 10 Jobs For You — 9AM Digest</h1>
              <p className="digest-subtitle">{dateStr}</p>
              <div className="digest-divider" />
            </div>
            
            {/* Jobs List */}
            <div className="digest-jobs">
              {digestJobs.map((job, index) => (
                <div key={job.id} className="digest-job-item">
                  <div className="digest-job-header">
                    <div className="digest-job-rank">{index + 1}.</div>
                    <div className="digest-job-info">
                      <h3 className="digest-job-title">{job.title}</h3>
                      <p className="digest-job-company">{job.company}</p>
                    </div>
                    <Badge variant="success">{Math.round(job.matchScore)}% Match</Badge>
                  </div>
                  
                  <div className="digest-job-details">
                    <div className="digest-job-meta">
                      <span className="digest-job-location">📍 {job.location}</span>
                      <span className="digest-job-experience">💼 {job.experience}</span>
                    </div>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => window.open(job.applyUrl, '_blank')}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="digest-footer">\              <p className="digest-footer-text">
                This digest was generated based on your preferences.
              </p>
              <p className="digest-note">
                Demo Mode: Daily 9AM trigger simulated manually.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Action Buttons */}
        {digestJobs.length > 0 && (
          <div className="digest-actions">
            <Button 
              variant="secondary" 
              onClick={handleCopyToClipboard}
            >
              Copy Digest to Clipboard
            </Button>
            <Button 
              variant="primary" 
              onClick={handleCreateEmailDraft}
            >
              Create Email Draft
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="route-page">
      <ContextHeader 
        title="Daily Digest"
        subtitle="Your personalized job summary delivered at 9AM."
      />
      <Workspace
        primary={
          <div className="digest-content">
            {!digestJobs.length && hasPreferences && (
              <div className="digest-generate-section">
                <Card>
                  <CardContent>
                    <div className="flex flex-col items-center text-center gap-4">
                      <h3 className="text-xl font-medium">Generate Today's 9AM Digest (Simulated)</h3>
                      <p className="text-caption max-w-md">
                        Get your personalized list of top 10 job matches based on your preferences, 
                        sorted by relevance and recency.
                      </p>
                      <Button 
                        variant="primary" 
                        size="lg"
                        onClick={handleGenerateDigest}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Generating...' : 'Generate Digest'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {renderDigestContent()}
          </div>
        }
      />
    </div>
  );
}
