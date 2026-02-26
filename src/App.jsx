import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { ContextHeader } from './components/ContextHeader';
import { Workspace } from './components/Workspace';
import { ProofFooter } from './components/ProofFooter';
import { Button } from './components/Button';
import { Input, Textarea, Select } from './components/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card';
import { Badge } from './components/Badge';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { LoadingState, SkeletonCard } from './components/LoadingState';
import { PromptBox } from './components/PromptBox';

/**
 * Design System Demo Page
 * 
 * Demonstrates all components and layout patterns
 */
function App() {
  const [footerItems, setFooterItems] = useState([
    { id: 'ui', label: 'UI Built', checked: true },
    { id: 'logic', label: 'Logic Working', checked: false },
    { id: 'test', label: 'Test Passed', checked: false },
    { id: 'deploy', label: 'Deployed', checked: false }
  ]);

  const handleFooterToggle = (id) => {
    setFooterItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const samplePrompt = `Create a job notification component that:
- Displays job title and company
- Shows salary range and location
- Includes apply button
- Supports bookmarking`;

  const selectOptions = [
    { value: '', label: 'Select an option' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' }
  ];

  return (
    <div className="app">
      <TopBar 
        currentStep={2} 
        totalSteps={5} 
        status="in-progress" 
      />
      
      <div className="app__content">
        <ContextHeader 
          title="Design System Foundation"
          subtitle="A calm, intentional, and coherent foundation for the Job Notification App."
        />
        
        <Workspace
          primary={
            <div className="primary-content">
              {/* Buttons Section */}
              <Card className="mb-2">
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Primary, secondary, and ghost variants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    <Button variant="primary" size="sm">Small</Button>
                    <Button variant="primary" size="md">Medium</Button>
                    <Button variant="primary" size="lg">Large</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Inputs Section */}
              <Card className="mb-2">
                <CardHeader>
                  <CardTitle>Form Inputs</CardTitle>
                  <CardDescription>Clean borders with clear focus states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <Input 
                      label="Job Title" 
                      placeholder="e.g., Senior Product Designer"
                    />
                    <Select 
                      label="Work Location" 
                      options={selectOptions}
                    />
                    <Textarea 
                      label="Job Description" 
                      placeholder="Describe the role and responsibilities..."
                      rows={3}
                    />
                    <Input 
                      label="Salary Range" 
                      placeholder="e.g., $80,000 - $120,000"
                      error="Please enter a valid salary range"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Badges Section */}
              <Card className="mb-2">
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Status indicators with consistent styling</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="accent">New</Badge>
                    <Badge variant="success">Active</Badge>
                    <Badge variant="warning">Pending</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* States Section */}
              <Card>
                <CardHeader>
                  <CardTitle>States</CardTitle>
                  <CardDescription>Error, empty, and loading states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <ErrorState 
                      title="Connection failed"
                      message="Unable to fetch job listings from the server."
                      solution="Check your internet connection and try again. If the problem persists, the server may be temporarily unavailable."
                      onRetry={() => console.log('Retry')}
                    />
                    
                    <EmptyState 
                      title="No jobs found"
                      description="We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms."
                      actionLabel="Clear Filters"
                      onAction={() => console.log('Clear filters')}
                    />
                    
                    <LoadingState message="Fetching jobs..." />
                  </div>
                </CardContent>
              </Card>
            </div>
          }
          secondary={
            <div className="secondary-content">
              <Card variant="subtle">
                <CardHeader>
                  <CardTitle>About This Step</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm">
                    This design system establishes the visual foundation for the Job Notification App. 
                    It includes typography, color, spacing, and component patterns.
                  </p>
                </CardContent>
              </Card>

              <PromptBox 
                label="Sample Prompt"
                content={samplePrompt}
              />

              <Card variant="subtle">
                <CardHeader>
                  <CardTitle>Design Principles</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="checklist">
                    <li className="checklist-item checklist-item--checked">
                      <span className="checklist-item__box">
                        <svg className="checklist-item__check" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                      </span>
                      Calm, intentional aesthetic
                    </li>
                    <li className="checklist-item checklist-item--checked">
                      <span className="checklist-item__box">
                        <svg className="checklist-item__check" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                      </span>
                      Maximum 4 colors
                    </li>
                    <li className="checklist-item checklist-item--checked">
                      <span className="checklist-item__box">
                        <svg className="checklist-item__check" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                      </span>
                      Strict spacing scale
                    </li>
                    <li className="checklist-item">
                      <span className="checklist-item__box" />
                      No gradients or glassmorphism
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <SkeletonCard />
            </div>
          }
        />
      </div>
      
      <ProofFooter 
        items={footerItems}
        onItemToggle={handleFooterToggle}
      />
    </div>
  );
}

export default App;
