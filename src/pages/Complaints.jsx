import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import ComplaintForm from '../components/complaints/ComplaintForm';
import ComplaintStepper from '../components/complaints/ComplaintStepper';
import { ShieldCheck, PlusCircle, Clock, AlertTriangle, Edit3, X, User } from 'lucide-react';

export default function Complaints() {
  const { currentUser, complaints, updateComplaintStatus } = useSociety();
  
  // For Resident
  const [activeTab, setActiveTab] = useState('Track Issues');
  
  // For Admin Dashboard
  const [adminFilter, setAdminFilter] = useState('All');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusUpdateForm, setStatusUpdateForm] = useState({ status: 'Assigned', note: '' });

  const residentComplaints = complaints.filter(c => c.resident.id === currentUser.id);
  
  const adminComplaints = complaints.filter(c => {
    if (adminFilter === 'All') return true;
    return c.status === adminFilter;
  });

  const handleAdminStatusUpdate = (e) => {
    e.preventDefault();
    updateComplaintStatus(selectedComplaint.id, statusUpdateForm.status, statusUpdateForm.note);
    setShowStatusModal(false);
  };

  const isSlaBreached = (timeline) => {
    const raisedLog = timeline.find(t => t.status === 'Raised');
    if (!raisedLog) return false;
    const hoursElapsed = (Date.now() - new Date(raisedLog.timestamp).getTime()) / 3600000;
    return hoursElapsed > 48;
  };

  if (currentUser.role === 'Admin') {
    return (
      <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
              Complaint Management Dashboard
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
              Track, assign, and resolve society grievances.
            </p>
          </div>
        </div>

        <div className="no-scrollbar" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem', WebkitOverflowScrolling: 'touch' }}>
          {['All', 'Raised', 'Assigned', 'Resolved', 'Closed'].map(st => (
            <button
              key={st}
              className={`btn ${adminFilter === st ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '99px', fontSize: '0.85rem' }}
              onClick={() => setAdminFilter(st)}
            >
              {st}
            </button>
          ))}
        </div>

        <div style={{ overflowX: 'auto', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Ticket ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Resident</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Category & Location</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>SLA</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminComplaints.map(c => {
                const slaBreached = isSlaBreached(c.timeline) && c.status !== 'Resolved' && c.status !== 'Closed';
                return (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>#{c.id}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={16} color="var(--text-muted)" /> {c.resident.name}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{c.category}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.location}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-assigned">{c.status}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {slaBreached ? (
                        <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '600', fontSize: '0.8rem' }}>
                          <AlertTriangle size={14} /> &gt;48 Hrs
                        </span>
                      ) : (
                        <span style={{ color: 'var(--success)', fontSize: '0.8rem' }}>On Track</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                        onClick={() => {
                          setSelectedComplaint(c);
                          setStatusUpdateForm({ status: c.status === 'Raised' ? 'Assigned' : c.status, note: '' });
                          setShowStatusModal(true);
                        }}
                      >
                        <Edit3 size={14} /> Update
                      </button>
                    </td>
                  </tr>
                );
              })}
              {adminComplaints.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No complaints found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Status Update Modal */}
        {showStatusModal && selectedComplaint && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
            <div className="card glass-panel" style={{ width: '100%', maxWidth: '450px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>Update Ticket #{selectedComplaint.id}</h3>
                <button onClick={() => setShowStatusModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
              </div>
              
              <form onSubmit={handleAdminStatusUpdate}>
                <div className="form-group">
                  <label className="form-label">New Status</label>
                  <select className="form-select" value={statusUpdateForm.status} onChange={e => setStatusUpdateForm({ ...statusUpdateForm, status: e.target.value })}>
                    <option value="Raised">Raised</option>
                    <option value="Assigned">Assigned (In Progress)</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Internal Note / Resolution Detail</label>
                  <textarea className="form-textarea" value={statusUpdateForm.note} onChange={e => setStatusUpdateForm({ ...statusUpdateForm, note: e.target.value })} placeholder="e.g. Assigned to electrician Rajesh." required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>Update Status</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Resident View
  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
            Society Helpdesk
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
            Raise and track your complaints easily.
          </p>
        </div>
      </div>

      <div className="no-scrollbar" style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <button
          style={{
            background: 'none', border: 'none', padding: '0.5rem 1rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
            borderBottom: activeTab === 'Track Issues' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'Track Issues' ? 'var(--primary)' : 'var(--text-muted)'
          }}
          onClick={() => setActiveTab('Track Issues')}
        >
          <Clock size={16} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'text-bottom' }}/> 
          Track My Complaints
        </button>
        <button
          style={{
            background: 'none', border: 'none', padding: '0.5rem 1rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
            borderBottom: activeTab === 'Report Issue' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'Report Issue' ? 'var(--primary)' : 'var(--text-muted)'
          }}
          onClick={() => setActiveTab('Report Issue')}
        >
          <PlusCircle size={16} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'text-bottom' }}/> 
          Raise New Complaint
        </button>
      </div>

      {activeTab === 'Report Issue' && (
        <ComplaintForm onSuccess={() => setActiveTab('Track Issues')} />
      )}

      {activeTab === 'Track Issues' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {residentComplaints.map(c => (
            <div key={c.id} className="card hover-elevate">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Ticket #{c.id}</div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary-dark)', margin: '0 0 0.5rem 0' }}>{c.category}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}><strong>Location:</strong> {c.location}</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>{c.description}</p>
                </div>
                <span className="badge" style={{ backgroundColor: c.priority === 'High' || c.priority === 'Emergency' ? '#fef2f2' : '#f8fafc', color: c.priority === 'High' || c.priority === 'Emergency' ? 'var(--danger)' : 'var(--text-main)', border: '1px solid var(--border)' }}>
                  {c.priority} Priority
                </span>
              </div>
              
              <ComplaintStepper complaint={c} />
            </div>
          ))}

          {residentComplaints.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>You have no active complaints.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
