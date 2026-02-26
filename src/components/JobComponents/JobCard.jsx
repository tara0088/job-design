import React, { useState } from 'react';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Card, CardContent } from '../Card';
import './JobCard.css';

/**
 * JobCard Component
 * 
 * Renders a job with:
 * - title, company, location, mode
 * - experience, salaryRange
 * - source badge
 * - postedDaysAgo
 * - View, Save, Apply buttons
 */
export function JobCard({ 
  job, 
  onView, 
  onSave, 
  onApply,
  isSaved = false
}) {
  const formatDate = (daysAgo) => {
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return 'Yesterday';
    return `${daysAgo} days ago`;
  };

  return (
    <Card className="job-card">
      <CardContent>
        <div className="job-card__header">
          <div className="job-card__title-section">
            <h3 className="job-card__title">{job.title}</h3>
            <p className="job-card__company">{job.company}</p>
          </div>
          <div className="job-card__source-badge">
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

        <div className="job-card__actions">
          <Button variant="secondary" onClick={() => onView(job)}>
            View
          </Button>
          <Button 
            variant={isSaved ? "primary" : "secondary"} 
            onClick={() => onSave(job)}
          >
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button 
            variant="primary" 
            onClick={() => onApply(job)}
          >
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
