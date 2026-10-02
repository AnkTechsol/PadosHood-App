import React from 'react';

const AlertFeed = ({ alerts = [], onUpvote }) => {
  if (alerts.length === 0) return <p>No active traffic alerts.</p>;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {alerts.map(alert => (
        <div key={alert.id} className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--primary-dark)' }}>{alert.title}</h4>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{alert.description}</p>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{alert.delay} delay</span>
                <span>Reported by: {alert.reportedBy}</span>
              </div>
            </div>
            <button 
              onClick={() => onUpvote(alert.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f3f4f6', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '1.2rem' }}>⬆️</span>
              <span style={{ fontWeight: 'bold' }}>{alert.upvotes || 0}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertFeed;
