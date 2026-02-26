import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TopNavigation } from './components/TopNavigation';
import { ToastProvider } from './components/Toast/Toast';
import { LandingPage, Dashboard, Saved, Digest, Settings, Proof, TestChecklist, ShipCheck, NotFound } from './routes';
import './App.css';

/**
 * App Component with Routing
 * 
 * Job Notification Tracker
 * 
 * Routes:
 * - /           -> Landing Page
 * - /dashboard  -> Dashboard
 * - /saved      -> Saved Jobs
 * - /digest     -> Daily Digest
 * - /settings   -> Settings
 * - /proof      -> Proof
 * - *           -> 404 Not Found
 */
function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="app">
          <TopNavigation />
          <main className="app__main">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/digest" element={<Digest />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/proof" element={<Proof />} />
              <Route path="/jt/07-test" element={<TestChecklist />} />
              <Route path="/jt/08-ship" element={<ShipCheck />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
