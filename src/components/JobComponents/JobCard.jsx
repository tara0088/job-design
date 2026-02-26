import React, { useState } from 'react';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Card, CardContent } from '../Card';
import { getScoreBadgeVariant, getScoreLabel } from '../../utils/matchScore';
import { getJobStatus, setJobStatus, STATUS_OPTIONS } from '../../utils/jobStatus';
import { useToast } from '../Toast/Toast';
import './JobCard.css';

/**
 * JobCard Component
 * 
 * Renders a job with:
 * - title, company, location, mode
 * - experience, salaryRange
 * - source badge
 * - postedDaysAgo
 * - match score badge (if available)
 * - View, Save, Apply buttons
 */
export function JobCard({ 
  job, 
  onView, 
  onSave, 
  onApply,
  isSaved = false,
  matchScore = null
}) {
  const { showToast } = useToast();
  const [jobStatus, setJobStatusState] = useState(getJobStatus(job.id));
  
  const formatDate = (daysAgo) => {
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return 'Yesterday';
    return `${daysAgo} days ago`;
  };

  const handleApply = () => {
    if (onApply) onApply(job);
  };

  const handleSave = () => {
    if (onSave) onSave(job);
  };

  const handleView = () => {
    if (onView) onView(job);
  };

  const handleStatusChange = (newStatus) => {
    setJobStatus(job.id, newStatus);
    setJobStatusState(newStatus);
    
    // Show toast notification
    const statusInfo = STATUS_OPTIONS[newStatus];
    showToast(`Status updated: ${statusInfo.label}`, 'info', 3000);
  };

  return (
    <Card className="job-card">
      <CardContent>
        <div className="job-card__header">
          <div className="job-card__title-section">
            <h3 className="job-card__title">{job.title}</h3>
            <p className="job-card__company">{job.company}</p>
          </div>
          <div className="job-card__badges">
            {matchScore !== null && (
              <Badge variant={getScoreBadgeVariant(matchScore)}>
                {getScoreLabel(matchScore)}
              </Badge>
            )}
            <Badge variant="default">{job.source}</Badge>
          </div>
        </div>

        <div className="job-card__details">
          <div className="job-card__location-mode">
            <span className="job-card__location">{job.location}</span>
            <span className="job-card__mode">{job.mode}</span>
          </div>
          
          <div className="job-card__experience-salary">
            <span className="job-card__experience">{job.experience}</span>
            <span className="job-card__salary">{job.salaryRange}</span>
          </div>
        </div>

        <div className="job-card__meta">
          <span className="job-card__posted">{formatDate(job.postedDaysAgo)}</span>
        </div>

        <div className="job-card__status-section">
          <div className="job-card__status-label">Application Status:</div>
          <div className="job-card__status-buttons">
            {Object.entries(STATUS_OPTIONS).map(([statusKey, statusInfo]) => (
              <button
                key={statusKey}
                className={`job-card__status-button ${jobStatus === statusKey ? 'active' : ''} ${statusInfo.color}`}
                onClick={() => handleStatusChange(statusKey)}
                title={statusInfo.label}
              >
                {statusInfo.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="job-card__actions">
          <Button variant="secondary" onClick={handleView}>
            View
          </Button>
          <Button 
            variant={isSaved ? "primary" : "secondary"} 
            onClick={handleSave}
          >
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button 
            variant="primary" 
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
