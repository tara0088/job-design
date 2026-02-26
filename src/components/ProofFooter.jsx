import React from 'react';
import './ProofFooter.css';

/**
 * ProofFooter Component
 * 
 * Checklist style footer:
 * □ UI Built
 * □ Logic Working
 * □ Test Passed
 * □ Deployed
 */
export function ProofFooter({ 
  items = [
    { id: 'ui', label: 'UI Built', checked: false },
    { id: 'logic', label: 'Logic Working', checked: false },
    { id: 'test', label: 'Test Passed', checked: false },
    { id: 'deploy', label: 'Deployed', checked: false }
  ],
  onItemToggle 
}) {
  return (
    <footer className="proof-footer">
      <div className="proof-footer__container">
        <ul className="proof-footer__checklist">
          {items.map((item) => (
            <li 
              key={item.id}
              className={`proof-footer__item ${item.checked ? 'proof-footer__item--checked' : ''}`}
              onClick={() => onItemToggle && onItemToggle(item.id)}
              style={{ cursor: onItemToggle ? 'pointer' : 'default' }}
            >
              <span className="proof-footer__checkbox">
                {item.checked && (
                  <svg className="proof-footer__check-icon" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                )}
              </span>
              <span className="proof-footer__label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
