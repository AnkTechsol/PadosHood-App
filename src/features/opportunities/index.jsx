import React, { useContext, useState } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import { Briefcase, MapPin, CheckCircle } from 'lucide-react';

const Opportunities = () => {
  const { jobs, currentUser, applyToJob } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applied, setApplied] = useState(false);

  const filtered = jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.category.toLowerCase().includes(search.toLowerCase()));

  const handleApply = () => {
    if (!currentUser) return;
    applyToJob(selectedJob.id);
    setApplied(true);
    setTimeout(() => { setSelectedJob(null); setApplied(false); }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={24} color="var(--primary-light)" /> Moshi Hyperlocal Jobs Board
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Connect local talent with Moshi merchants and MIDC units.</p>
        </div>
        <input className="form-input" style={{ maxWidth: '260px' }} placeholder="Search jobs or skills..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filtered.map(j => {
          const hasApplied = currentUser && j.applicants.includes(currentUser.name);
          return (
            <div key={j.id} className="card" style={{ display: 'flex', flexDirection: 'column', border: hasApplied ? '2px solid var(--success)' : '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge badge-assigned">{j.category}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>{j.type}</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>{j.title}</h3>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary-light)', marginBottom: '0.5rem' }}>{j.company}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{j.description}</p>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem', backgroundColor: 'var(--bg-main)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
                <div>📍 {j.location}</div>
                <div>💰 <strong>{j.salary}</strong></div>
                <div>🎓 {j.qualification}</div>
              </div>
              <button
                onClick={() => setSelectedJob(j)}
                disabled={hasApplied}
                className={"btn " + (hasApplied ? 'btn-secondary' : 'btn-primary')}
                style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}
              >
                {hasApplied ? '✓ Applied' : 'Apply Now (+10 Pts)'}
              </button>
            </div>
          );
        })}
      </div>

      {selectedJob && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '440px', width: '100%' }}>
            {applied ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--success)' }}>
                <CheckCircle size={48} style={{ marginBottom: '0.5rem' }} />
                <h3>Application Submitted!</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedJob.company} will contact you shortly.</p>
              </div>
            ) : (
              <>
                <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Apply for {selectedJob.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Company: {selectedJob.company}</p>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Applicant Name</label>
                  <input className="form-input" value={currentUser?.name || ''} readOnly />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleApply} className="btn btn-primary" style={{ flex: 1 }}>Confirm Application</button>
                  <button onClick={() => setSelectedJob(null)} className="btn btn-secondary">Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
