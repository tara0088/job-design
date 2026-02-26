import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './TopNavigation.css';

/**
 * TopNavigation Component
 * 
 * Shared navigation bar with:
 * - Links: Dashboard | Saved | Digest | Settings | Proof
 * - Active link has deep red underline (#8B0000)
 * - Mobile hamburger menu with clean dropdown
 * - No flashy hover effects
 * - No heavy shadows
 */
export function TopNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/saved', label: 'Saved' },
    { to: '/digest', label: 'Digest' },
    { to: '/settings', label: 'Settings' },
    { to: '/proof', label: 'Proof' },
  ];

  const devLinks = [
    { to: '/jt/07-test', label: 'Test' },
    { to: '/jt/08-ship', label: 'Ship' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="top-navigation">
      <div className="top-navigation__container">
        {/* Logo / App Name */}
        <NavLink to="/" className="top-navigation__brand" onClick={closeMobileMenu}>
          Job Notification Tracker
        </NavLink>

        {/* Desktop Navigation */}
        <div className="top-navigation__desktop">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `top-navigation__link ${isActive ? 'top-navigation__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          
          {/* Developer Tools */}
          <div className="top-navigation__dev-tools">
            {devLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `top-navigation__dev-link ${isActive ? 'top-navigation__dev-link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="top-navigation__hamburger"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
        >
          <span className={`hamburger-line ${mobileMenuOpen ? 'hamburger-line--open' : ''}`} />
          <span className={`hamburger-line ${mobileMenuOpen ? 'hamburger-line--open' : ''}`} />
          <span className={`hamburger-line ${mobileMenuOpen ? 'hamburger-line--open' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-menu"
        className={`top-navigation__mobile ${mobileMenuOpen ? 'top-navigation__mobile--open' : ''}`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `top-navigation__mobile-link ${isActive ? 'top-navigation__mobile-link--active' : ''}`
            }
            onClick={closeMobileMenu}
          >
            {link.label}
          </NavLink>
        ))}
        
        {/* Developer Tools in Mobile */}
        <div className="top-navigation__mobile-dev">
          {devLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `top-navigation__mobile-dev-link ${isActive ? 'top-navigation__mobile-dev-link--active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}