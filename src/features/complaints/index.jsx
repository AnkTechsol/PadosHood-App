import React, { useContext, useState } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import { AlertCircle, PlusCircle, Clock, CheckCircle } from 'lucide-react';

const Complaints = () => {
  const { complaints, addComplaint, updateComplaintStatus, submitComplaintFeedback, currentUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('submit');
  const [form, setForm] = useState({ category: 'Garbage', description: '', address: '', priority: 'Medium', anonymous: false });
  const [submittedId, setSubmittedId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = addComplaint(form);
    setSubmittedId(created.id);
    setForm({ category: 'Garbage', description: '', address: '', priority: 'Medium', anonymous: false });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={24} color="var(--primary-light)" /> Civic Complaint Management
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setActiveTab('submit')} className={"btn " + (activeTab === 'submit' ? 'btn-primary' : 'btn-secondary')}>
            <PlusCircle size={16} /> Submit New
          </button>
          <button onClick={() => setActiveTab('my')} className={"btn " + (activeTab === 'my' ? 'btn-primary' : 'btn-secondary')}>
            <Clock size={16} /> My Complaints ({complaints.length})
          </button>
        </div>
      </div>

      {activeTab === 'submit' && (
        <div className="card" style={{ maxWidth: '650px' }}>
          {submittedId && (
            <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontWeight: '600' }}>
              ✓ Complaint registered successfully! Ticket ID: <strong>{submittedId}</strong>. You earned +15 Civic Points.
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {['Road', 'Garbage', 'Water', 'Drainage', 'Street Light', 'Electricity', 'Construction', 'Sewage', 'Tree Fallen', 'Illegal Parking', 'Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Location / Area Address *</label>
              <input className="form-input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="e.g. Sector 4, near Woodsville society" required />
            </div>
            <div className="form-group">
              <label className="form-label">Detailed Description *</label>
              <textarea className="form-textarea" rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Explain the civic issue in detail..." required />
            </div>
            <div className="form-group">
              <label className="form-label">Priority Level</label>
              <select className="form-select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="anon" checked={form.anonymous} onChange={e => setForm({ ...form, anonymous: e.target.checked })} />
              <label htmlFor="anon" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>Submit Anonymously</label>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Submit Complaint Ticket (+15 Pts)</button>
          </form>
        </div>
      )}

      {activeTab === 'my' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {complaints.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No complaints submitted yet.</div>
          ) : (
            complaints.map(c => (
              <div key={c.id} className="card" style={{ borderLeft: '4px solid var(--primary-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-light)' }}>{c.category} · Priority: {c.priority}</span>
                  <span className="badge badge-assigned">{c.status}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{c.id} — {c.address}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{c.description}</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', borderTop: '1px dashed var(--border)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Assigned Karyakarta: <strong>{c.assignedKaryakarta}</strong></span>
                  <span>Dept: <strong>{c.department}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Complaints;
