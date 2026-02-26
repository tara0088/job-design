import React from 'react';
import { Input, Select } from '../Input';
import { STATUS_OPTIONS } from '../../utils/jobStatus';
import './FilterBar.css';

/**
 * FilterBar Component
 * 
 * Includes:
 * - Keyword search (title/company)
 * - Location dropdown
 * - Mode dropdown
 * - Experience dropdown
 * - Source dropdown
 * - Sort dropdown (Latest default)
 */
export function FilterBar({ 
  filters, 
  onFilterChange,
  uniqueLocations,
  uniqueModes,
  uniqueExperiences,
  uniqueSources
}) {
  const sortOptions = [
    { value: 'match-score', label: 'Match Score' },
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'salary-high', label: 'Salary: High to Low' },
    { value: 'salary-low', label: 'Salary: Low to High' },
    { value: 'title', label: 'Title A-Z' }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-row">
        <div className="filter-item">
          <Input
            label="Keyword Search"
            placeholder="Search title or company..."
            value={filters.keyword}
            onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
          />
        </div>
        
        <div className="filter-item">
          <Select
            label="Location"
            options={[
              { value: '', label: 'All Locations' },
              ...uniqueLocations.map(location => ({ value: location, label: location }))
            ]}
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          />
        </div>
        
        <div className="filter-item">
          <Select
            label="Work Mode"
            options={[
              { value: '', label: 'All Modes' },
              ...uniqueModes.map(mode => ({ value: mode, label: mode }))
            ]}
            value={filters.mode}
            onChange={(e) => onFilterChange({ ...filters, mode: e.target.value })}
          />
        </div>
      </div>
      
      <div className="filter-row">
        <div className="filter-item">
          <Select
            label="Experience"
            options={[
              { value: '', label: 'All Levels' },
              ...uniqueExperiences.map(exp => ({ value: exp, label: exp }))
            ]}
            value={filters.experience}
            onChange={(e) => onFilterChange({ ...filters, experience: e.target.value })}
          />
        </div>
        
        <div className="filter-item">
          <Select
            label="Source"
            options={[
              { value: '', label: 'All Sources' },
              ...uniqueSources.map(source => ({ value: source, label: source }))
            ]}
            value={filters.source}
            onChange={(e) => onFilterChange({ ...filters, source: e.target.value })}
          />
        </div>
        
        <div className="filter-item">
          <Select
            label="Status"
            options={[
              { value: 'all', label: 'All Statuses' },
              ...Object.entries(STATUS_OPTIONS).map(([key, info]) => ({ 
                value: key, 
                label: info.label 
              }))
            ]}
            value={filters.status || 'all'}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          />
        </div>
        
        <div className="filter-item">
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
