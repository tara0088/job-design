import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TopNavigation } from './components/TopNavigation';
import { Dashboard, Saved, Digest, Settings, Proof, NotFound } from './routes';
import './App.css';

/**
 * App Component with Routing
 * 
 * Routes:
 * - /           -> Dashboard
 * - /dashboard  -> Dashboard
 * - /saved      -> Saved Jobs
 * - /digest     -> Job Digest
 * - /settings   -> Settings
 * - /proof      -> Proof
 * - *           -> 404 Not Found
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <TopNavigation />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/proof" element={<Proof />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
