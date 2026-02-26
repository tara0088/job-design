import React from 'react';
import './Input.css';

/**
 * Input Component
 * 
 * Clean borders, clear focus state
 * Supports error state
 */
export function Input({
  id,
  label,
  error,
  helperText,
  className = '',
  ...props
}) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`input-field ${error ? 'input-field--error' : ''}`}
        {...props}
      />
      {error && (
        <span className="input-error" role="alert">
          <svg className="input-error__icon" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM7 6v6h2V6H7zm0 8v-2h2v2H7z"/>
          </svg>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="input-helper">{helperText}</span>
      )}
    </div>
  );
}

/**
 * Textarea Component
 */
export function Textarea({
  id,
  label,
  error,
  helperText,
  className = '',
  rows = 4,
  ...props
}) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`input-field input-field--textarea ${error ? 'input-field--error' : ''}`}
        {...props}
      />
      {error && (
        <span className="input-error" role="alert">
          <svg className="input-error__icon" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM7 6v6h2V6H7zm0 8v-2h2v2H7z"/>
          </svg>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="input-helper">{helperText}</span>
      )}
    </div>
  );
}

/**
 * Select Component
 */
export function Select({
  id,
  label,
  error,
  helperText,
  options = [],
  className = '',
  ...props
}) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <div className="input-select-wrapper">
        <select
          id={id}
          className={`input-field input-field--select ${error ? 'input-field--error' : ''}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <span className="input-error" role="alert">
          <svg className="input-error__icon" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM7 6v6h2V6H7zm0 8v-2h2v2H7z"/>
          </svg>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="input-helper">{helperText}</span>
      )}
    </div>
  );
}
