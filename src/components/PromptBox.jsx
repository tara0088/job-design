import React, { useState } from 'react';
import './PromptBox.css';
import { Button } from './Button';

/**
 * PromptBox Component
 * 
 * Copyable prompt box for the secondary panel
 * Shows copy button on hover
 */
export function PromptBox({
  content,
  label = 'Prompt',
  className = ''
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`prompt-box ${className}`}>
      <div className="prompt-box__header">
        <span className="prompt-box__label">{label}</span>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleCopy}
          className="prompt-box__copy-btn"
        >
          {copied ? (
            <>
              <svg className="prompt-box__icon" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="prompt-box__icon" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 1.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1h.5a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h.5v-1zM5 2v1h6V2H5z"/>
              </svg>
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="prompt-box__content">
        <code>{content}</code>
      </pre>
    </div>
  );
}
