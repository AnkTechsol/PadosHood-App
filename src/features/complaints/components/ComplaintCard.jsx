import React from 'react';
import StatusTimeline from './StatusTimeline';

const ComplaintCard = ({ complaint, onUpdateStatus, onFeedback, isAdmin }) => {
  const statusColors = {
    'Submitted': 'var(--accent)',
    'In Progress': 'var(--primary-light)',
    'Resolved': 'var(--success)',
    'Rejected': 'var(--danger)'
  };

  return (
    <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <span style={{ fontWeight: 'bold' }}>#{complaint.id}</span>
          <span className="badge" style={{ marginLeft: '0.5rem', padding: '0.2rem 0.5rem', backgroundColor: '#e2e8f0', borderRadius: 'var(--radius-sm)' }}>{complaint.category}</span>
        </div>
        <span className="badge" style={{ backgroundColor: statusColors[complaint.status] || '#ccc', color: 'white', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>{complaint.status}</span>
      </div>
      <p style={{ margin: '0.5rem 0' }}><strong>Address:</strong> {complaint.address}</p>
      <p style={{ margin: '0.5rem 0' }}>{complaint.description}</p>
      
      <div style={{ marginTop: '1rem' }}>
        <StatusTimeline timeline={complaint.timeline || []} />
      </div>

      {complaint.status === 'Resolved' && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
          <p>Are you satisfied with the resolution?</p>
          <button onClick={onFeedback} style={{ marginRight: '0.5rem', padding: '0.3rem 1rem', backgroundColor: 'var(--success)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Yes</button>
          <button onClick={onFeedback} style={{ padding: '0.3rem 1rem', backgroundColor: 'var(--danger)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>No</button>
        </div>
      )}

      {isAdmin && (
        <div style={{ marginTop: '1rem' }}>
          <select onChange={(e) => onUpdateStatus(complaint.id, e.target.value)} defaultValue={complaint.status} style={{ padding: '0.3rem', marginRight: '0.5rem' }}>
            <option value="Submitted">Submitted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default ComplaintCard;
