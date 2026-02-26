import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/ContextHeader';
import { Workspace } from '../components/Workspace';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { getTestChecklistStatus, areAllTestsCompleted } from '../utils/testChecklist';
import './ShipCheck.css';

/**
 * ShipCheck Route
 * 
 * Locked shipping verification page.
 * Only accessible when all 10 tests are completed.
 */
export function ShipCheck() {
  const [allTestsCompleted, setAllTestsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check test completion status on mount
  useEffect(() => {
    const testStatus = getTestChecklistStatus();
    setAllTestsCompleted(areAllTestsCompleted(testStatus));
    setIsLoading(false);
  }, []);

  // Handle navigation to test checklist
  const handleGoToTests = () => {
    window.location.hash = '/jt/07-test';
  };

  // Handle attempted shipping (demo action)
  const handleShip = () => {
    alert('🎉 Application shipped successfully!\n\nThis is a demo action. In a real deployment, this would trigger the actual shipping process.');
  };

  if (isLoading) {
    return (
      <div className="route-page">
        <ContextHeader 
          title="Ship Check"
          subtitle="Verifying readiness for deployment..."
        />
        <Workspace
          primary={
            <Card>
              <CardContent>
                <div className="ship-loading">
                  <p>Checking test status...</p>
                </div>
              </CardContent>
            </Card>
          }
        />
      </div>
    );
  }

  if (!allTestsCompleted) {
    return (
      <div className="route-page">
        <ContextHeader 
          title="Ship Check"
          subtitle="Deployment verification in progress..."
        />
        <Workspace
          primary={
            <div className="ship-locked-container">
              <Card className="ship-locked-card">
                <CardContent>
                  <div className="ship-locked-content">
                    <div className="ship-lock-icon">🔒</div>
                    <h2 className="ship-locked-title">Deployment Locked</h2>
                    <p className="ship-locked-message">
                      Complete all tests before shipping.
                    </p>
                    <p className="ship-locked-description">
                      All 10 functionality tests must pass verification before deployment is allowed.
                      Please complete the test checklist to unlock shipping capabilities.
                    </p>
                    <div className="ship-locked-actions">
                      <Button 
                        variant="primary" 
                        size="lg"
                        onClick={handleGoToTests}
                      >
                        Go to Test Checklist
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="route-page">
      <ContextHeader 
        title="Ship Check"
        subtitle="Ready for deployment"
      />
      <Workspace
        primary={
          <div className="ship-unlocked-container">
            <Card className="ship-unlocked-card">
              <CardContent>
                <div className="ship-unlocked-content">
                  <div className="ship-check-icon">✅</div>
                  <h2 className="ship-unlocked-title">Ready for Shipping</h2>
                  <p className="ship-unlocked-message">
                    All tests passed! The application is ready for deployment.
                  </p>
                  
                  <div className="ship-verification-summary">
                    <h3>Verification Complete:</h3>
                    <ul className="ship-verification-list">
                      <li>✓ Preferences persistence verified</li>
                      <li>✓ Match scoring accuracy confirmed</li>
                      <li>✓ Filter functionality validated</li>
                      <li>✓ Job saving persistence tested</li>
                      <li>✓ Apply functionality working</li>
                      <li>✓ Status tracking operational</li>
                      <li>✓ Status filtering functional</li>
                      <li>✓ Digest generation correct</li>
                      <li>✓ Daily digest persistence confirmed</li>
                      <li>✓ No console errors detected</li>
                    </ul>
                  </div>
                  
                  <div className="ship-actions">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleShip}
                    >
                      Ship Application
                    </Button>
                    <Button 
                      variant="secondary"
                      onClick={handleGoToTests}
                    >
                      Review Tests
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        }
      />
    </div>
  );
}