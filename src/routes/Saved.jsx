import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { JobCard, ViewJobModal, EmptyState } from '../components';
import { getSavedJobIds, saveJob, unsaveJob, getSavedJobs } from '../utils/savedJobs';
import jobsData from '../data/jobs.json';
import './RouteStyles.css';

/**
 * Saved Route
 * 
 * Render saved jobs from localStorage.
 */
export function Saved() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Load saved jobs on mount
  useEffect(() => {
    const savedJobObjects = getSavedJobs(jobsData);
    setSavedJobs(savedJobObjects);
  }, []);
  
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  
  const handleSaveJob = (job) => {
    if (getSavedJobIds().includes(job.id)) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
    
    // Refresh saved jobs list
    const savedJobObjects = getSavedJobs(jobsData);
    setSavedJobs(savedJobObjects);
  };
  
  const handleApplyJob = (job) => {
    window.open(job.applyUrl, '_blank');
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };
  
  const handleModalApply = (job) => {
    window.open(job.applyUrl, '_blank');
    handleCloseModal();
  };
  
  return (
    <div className="route-page">
      <ContextHeader 
        title="Saved Jobs"
        subtitle="Jobs you save will appear here for quick access."
      />
      <Workspace
        primary={
          <div className="saved-jobs-content">
            {savedJobs.length === 0 ? (
              <EmptyState
                title="No saved jobs"
                description="When you find jobs that interest you, save them here to review later."
              />
            ) : (
              <div className="jobs-list">
                {savedJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onView={handleViewJob}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                    isSaved={true}
                  />
                ))}
              </div>
            )}
            
            {isModalOpen && (
              <ViewJobModal
                job={selectedJob}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onApply={handleModalApply}
              />
            )}
          </div>
        }
      />
    </div>
  );
}
