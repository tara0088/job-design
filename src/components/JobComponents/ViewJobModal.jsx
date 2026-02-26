import React from 'react';
import { Button } from '../Button';
import { Badge } from '../Badge';
import './ViewJobModal.css';

/**
 * ViewJobModal Component
 * 
 * Modal displaying full job details:
 * - Description
 * - Skills
 * - All job attributes
 */
export function ViewJobModal({ 
  job, 
  isOpen, 
  onClose,
  onApply
}) {
  if (!isOpen || !job) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{job.title}</h2>
          <button className="modal-close-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="job-details">
            <div className="job-details__section">
              <h3 className="job-details__section-title">Company</h3>
              <p className="job-details__company">{job.company}</p>
            </div>
            
            <div className="job-details__section">
              <h3 className="job-details__section-title">Location & Mode</h3>
              <div className="job-details__location-mode">
                <span>📍 {job.location}</span>
                <span>🏢 {job.mode}</span>
              </div>
            </div>
            
            <div className="job-details__section">
              <h3 className="job-details__section-title">Experience & Salary</h3>
              <div className="job-details__exp-salary">
                <span>💼 {job.experience}</span>
                <span>💰 {job.salaryRange}</span>
              </div>
            </div>
            
            <div className="job-details__section">
              <h3 className="job-details__section-title">Source & Posted</h3>
              <div className="job-details__source-posted">
                <Badge variant="default">{job.source}</Badge>
                <span>{job.postedDaysAgo === 0 ? 'Today' : job.postedDaysAgo === 1 ? 'Yesterday' : `${job.postedDaysAgo} days ago`}</span>
              </div>
            </div>
            
            <div className="job-details__section">
              <h3 className="job-details__section-title">Skills Required</h3>
              <div className="job-details__skills">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="accent">{skill}</Badge>
                ))}
              </div>
            </div>
            
            <div className="job-details__section">
              <h3 className="job-details__section-title">Description</h3>
              <p className="job-details__description">{job.description}</p>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => onApply(job)}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
