import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder, autoFocus }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Search 
        style={{ 
          position: 'absolute', 
          left: '16px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: 'var(--text-muted, #64748b)' 
        }} 
        size={20} 
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={{
          width: '100%',
          padding: '16px 48px 16px 48px',
          borderRadius: '12px',
          border: '1px solid var(--border, #e2e8f0)',
          fontSize: '1.1rem',
          outline: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          backgroundColor: 'var(--bg-card, #ffffff)',
          color: 'var(--text-main, #1e293b)'
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted, #64748b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px'
          }}
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
