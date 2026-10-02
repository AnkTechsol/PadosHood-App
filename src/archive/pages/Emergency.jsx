import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Phone, AlertTriangle } from 'lucide-react';
const Emergency = () => {
  const { emergency } = useContext(AppContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertTriangle size={24} color="var(--danger)" /> Emergency Contacts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {emergency.map((e, i) => (
          <div key={i} className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
            <div style={{ fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>{e.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{e.category}</div>
            <button onClick={() => alert('Calling: ' + e.phone)} className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Phone size={14} /> {e.phone}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Emergency;
