import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, MapPin, Briefcase, IndianRupee, GraduationCap, CheckCircle } from 'lucide-react';

export default function Opportunities() {
  const { jobs, currentUser, applyToJob } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);

  const types = ['All', 'Full-time', 'Part-time', 'Gig'];

  let filteredJobs = jobs || [];
  if (typeFilter !== 'All') {
    filteredJobs = filteredJobs.filter(j => j.type === typeFilter);
  }
  if (searchQuery) {
    filteredJobs = filteredJobs.filter(j => 
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      j.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsUploading(false);
    setUploadDone(false);
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadDone(true);
    }, 1500);
  };

  const submitApplication = () => {
    if (applyToJob) applyToJob(selectedJob.id);
    setSelectedJob(null);
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Local Job Board</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} size={20} />
          <input 
            type="text" 
            placeholder="Search roles, companies..." 
            className="form-input" 
            style={{ paddingLeft: '2.5rem' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {types.map(t => (
            <button 
              key={t}
              className={`btn ${typeFilter === t ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 0.8rem', fontSize: '0.9rem' }}
              onClick={() => setTypeFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredJobs.map(job => {
          const isApplied = currentUser?.appliedJobs?.includes(job.id);
          return (
            <div key={job.id} className="card" style={{ border: isApplied ? '1px solid var(--success)' : '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className="badge badge-medium">{job.category}</span>
                <span className="badge badge-assigned">{job.type}</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>{job.title}</h3>
              <div style={{ fontWeight: '500', color: 'var(--text-main)', marginBottom: '1rem' }}>{job.company}</div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.2rem', flex: 1 }}>{job.description}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={14}/> {job.location}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span>₹</span> {job.salary}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><GraduationCap size={14}/> {job.qualification}</div>
              </div>

              {isApplied ? (
                <button className="btn btn-secondary" disabled style={{ width: '100%', justifyContent: 'center', color: 'var(--success)', borderColor: 'var(--success)' }}>
                  <CheckCircle size={18}/> APPLIED
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => handleApplyClick(job)} style={{ width: '100%', justifyContent: 'center' }}>
                  Apply Now
                </button>
              )}
            </div>
          );
        })}
        {filteredJobs.length === 0 && <p>No jobs found matching your criteria.</p>}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Apply for {selectedJob.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>at {selectedJob.company}</p>
            
            <div className="form-group">
              <label className="form-label">Resume / CV (Optional)</label>
              <div 
                style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '2rem', textAlign: 'center', cursor: 'pointer', backgroundColor: 'var(--bg-main)' }}
                onClick={handleSimulateUpload}
              >
                {isUploading ? (
                  <span style={{ color: 'var(--text-muted)' }}>Uploading...</span>
                ) : uploadDone ? (
                  <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><CheckCircle size={18}/> resume.pdf attached</span>
                ) : (
                  <span style={{ color: 'var(--primary)' }}>Click to upload resume</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={submitApplication} style={{ flex: 1, justifyContent: 'center' }}>Submit Application</button>
              <button className="btn btn-secondary" onClick={() => setSelectedJob(null)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
