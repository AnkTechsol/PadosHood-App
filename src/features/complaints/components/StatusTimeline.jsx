import React from 'react';

const StatusTimeline = ({ timeline }) => {
  return (
    <div style={{ borderLeft: '2px solid var(--border)', marginLeft: '1rem', paddingLeft: '1rem' }}>
      {timeline.map((step, idx) => (
        <div key={idx} style={{ position: 'relative', marginBottom: '1rem' }}>
          <div style={{ position: 'absolute', left: '-1.45rem', top: '0.2rem', width: '0.8rem', height: '0.8rem', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
          <div style={{ fontWeight: 'bold' }}>{step.status}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(step.date).toLocaleString()}</div>
          <div style={{ fontSize: '0.9rem' }}>{step.message}</div>
        </div>
      ))}
    </div>
  );
};

export default StatusTimeline;
