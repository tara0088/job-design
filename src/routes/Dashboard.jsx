import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { JobCard, ViewJobModal, FilterBar } from '../components';
import { EmptyState } from '../components/EmptyState';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { getSavedJobIds, saveJob, unsaveJob } from '../utils/savedJobs';
import { getUserPreferences, applyAllFilters, calculateMatchScore } from '../utils/matchScore';
import jobsData from '../data/jobs.json';
import './RouteStyles.css';

/**
 * Dashboard Route
 * 
 * Render job cards with filtering capabilities.
 * Includes View, Save, and Apply functionality.
 */
export function Dashboard() {
  const [jobs] = useState(jobsData);
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sortBy: 'match-score'  // Default to match score sorting
  });
  
  // Get unique values for filter options
  const uniqueLocations = [...new Set(jobs.map(job => job.location))];
  const uniqueModes = [...new Set(jobs.map(job => job.mode))];
  const uniqueExperiences = [...new Set(jobs.map(job => job.experience))];
  const uniqueSources = [...new Set(jobs.map(job => job.source))];
  
  // Load preferences and saved job IDs on mount
  useEffect(() => {
    setPreferences(getUserPreferences());
    setSavedJobIds(getSavedJobIds());
  }, []);
  
  // Apply all filters whenever jobs, filters, preferences, or showOnlyMatches change
  useEffect(() => {
    const result = applyAllFilters(jobs, filters, preferences, showOnlyMatches);
    setFilteredJobs(result);
  }, [jobs, filters, preferences, showOnlyMatches]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  
  const handleSaveJob = (job) => {
    if (savedJobIds.includes(job.id)) {
      unsaveJob(job.id);
      setSavedJobIds(prev => prev.filter(id => id !== job.id));
    } else {
      saveJob(job.id);
      setSavedJobIds(prev => [...prev, job.id]);
    }
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
  
  // Show banner if no preferences are set
  const showPreferenceBanner = !preferences || !preferences.roleKeywords;
  
  // Get job with match scores for display
  const jobsWithScores = filteredJobs.map(job => ({
    ...job,
    matchScore: preferences ? calculateMatchScore(job, preferences) : null
  }));
  
  return (
    <div className="route-page">
      <ContextHeader 
        title="Dashboard"
        subtitle="Discover and track your ideal tech opportunities."
      />
      <Workspace
        primary={
          <div className="dashboard-content">
            {showPreferenceBanner && (
              <Card className="mb-3">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium mb-1">Set your preferences to activate intelligent matching.</h3>
                      <p className="text-sm text-caption">Configure your job preferences in the Settings page to see personalized match scores.</p>
                    </div>
                    <Button variant="primary" onClick={() => window.location.hash = '/settings'}>
                      Go to Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              uniqueLocations={uniqueLocations}
              uniqueModes={uniqueModes}
              uniqueExperiences={uniqueExperiences}
              uniqueSources={uniqueSources}
            />
            
            {preferences && (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show-matches-toggle"
                    checked={showOnlyMatches}
                    onChange={(e) => setShowOnlyMatches(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="show-matches-toggle" className="text-sm font-medium">
                    Show only jobs above my threshold ({preferences.minMatchScore || 40}%)
                  </label>
                </div>
                <div className="text-sm text-caption">
                  Showing {jobsWithScores.length} of {jobs.length} jobs
                </div>
              </div>
            )}
            
            {jobsWithScores.length === 0 ? (
              <EmptyState
                title={showOnlyMatches ? "No roles match your criteria" : "No jobs match your search"}
                description={showOnlyMatches 
                  ? "Adjust your filters or lower your match threshold in Settings." 
                  : "Try adjusting your filters to see more opportunities."
                }
              />
            ) : (
              <div className="jobs-list">
                {jobsWithScores.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onView={handleViewJob}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                    isSaved={savedJobIds.includes(job.id)}
                    matchScore={job.matchScore}
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
