/**
 * Saved Jobs Utility Functions
 * 
 * Manages saved jobs in localStorage
 */

const SAVED_JOBS_KEY = 'saved_jobs';

/**
 * Get saved job IDs from localStorage
 * @returns {Array<number>} Array of saved job IDs
 */
export function getSavedJobIds() {
  try {
    const savedJobsStr = localStorage.getItem(SAVED_JOBS_KEY);
    return savedJobsStr ? JSON.parse(savedJobsStr) : [];
  } catch (error) {
    console.error('Error reading saved jobs from localStorage:', error);
    return [];
  }
}

/**
 * Save job ID to localStorage
 * @param {number} jobId - ID of job to save
 */
export function saveJob(jobId) {
  try {
    const savedJobs = getSavedJobIds();
    if (!savedJobs.includes(jobId)) {
      const updatedSavedJobs = [...savedJobs, jobId];
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedSavedJobs));
    }
  } catch (error) {
    console.error('Error saving job to localStorage:', error);
  }
}

/**
 * Remove job ID from localStorage
 * @param {number} jobId - ID of job to remove
 */
export function unsaveJob(jobId) {
  try {
    const savedJobs = getSavedJobIds();
    const updatedSavedJobs = savedJobs.filter(id => id !== jobId);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedSavedJobs));
  } catch (error) {
    console.error('Error removing job from localStorage:', error);
  }
}

/**
 * Check if a job is saved
 * @param {number} jobId - ID of job to check
 * @returns {boolean} True if job is saved, false otherwise
 */
export function isJobSaved(jobId) {
  const savedJobs = getSavedJobIds();
  return savedJobs.includes(jobId);
}

/**
 * Get all saved jobs by their IDs
 * @param {Array<Object>} allJobs - Complete jobs array to filter from
 * @returns {Array<Object>} Array of saved job objects
 */
export function getSavedJobs(allJobs) {
  const savedJobIds = getSavedJobIds();
  return allJobs.filter(job => savedJobIds.includes(job.id));
}
