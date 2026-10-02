import React, { useState } from 'react';
import { useSociety } from '../../context/SocietyContext';
import { Send, Camera } from 'lucide-react';

export default function ComplaintForm({ onSuccess }) {
  const { addComplaint } = useSociety();
  const [formData, setFormData] = useState({
    category: 'Lift Failure',
    location: '',
    priority: 'Medium',
    description: '',
    visibility: 'Private to Committee',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComplaint(formData);
    setFormData({
      category: 'Lift Failure',
      location: '',
      priority: 'Medium',
      description: '',
      visibility: 'Private to Committee',
    });
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="card glass-panel" style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
        Raise a New Complaint
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="form-select">
            {['Lift Failure', 'Plumbing', 'Electrical', 'Water Supply', 'Security', 'Common Area Cleaning', 'Parking Issue', 'Other'].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} className="form-select">
            {['Low', 'Medium', 'High', 'Emergency'].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Sub-Category / Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-input" placeholder="e.g. Block A, Clubhouse, Flat 402" required />
      </div>

      <div className="form-group">
        <label className="form-label">Detailed Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="form-textarea" placeholder="Describe the issue clearly..." required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'end' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Visibility</label>
          <select name="visibility" value={formData.visibility} onChange={handleChange} className="form-select">
            <option value="Private to Committee">Private to Committee</option>
            <option value="Public to Society">Public to Society</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-secondary">
            <Camera size={16} /> Attach Image
          </button>
          <button type="submit" className="btn btn-primary">
            <Send size={16} /> Submit
          </button>
        </div>
      </div>
    </form>
  );
}
