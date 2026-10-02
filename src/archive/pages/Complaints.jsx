import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AlertCircle, PlusCircle, Clock, CheckCircle } from 'lucide-react';

export default function Complaints() {
  const { complaints, addComplaint, updateComplaintStatus, currentUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('Submit Complaint');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState({
    category: 'Road',
    description: '',
    address: '',
    priority: 'Medium',
    anonymous: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComplaint(formData);
    setSuccessMsg('Complaint submitted successfully!');
    setFormData({ category: 'Road', description: '', address: '', priority: 'Medium', anonymous: false });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Civic Complaints</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          className={`btn ${activeTab === 'Submit Complaint' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('Submit Complaint')}
        >
          <PlusCircle size={18} /> Submit Complaint
        </button>
        <button 
          className={`btn ${activeTab === 'My Complaints' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('My Complaints')}
        >
          <Clock size={18} /> My Complaints
        </button>
      </div>

      {activeTab === 'Submit Complaint' && (
        <div className="card">
          <div className="card-title"><AlertCircle size={20}/> New Complaint</div>
          {successMsg && <div style={{ color: 'white', backgroundColor: 'var(--success)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>{successMsg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="form-select">
                {['Road', 'Garbage', 'Water', 'Drainage', 'Street Light', 'Electricity', 'Construction', 'Sewage', 'Other'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-textarea" required />
            </div>
            <div className="form-group">
              <label className="form-label">Location Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} className="form-select">
                {['Low', 'Medium', 'High'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} id="anonymous" />
              <label htmlFor="anonymous" style={{ color: 'var(--text-main)' }}>Submit anonymously</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit Complaint</button>
          </form>
        </div>
      )}

      {activeTab === 'My Complaints' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {complaints && complaints.length > 0 ? (
            complaints.map(comp => (
              <div key={comp.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600' }}>{comp.category}</span>
                  <span className={`badge ${comp.status === 'Resolved' ? 'badge-medium' : 'badge-assigned'}`}>{comp.status || 'Pending'}</span>
                </div>
                <p style={{ color: 'var(--text-muted)' }}>{comp.description}</p>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', display: 'flex', gap: '1rem' }}>
                  <span>📍 {comp.address}</span>
                  <span>🔥 Priority: {comp.priority}</span>
                </div>
                {comp.status === 'Resolved' && (
                  <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '500' }}>Are you satisfied with the resolution?</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}><CheckCircle size={14}/> Yes</button>
                      <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}><AlertCircle size={14}/> No</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No complaints filed yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
