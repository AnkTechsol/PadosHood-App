import React from 'react';
import ResultCard from './ResultCard';

export default function ResultGroup({ group, setActiveTab }) {
  if (!group.results || group.results.length === 0) return null;

  return (
    <div style={{ marginBottom: '24px' }}>
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--border, #e2e8f0)'
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>{group.icon}</span>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: group.color || 'var(--text-main, #1e293b)' }}>
          {group.category}
        </h3>
        <span 
          style={{
            backgroundColor: `${group.color || '#e2e8f0'}20`,
            color: group.color || 'var(--text-main)',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}
        >
          {group.results.length}
        </span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {group.results.map((result) => (
          <ResultCard 
            key={result.id} 
            result={result} 
            setActiveTab={setActiveTab} 
          />
        ))}
      </div>
    </div>
  );
}
