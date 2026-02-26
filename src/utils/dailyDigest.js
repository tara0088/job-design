/**
 * Daily Digest Engine
 * 
 * Generates and manages daily job digests based on user preferences.
 */

import { calculateMatchScore, getUserPreferences } from './matchScore';

/**
 * Generate today's digest key based on current date
 * @returns {string} Digest key in format: jobTrackerDigest_YYYY-MM-DD
 */
export function getTodayDigestKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `jobTrackerDigest_${year}-${month}-${day}`;
}

/**
 * Get today's digest from localStorage
 * @returns {Array|null} Array of job objects or null if not found
 */
export function getTodaysDigest() {
  const digestKey = getTodayDigestKey();
  try {
    const digestStr = localStorage.getItem(digestKey);
    return digestStr ? JSON.parse(digestStr) : null;
  } catch (error) {
    console.error('Error reading digest:', error);
    return null;
  }
}

/**
 * Save digest to localStorage for today
 * @param {Array} jobs - Array of job objects to save
 */
export function saveTodaysDigest(jobs) {
  const digestKey = getTodayDigestKey();
  try {
    localStorage.setItem(digestKey, JSON.stringify(jobs));
  } catch (error) {
    console.error('Error saving digest:', error);
  }
}

/**
 * Generate daily digest of top 10 jobs
 * @param {Array} allJobs - Complete array of all jobs
 * @param {Object} preferences - User preferences object
 * @returns {Array} Top 10 jobs sorted by match score and recency
 */
export function generateDailyDigest(allJobs, preferences) {
  if (!preferences || !allJobs || allJobs.length === 0) {
    return [];
  }

  // Calculate match scores for all jobs
  const jobsWithScores = allJobs.map(job => ({
    ...job,
    matchScore: calculateMatchScore(job, preferences)
  }));

  // Filter out jobs with very low match scores
  const filteredJobs = jobsWithScores.filter(job => job.matchScore > 0);

  // Sort by match score (descending) then by posted date (ascending - newer first)
  const sortedJobs = filteredJobs.sort((a, b) => {
    // Primary sort: match score descending
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    // Secondary sort: posted days ago ascending (newer first)
    return a.postedDaysAgo - b.postedDaysAgo;
  });

  // Take top 10 jobs
  return sortedJobs.slice(0, 10);
}

/**
 * Format digest as plain text for clipboard/email
 * @param {Array} jobs - Array of job objects
 * @param {string} dateStr - Formatted date string
 * @returns {string} Plain text digest
 */
export function formatDigestAsText(jobs, dateStr) {
  if (!jobs || jobs.length === 0) {
    return `No matching roles found for ${dateStr}.\n\nCheck again tomorrow for new opportunities.`;
  }

  let text = `Top 10 Jobs For You — 9AM Digest\n`;
  text += `Generated on: ${dateStr}\n`;
  text += `================================\n\n`;

  jobs.forEach((job, index) => {
    text += `${index + 1}. ${job.title}\n`;
    text += `   Company: ${job.company}\n`;
    text += `   Location: ${job.location}\n`;
    text += `   Experience: ${job.experience}\n`;
    text += `   Match Score: ${Math.round(job.matchScore)}%\n`;
    text += `   Apply: ${job.applyUrl}\n\n`;
  });

  text += `This digest was generated based on your preferences.\n`;
  text += `Demo Mode: Daily 9AM trigger simulated manually.`;

  return text;
}

/**
 * Create mailto link with digest content
 * @param {Array} jobs - Array of job objects
 * @param {string} dateStr - Formatted date string
 * @returns {string} mailto URL
 */
export function createEmailDraftLink(jobs, dateStr) {
  const subject = encodeURIComponent('My 9AM Job Digest');
  const body = encodeURIComponent(formatDigestAsText(jobs, dateStr));
  return `mailto:?subject=${subject}&body=${body}`;
}

/**
 * Get formatted date string for display
 * @returns {string} Formatted date (e.g., "February 26, 2026")
 */
export function getFormattedDate() {
  const today = new Date();
  return today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Check if user has valid preferences for digest generation
 * @returns {boolean} True if preferences exist and are valid
 */
export function hasValidPreferences() {
  const preferences = getUserPreferences();
  return preferences && preferences.roleKeywords && preferences.roleKeywords.trim() !== '';
}