import React from 'react';

const JobCard = ({ job, currentUser, onApply, hasApplied }) => {
  return (
    <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.8rem', backgroundColor: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>{job.category}</span>
        <span style={{ fontSize: '0.8rem', backgroundColor: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>{job.type}</span>
      </div>
      <h3 style={{ margin: '0.5rem 0', color: 'var(--primary-dark)' }}>{job.title}</h3>
      <p style={{ margin: '0 0 1rem 0', fontWeight: 'bold', color: 'var(--text-main)' }}>{job.company}</p>
      
      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>📍 {job.location}</p>
      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>💰 {job.salary}</p>
      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>🎓 {job.qualification}</p>
      
      <p style={{ margin: '1rem 0', fontSize: '0.9rem', lineHeight: '1.4' }}>{job.description}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{job.applyCount || 0} applied</span>
        <button 
          onClick={onApply} 
          disabled={hasApplied}
          style={{ padding: '0.5rem 1.5rem', backgroundColor: hasApplied ? '#10b981' : 'var(--primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: hasApplied ? 'default' : 'pointer', fontWeight: 'bold' }}
        >
          {hasApplied ? 'Applied ✓' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
