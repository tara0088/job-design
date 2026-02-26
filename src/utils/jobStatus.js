/**
 * Job Status Tracking Utilities
 * 
 * Manage persistent job application status tracking using localStorage.
 */

// Status options with color mappings
export const STATUS_OPTIONS = {
  'not-applied': { 
    label: 'Not Applied', 
    color: 'neutral',
    bgColor: 'var(--color-background)',
    borderColor: 'var(--color-border)'
  },
  'applied': { 
    label: 'Applied', 
    color: 'info',
    bgColor: 'var(--color-accent)',
    borderColor: 'var(--color-accent)'
  },
  'rejected': { 
    label: 'Rejected', 
    color: 'destructive',
    bgColor: 'var(--color-error)',
    borderColor: 'var(--color-error)'
  },
  'selected': { 
    label: 'Selected', 
    color: 'success',
    bgColor: 'var(--color-success)',
    borderColor: 'var(--color-success)'
  }
};

// Default status for new jobs
const DEFAULT_STATUS = 'not-applied';

// localStorage key prefix
const STATUS_KEY_PREFIX = 'jobTrackerStatus_';

// Notification tracking
const STATUS_UPDATE_HISTORY_KEY = 'jobTrackerStatusUpdates';

/**
 * Get status for a specific job
 * @param {string} jobId - Job ID
 * @returns {string} Status value
 */
export function getJobStatus(jobId) {
  try {
    const key = `${STATUS_KEY_PREFIX}${jobId}`;
    const status = localStorage.getItem(key);
    return status || DEFAULT_STATUS;
  } catch (error) {
    console.error('Error reading job status:', error);
    return DEFAULT_STATUS;
  }
}

/**
 * Set status for a specific job
 * @param {string} jobId - Job ID
 * @param {string} status - Status value
 */
export function setJobStatus(jobId, status) {
  try {
    const key = `${STATUS_KEY_PREFIX}${jobId}`;
    localStorage.setItem(key, status);
    
    // Record status update in history
    recordStatusUpdate(jobId, status);
  } catch (error) {
    console.error('Error saving job status:', error);
  }
}

/**
 * Get all job statuses
 * @returns {Object} Map of jobId to status
 */
export function getAllJobStatuses() {
  try {
    const statuses = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STATUS_KEY_PREFIX)) {
        const jobId = key.replace(STATUS_KEY_PREFIX, '');
        statuses[jobId] = localStorage.getItem(key);
      }
    }
    return statuses;
  } catch (error) {
    console.error('Error reading all job statuses:', error);
    return {};
  }
}

/**
 * Clear all job statuses
 */
export function clearAllJobStatuses() {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STATUS_KEY_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing job statuses:', error);
  }
}

/**
 * Record status update in history for notifications
 * @param {string} jobId - Job ID
 * @param {string} status - New status
 */
function recordStatusUpdate(jobId, status) {
  try {
    const history = getStatusUpdateHistory();
    const update = {
      jobId,
      status,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };
    
    // Keep only last 20 updates
    history.unshift(update);
    if (history.length > 20) {
      history.splice(20);
    }
    
    localStorage.setItem(STATUS_UPDATE_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error recording status update:', error);
  }
}

/**
 * Get status update history
 * @returns {Array} Array of status updates
 */
export function getStatusUpdateHistory() {
  try {
    const historyStr = localStorage.getItem(STATUS_UPDATE_HISTORY_KEY);
    return historyStr ? JSON.parse(historyStr) : [];
  } catch (error) {
    console.error('Error reading status history:', error);
    return [];
  }
}

/**
 * Clear status update history
 */
export function clearStatusUpdateHistory() {
  try {
    localStorage.removeItem(STATUS_UPDATE_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing status history:', error);
  }
}

/**
 * Get jobs filtered by status
 * @param {Array} jobs - Array of job objects
 * @param {string} statusFilter - Status to filter by
 * @returns {Array} Filtered jobs
 */
export function filterJobsByStatus(jobs, statusFilter) {
  if (!statusFilter || statusFilter === 'all') {
    return jobs;
  }
  
  return jobs.filter(job => {
    const jobStatus = getJobStatus(job.id);
    return jobStatus === statusFilter;
  });
}

/**
 * Apply all filters including status
 * @param {Array} jobs - Array of job objects
 * @param {Object} filters - Filter object
 * @param {Object} preferences - User preferences
 * @param {boolean} showOnlyMatches - Show only matches flag
 * @returns {Array} Filtered jobs
 */
export function applyAllFiltersWithStatus(jobs, filters, preferences, showOnlyMatches = false) {
  // Apply status filter first
  let result = filterJobsByStatus(jobs, filters.status);
  
  // Apply other filters (existing logic from matchScore.js)
  // This would import and use the applyAllFilters function
  // For now, we'll implement the basic filtering logic here
  
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    result = result.filter(job => 
      job.title.toLowerCase().includes(keyword) || 
      job.company.toLowerCase().includes(keyword)
    );
  }
  
  if (filters.location) {
    result = result.filter(job => job.location === filters.location);
  }
  
  if (filters.mode) {
    result = result.filter(job => job.mode === filters.mode);
  }
  
  if (filters.experience) {
    result = result.filter(job => job.experience === filters.experience);
  }
  
  if (filters.source) {
    result = result.filter(job => job.source === filters.source);
  }
  
  // Apply match scoring if preferences exist
  if (preferences) {
    const minScore = showOnlyMatches ? (preferences.minMatchScore || 40) : 0;
    
    // Calculate scores and filter
    const jobsWithScores = result.map(job => ({
      ...job,
      matchScore: calculateMatchScore(job, preferences)
    }));
    
    result = jobsWithScores.filter(job => job.matchScore >= minScore);
    
    // Apply sorting
    if (filters.sortBy === 'match-score') {
      result = result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (filters.sortBy === 'latest') {
      result = result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    }
    // Add other sorting options as needed
  }
  
  return result;
}

// Import calculateMatchScore function (would be imported from matchScore.js)
// For now, we'll define a placeholder
function calculateMatchScore(job, preferences) {
  // This would be imported from matchScore.js
  // Placeholder implementation
  return 50;
}