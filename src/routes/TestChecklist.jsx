import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { TEST_ITEMS, getTestChecklistStatus, updateTestItemStatus, 
         resetTestChecklist, getCompletedTestsCount, getProgressPercentage } from '../utils/testChecklist';
import './TestChecklist.css';

/**
 * TestChecklist Route
 * 
 * Built-in test checklist system for Job Notification Tracker.
 * Tracks 10 critical functionality tests with persistence.
 */
export function TestChecklist() {
  const [testStatus, setTestStatus] = useState({});
  const [showTooltips, setShowTooltips] = useState({});

  // Load test status on mount
  useEffect(() => {
    setTestStatus(getTestChecklistStatus());
  }, []);

  // Handle checkbox toggle
  const handleTestToggle = (testId) => {
    const newStatus = updateTestItemStatus(testId, !testStatus[testId]);
    setTestStatus(newStatus);
  };

  // Handle reset button
  const handleReset = () => {
    const confirmation = window.confirm('Reset all test progress? This will uncheck all items.');
    if (confirmation) {
      const resetStatus = resetTestChecklist();
      setTestStatus(resetStatus);
    }
  };

  // Toggle tooltip visibility
  const toggleTooltip = (testId) => {
    setShowTooltips(prev => ({
      ...prev,
      [testId]: !prev[testId]
    }));
  };

  const completedCount = getCompletedTestsCount(testStatus);
  const progressPercentage = getProgressPercentage(testStatus);
  const allTestsCompleted = completedCount === TEST_ITEMS.length;

  return (
    <div className="route-page">
      <ContextHeader 
        title="Test Checklist"
        subtitle="Verify all core functionality before shipping."
      />
      <Workspace
        primary={
          <div className="test-checklist-container">
            {/* Progress Summary */}
            <Card className="test-summary-card">
              <CardContent>
                <div className="test-summary">
                  <div className="test-progress">
                    <h2 className="test-progress-text">
                      Tests Passed: <span className="test-count">{completedCount}</span> / {TEST_ITEMS.length}
                    </h2>
                    <div className="test-progress-bar">
                      <div 
                        className="test-progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="test-progress-percentage">
                      {progressPercentage}%
                    </div>
                  </div>
                  
                  {!allTestsCompleted && (
                    <div className="test-warning">
                      <p>Resolve all issues before shipping.</p>
                    </div>
                  )}
                  
                  {allTestsCompleted && (
                    <div className="test-success">
                      <p>✓ All tests passed! Ready for shipping.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Checklist Items */}
            <Card>
              <CardHeader>
                <CardTitle>Functionality Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-items-list">
                  {TEST_ITEMS.map((item) => (
                    <div key={item.id} className="test-item">
                      <div className="test-item-main">
                        <label className="test-checkbox-label">
                          <input
                            type="checkbox"
                            checked={testStatus[item.id] || false}
                            onChange={() => handleTestToggle(item.id)}
                            className="test-checkbox"
                          />
                          <span className="test-checkbox-custom" />
                          <span className="test-item-title">{item.title}</span>
                        </label>
                        
                        <button
                          className="test-tooltip-toggle"
                          onClick={() => toggleTooltip(item.id)}
                          aria-label="Toggle tooltip"
                        >
                          ?
                        </button>
                      </div>
                      
                      {showTooltips[item.id] && (
                        <div className="test-tooltip">
                          <p><strong>How to test:</strong> {item.tooltip}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="test-actions">
              <Button variant="secondary" onClick={handleReset}>
                Reset Test Status
              </Button>
              <Button 
                variant="primary" 
                onClick={() => window.location.hash = '/jt/08-ship'}
                disabled={!allTestsCompleted}
              >
                {allTestsCompleted ? 'Go to Ship Check' : 'Complete Tests First'}
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}