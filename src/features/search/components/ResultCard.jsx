import React, { useState } from 'react';

export default function ResultCard({ result, setActiveTab }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        backgroundColor: isHovered ? 'var(--bg-main, #f0f4f8)' : 'transparent',
        transition: 'background-color 0.2s ease',
        cursor: 'pointer',
        borderRadius: '8px'
      }}
      onClick={() => setActiveTab(result.action)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span 
            style={{ 
              backgroundColor: result.badgeColor ? `${result.badgeColor}20` : 'var(--primary-light, #3b82f620)',
              color: result.badgeColor || 'var(--primary, #1e40af)',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}
          >
            {result.badge}
          </span>
          <span style={{ fontWeight: 'bold', color: 'var(--text-main, #1e293b)' }}>
            {result.title}
          </span>
        </div>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted, #64748b)' }}>
          {result.subtitle}
        </span>
      </div>
      
      <button 
        className="btn btn-secondary"
        style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: '1px solid var(--border, #e2e8f0)',
          backgroundColor: 'var(--bg-card, #ffffff)',
          color: 'var(--primary, #1e40af)',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: isHovered ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
        }}
        onClick={(e) => {
          e.stopPropagation();
          setActiveTab(result.action);
        }}
      >
        {result.actionLabel}
      </button>
    </div>
  );
}
