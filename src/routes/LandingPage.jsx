import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './LandingPage.css';

/**
 * Landing Page (/)
 * 
 * Premium SaaS landing with:
 * - Headline: "Stop Missing The Right Jobs."
 * - Subtext: "Precision-matched job discovery delivered daily at 9AM."
 * - CTA: "Start Tracking" → navigates to /settings
 */
export function LandingPage() {
  const navigate = useNavigate();

  const handleStartTracking = () => {
    navigate('/settings');
  };

  return (
    <div className="landing-page">
      <div className="landing-page__container">
        <h1 className="landing-page__headline">
          Stop Missing The Right Jobs.
        </h1>
        <p className="landing-page__subtext">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <div className="landing-page__cta">
          <Button variant="primary" size="lg" onClick={handleStartTracking}>
            Start Tracking
          </Button>
        </div>
      </div>
    </div>
  );
}
