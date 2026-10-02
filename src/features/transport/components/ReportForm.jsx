import React, { useState } from 'react';

const ReportForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ title: '', delay: '15 mins', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ ...formData, id: Date.now().toString(), upvotes: 1, reportedBy: 'You' });
    }
    setFormData({ title: '', delay: '15 mins', description: '' });
    alert('Traffic alert reported!');
  };

  return (
    <div className="card" style={{ padding: '1.5rem', backgroundColor: '#eff6ff', borderRadius: 'var(--radius-md)', border: '1px solid #bfdbfe' }}>
      <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Report Traffic Delay</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="Location (e.g. Moshi Toll Plaza)" 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} 
          style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
          required 
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            value={formData.delay} 
            onChange={e => setFormData({...formData, delay: e.target.value})}
            style={{ flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
          >
            <option value="15 mins">15 mins delay</option>
            <option value="30 mins">30 mins delay</option>
            <option value="1 hour+">1 hour+ delay</option>
            <option value="Road Blocked">Road Blocked</option>
          </select>
        </div>
        <textarea 
          placeholder="More details (optional)" 
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value})}
          style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', minHeight: '80px' }}
        />
        <button type="submit" className="btn" style={{ padding: '0.8rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 'bold' }}>
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
