import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { JobCard, ViewJobModal, FilterBar } from '../components';
import { EmptyState } from '../components/EmptyState';
import { getSavedJobIds, saveJob, unsaveJob } from '../utils/savedJobs';
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
  
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sortBy: 'latest'
  });
  
  // Get unique values for filter options
  const uniqueLocations = [...new Set(jobs.map(job => job.location))];
  const uniqueModes = [...new Set(jobs.map(job => job.mode))];
  const uniqueExperiences = [...new Set(jobs.map(job => job.experience))];
  const uniqueSources = [...new Set(jobs.map(job => job.source))];
  
  // Load saved job IDs on mount
  useEffect(() => {
    setSavedJobIds(getSavedJobIds());
  }, []);
  
  // Apply filters whenever jobs or filters change
  useEffect(() => {
    let result = [...jobs];
    
    // Apply keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(keyword) || 
        job.company.toLowerCase().includes(keyword)
      );
    }
    
    // Apply location filter
    if (filters.location) {
      result = result.filter(job => job.location === filters.location);
    }
    
    // Apply mode filter
    if (filters.mode) {
      result = result.filter(job => job.mode === filters.mode);
    }
    
    // Apply experience filter
    if (filters.experience) {
      result = result.filter(job => job.experience === filters.experience);
    }
    
    // Apply source filter
    if (filters.source) {
      result = result.filter(job => job.source === filters.source);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'latest':
          return b.postedDaysAgo - a.postedDaysAgo;
        case 'oldest':
          return a.postedDaysAgo - b.postedDaysAgo;
        case 'salary-high':
          // Extract numeric value from salary range for comparison
          const aSal = parseFloat(a.salaryRange.match(/\d+(?:\.\d+)?/)[0]);
          const bSal = parseFloat(b.salaryRange.match(/\d+(?:\.\d+)?/)[0]);
          return bSal - aSal;
        case 'salary-low':
          const aSalLow = parseFloat(a.salaryRange.match(/\d+(?:\.\d+)?/)[0]);
          const bSalLow = parseFloat(b.salaryRange.match(/\d+(?:\.\d+)?/)[0]);
          return aSalLow - bSalLow;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return b.postedDaysAgo - a.postedDaysAgo;
      }
    });
    
    setFilteredJobs(result);
  }, [jobs, filters]);
  
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
  
  return (
    <div className="route-page">
      <ContextHeader 
        title="Dashboard"
        subtitle="Discover and track your ideal tech opportunities."
      />
      <Workspace
        primary={
          <div className="dashboard-content">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              uniqueLocations={uniqueLocations}
              uniqueModes={uniqueModes}
              uniqueExperiences={uniqueExperiences}
              uniqueSources={uniqueSources}
            />
            
            {filteredJobs.length === 0 ? (
              <EmptyState
                title="No jobs match your search."
                description="Try adjusting your filters to see more opportunities."
              />
            ) : (
              <div className="jobs-list">
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onView={handleViewJob}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                    isSaved={savedJobIds.includes(job.id)}
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
