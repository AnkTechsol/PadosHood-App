import React from 'react';
import { Phone } from 'lucide-react';
const EmergencyBar = () => (
  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
    {[{label:'Police 100',phone:'100',color:'#ef4444'},{label:'Ambulance 108',phone:'108',color:'#10b981'},{label:'Fire 101',phone:'101',color:'#f59e0b'},{label:'Women 1091',phone:'1091',color:'#8b5cf6'}].map(e => (
      <button key={e.phone} onClick={() => alert('Calling: ' + e.phone)} style={{ backgroundColor: e.color, color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Phone size={13} /> {e.label}
      </button>
    ))}
  </div>
);
export default EmergencyBar;
