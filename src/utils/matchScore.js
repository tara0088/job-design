/**
 * Match Score Calculation Engine
 * 
 * Calculates deterministic match scores based on user preferences
 * and job attributes using exact scoring rules.
 */

const PREFERENCES_KEY = 'jobTrackerPreferences';

/**
 * Calculate match score for a job based on user preferences
 * 
 * Scoring Rules:
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location matches preferredLocations
 * +10 if job.mode matches preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills (any match)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 * 
 * @param {Object} job - Job object to score
 * @param {Object} preferences - User preferences object
 * @returns {number} Match score (0-100)
 */
export function calculateMatchScore(job, preferences) {
  // Return 0 if no preferences or invalid job
  if (!preferences || !job) return 0;
  
  let score = 0;
  
  // Parse user preferences
  const roleKeywords = preferences.roleKeywords 
    ? preferences.roleKeywords.split(',').map(k => k.trim().toLowerCase()) 
    : [];
  const preferredLocations = preferences.preferredLocations 
    ? preferences.preferredLocations.split(',').map(l => l.trim().toLowerCase()) 
    : [];
  const preferredModes = preferences.preferredMode || [];
  const experienceLevel = preferences.experienceLevel || '';
  const userSkills = preferences.skills 
    ? preferences.skills.split(',').map(s => s.trim().toLowerCase()) 
    : [];
  
  // Convert job attributes to lowercase for comparison
  const jobTitle = job.title.toLowerCase();
  const jobDescription = job.description.toLowerCase();
  const jobLocation = job.location.toLowerCase();
  const jobMode = job.mode.toLowerCase();
  const jobExperience = job.experience.toLowerCase();
  const jobSkills = job.skills.map(s => s.toLowerCase());
  const jobSource = job.source.toLowerCase();
  const postedDaysAgo = job.postedDaysAgo;
  
  // +25 if any roleKeyword appears in job.title (case-insensitive)
  if (roleKeywords.some(keyword => jobTitle.includes(keyword))) {
    score += 25;
  }
  
  // +15 if any roleKeyword appears in job.description
  if (roleKeywords.some(keyword => jobDescription.includes(keyword))) {
    score += 15;
  }
  
  // +15 if job.location matches preferredLocations
  if (preferredLocations.some(loc => jobLocation.includes(loc))) {
    score += 15;
  }
  
  // +10 if job.mode matches preferredMode
  if (preferredModes.some(mode => jobMode.includes(mode))) {
    score += 10;
  }
  
  // +10 if job.experience matches experienceLevel
  if (experienceLevel && jobExperience.includes(experienceLevel)) {
    score += 10;
  }
  
  // +15 if overlap between job.skills and user.skills (any match)
  if (userSkills.length > 0 && jobSkills.some(skill => userSkills.includes(skill))) {
    score += 15;
  }
  
  // +5 if postedDaysAgo <= 2
  if (postedDaysAgo <= 2) {
    score += 5;
  }
  
  // +5 if source is LinkedIn
  if (jobSource.includes('linkedin')) {
    score += 5;
  }
  
  // Cap score at 100
  return Math.min(score, 100);
}

/**
 * Get score badge variant based on match score
 * 
 * @param {number} score - Match score (0-100)
 * @returns {string} Badge variant: 'success', 'warning', 'default', 'subtle'
 */
export function getScoreBadgeVariant(score) {
  if (score >= 80) return 'success';  // green
  if (score >= 60) return 'warning';  // amber
  if (score >= 40) return 'default';  // neutral
  return 'subtle';                    // subtle grey
}

/**
 * Get score badge label with percentage
 * 
 * @param {number} score - Match score (0-100)
 * @returns {string} Formatted score label
 */
export function getScoreLabel(score) {
  return `${Math.round(score)}% Match`;
}

/**
 * Get user preferences from localStorage
 * 
 * @returns {Object|null} Preferences object or null if not found
 */
export function getUserPreferences() {
  try {
    const preferencesStr = localStorage.getItem(PREFERENCES_KEY);
    return preferencesStr ? JSON.parse(preferencesStr) : null;
  } catch (error) {
    console.error('Error reading preferences:', error);
    return null;
  }
}

/**
 * Filter jobs based on user preferences and minimum match score
 * 
 * @param {Array} jobs - Array of job objects
 * @param {Object} preferences - User preferences object
 * @param {number} minMatchScore - Minimum acceptable score
 * @returns {Array} Filtered and sorted jobs
 */
export function filterJobsByMatchScore(jobs, preferences, minMatchScore = 0) {
  if (!preferences || !jobs) return jobs;
  
  // Calculate scores for all jobs
  const jobsWithScores = jobs.map(job => ({
    ...job,
    matchScore: calculateMatchScore(job, preferences)
  }));
  
  // Filter by minimum score
  const filteredJobs = jobsWithScores.filter(job => job.matchScore >= minMatchScore);
  
  // Sort by match score (descending) then by posted date (newer first)
  return filteredJobs.sort((a, b) => {
    // First sort by match score (descending)
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    // Then by posted date (ascending - newer first)
    return a.postedDaysAgo - b.postedDaysAgo;
  });
}

/**
 * Apply combined filters with match scoring
 * 
 * @param {Array} jobs - Array of job objects
 * @param {Object} filters - Filter object from FilterBar
 * @param {Object} preferences - User preferences
 * @param {boolean} showOnlyMatches - Whether to show only matches above threshold
 * @returns {Array} Filtered and sorted jobs
 */
export function applyAllFilters(jobs, filters, preferences, showOnlyMatches = false) {
  if (!jobs) return [];
  
  let result = [...jobs];
  
  // Apply basic filters (keyword, location, mode, experience, source)
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
    
    result = filterJobsByMatchScore(result, preferences, minScore);
    
    // Apply additional sorting if needed
    if (filters.sortBy === 'match-score') {
      // Already sorted by match score in filterJobsByMatchScore
    } else if (filters.sortBy === 'latest') {
      result = result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    } else if (filters.sortBy === 'salary-high') {
      result = result.sort((a, b) => {
        const aSal = parseFloat(a.salaryRange.match(/\d+(?:\.\d+)?/)?.[0] || 0);
        const bSal = parseFloat(b.salaryRange.match(/\d+(?:\.\d+)?/)?.[0] || 0);
        return bSal - aSal;
      });
    } else if (filters.sortBy === 'salary-low') {
      result = result.sort((a, b) => {
        const aSal = parseFloat(a.salaryRange.match(/\d+(?:\.\d+)?/)?.[0] || 0);
        const bSal = parseFloat(b.salaryRange.match(/\d+(?:\.\d+)?/)?.[0] || 0);
        return aSal - bSal;
      });
    } else if (filters.sortBy === 'title') {
      result = result.sort((a, b) => a.title.localeCompare(b.title));
    }
  }
  
  return result;
}