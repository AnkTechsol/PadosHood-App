import React, { useContext } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import { MapPin } from 'lucide-react';

const statusColors = { Submitted: '#f59e0b', 'In Progress': '#3b82f6', Resolved: '#10b981', Rejected: '#ef4444' };

const LiveMap = () => {
  const { complaints } = useContext(AppContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MapPin size={24} color="var(--primary-light)" /> Live Complaint Map
      </h2>
      <div className="card" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', backgroundColor: '#f0f9ff', border: '2px dashed var(--primary-light)' }}>
        <MapPin size={48} color="var(--primary-light)" style={{ opacity: 0.5 }} />
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Interactive map view coming soon.<br/>Below are all reported complaints by area.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {complaints.length === 0 ? <p style={{ color: 'var(--text-light)', textAlign: 'center', gridColumn: '1/-1' }}>No complaints reported yet.</p> :
        complaints.map(c => (
          <div key={c.id} className="card" style={{ borderLeft: '4px solid ' + (statusColors[c.status] || '#94a3b8') }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)' }}>{c.category}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: '800', color: statusColors[c.status] || '#94a3b8' }}>{c.status}</span>
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>{c.id}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.address}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMap;
