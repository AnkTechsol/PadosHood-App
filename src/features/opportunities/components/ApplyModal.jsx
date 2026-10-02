import React, { useState } from 'react';

const ApplyModal = ({ job, onClose, onSubmit }) => {
  const [fileUploaded, setFileUploaded] = useState(false);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
      <div className="card" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, color: 'var(--primary-dark)' }}>Apply for Role</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>
        
        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>{job.title}</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>{job.company} • {job.location}</p>
        </div>

        <div style={{ border: '2px dashed #cbd5e1', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', backgroundColor: fileUploaded ? '#f0fdf4' : 'transparent' }}>
          {fileUploaded ? (
            <div>
              <p style={{ color: '#166534', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>✓ Resume Uploaded</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>resume_2026.pdf (1.2 MB)</p>
            </div>
          ) : (
            <div>
              <p style={{ margin: '0 0 1rem 0' }}>Upload your resume (PDF/DOCX)</p>
              <button 
                onClick={() => setFileUploaded(true)} 
                style={{ padding: '0.5rem 1rem', backgroundColor: '#e2e8f0', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
              >
                Browse Files
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '0.8rem', backgroundColor: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Cancel</button>
          <button 
            onClick={onSubmit} 
            disabled={!fileUploaded}
            style={{ flex: 2, padding: '0.8rem', backgroundColor: fileUploaded ? 'var(--primary)' : '#94a3b8', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: fileUploaded ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
