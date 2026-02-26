/**
 * Test Checklist Utilities
 * 
 * Manage test checklist state and verification logic.
 */

const TEST_CHECKLIST_KEY = 'jobTrackerTestStatus';

// Test items with verification instructions
export const TEST_ITEMS = [
  {
    id: 'preferences-persist',
    title: 'Preferences persist after refresh',
    tooltip: 'Set preferences in Settings, refresh page, verify values remain'
  },
  {
    id: 'match-score-calculation',
    title: 'Match score calculates correctly',
    tooltip: 'Check dashboard for match score badges with correct percentages'
  },
  {
    id: 'show-matches-toggle',
    title: '"Show only matches" toggle works',
    tooltip: 'Use toggle on dashboard to filter jobs by match threshold'
  },
  {
    id: 'save-job-persistence',
    title: 'Save job persists after refresh',
    tooltip: 'Save a job, refresh page, verify it remains in Saved section'
  },
  {
    id: 'apply-new-tab',
    title: 'Apply opens in new tab',
    tooltip: 'Click Apply button on any job, verify it opens in new browser tab'
  },
  {
    id: 'status-persistence',
    title: 'Status update persists after refresh',
    tooltip: 'Change job status, refresh page, verify status remains unchanged'
  },
  {
    id: 'status-filter',
    title: 'Status filter works correctly',
    tooltip: 'Use status filter dropdown to show only jobs with specific status'
  },
  {
    id: 'digest-top-10',
    title: 'Digest generates top 10 by score',
    tooltip: 'Generate digest and verify it shows exactly 10 jobs sorted by match score'
  },
  {
    id: 'digest-persistence',
    title: 'Digest persists for the day',
    tooltip: 'Generate digest, refresh page, verify same digest loads without regenerating'
  },
  {
    id: 'no-console-errors',
    title: 'No console errors on main pages',
    tooltip: 'Navigate all main pages and check browser console for errors'
  }
];

/**
 * Get current test checklist state
 * @returns {Object} Test status object with all items as boolean values
 */
export function getTestChecklistStatus() {
  try {
    const statusStr = localStorage.getItem(TEST_CHECKLIST_KEY);
    if (statusStr) {
      return JSON.parse(statusStr);
    }
  } catch (error) {
    console.error('Error reading test checklist:', error);
  }
  
  // Return default state (all unchecked)
  const defaultStatus = {};
  TEST_ITEMS.forEach(item => {
    defaultStatus[item.id] = false;
  });
  return defaultStatus;
}

/**
 * Save test checklist state
 * @param {Object} status - Test status object
 */
export function saveTestChecklistStatus(status) {
  try {
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(status));
  } catch (error) {
    console.error('Error saving test checklist:', error);
  }
}

/**
 * Update specific test item status
 * @param {string} testId - Test item ID
 * @param {boolean} isChecked - New status
 */
export function updateTestItemStatus(testId, isChecked) {
  const currentStatus = getTestChecklistStatus();
  const newStatus = {
    ...currentStatus,
    [testId]: isChecked
  };
  saveTestChecklistStatus(newStatus);
  return newStatus;
}

/**
 * Reset all test items to unchecked
 */
export function resetTestChecklist() {
  const resetStatus = {};
  TEST_ITEMS.forEach(item => {
    resetStatus[item.id] = false;
  });
  saveTestChecklistStatus(resetStatus);
  return resetStatus;
}

/**
 * Get count of completed tests
 * @param {Object} status - Test status object
 * @returns {number} Number of completed tests
 */
export function getCompletedTestsCount(status) {
  return Object.values(status).filter(Boolean).length;
}

/**
 * Check if all tests are completed
 * @param {Object} status - Test status object
 * @returns {boolean} True if all 10 tests are completed
 */
export function areAllTestsCompleted(status) {
  return getCompletedTestsCount(status) === TEST_ITEMS.length;
}

/**
 * Get progress percentage
 * @param {Object} status - Test status object
 * @returns {number} Progress percentage (0-100)
 */
export function getProgressPercentage(status) {
  const total = TEST_ITEMS.length;
  const completed = getCompletedTestsCount(status);
  return Math.round((completed / total) * 100);
}