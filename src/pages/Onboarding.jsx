import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { ShieldCheck, Upload, LogIn } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const { submitOnboarding } = useSociety();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    societyCode: '',
    block: '',
    flat: '',
    residentType: 'Owner',
    documentUrl: ''
  });
  
  const [error, setError] = useState('');

  const handleGoogleSignIn = () => {
    // Simulated Google OAuth Flow
    setTimeout(() => {
      setStep(2);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Auto-fill dummy doc if user just clicked upload without selecting (for prototype)
    const docUrl = formData.documentUrl || 'simulated_lease.pdf';

    const success = submitOnboarding(formData.societyCode, formData.block, formData.flat, formData.residentType, docUrl);
    
    if (success) {
      setStep(3);
    } else {
      setError('Invalid Society Code. Please contact your admin.');
    }
  };

  if (step === 3) {
    return (
      <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center', animation: 'fadeIn 0.4s ease-in-out' }}>
        <ShieldCheck size={64} color="var(--success)" style={{ marginBottom: '1rem' }} />
        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Verification Pending</h2>
        <p style={{ color: 'var(--text-main)', marginBottom: '2rem' }}>
          Your details and document proof have been securely submitted to your Society Admin. 
          You currently have Guest (Read-Only) access to community notices.
        </p>
        <button className="btn btn-primary" onClick={onComplete}>Enter Angaan</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', animation: 'fadeIn 0.3s ease-in-out' }}>
      <div className="card glass-panel" style={{ textAlign: 'center' }}>
        
        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem', fontWeight: '800' }}>
          Welcome to Angaan
        </h2>
        
        {step === 1 ? (
          <div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
              Sign in securely to connect with your society.
            </p>
            <button 
              className="btn" 
              style={{ width: '100%', justifyContent: 'center', backgroundColor: '#fff', color: '#333', border: '1px solid #ccc', fontSize: '1rem' }}
              onClick={handleGoogleSignIn}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', marginRight: '8px' }} />
              Continue with Google
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
             <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
              Complete your profile to join your society.
            </p>

            {error && (
              <div style={{ backgroundColor: '#fef2f2', color: 'var(--danger)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Society Invite Code</label>
              <input type="text" className="form-input" placeholder="e.g. ANG123" required 
                     value={formData.societyCode} onChange={e => setFormData({...formData, societyCode: e.target.value.toUpperCase()})} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Block/Tower</label>
                <input type="text" className="form-input" placeholder="e.g. Block A" required 
                       value={formData.block} onChange={e => setFormData({...formData, block: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Flat No.</label>
                <input type="text" className="form-input" placeholder="e.g. 402" required 
                       value={formData.flat} onChange={e => setFormData({...formData, flat: e.target.value})} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Resident Type</label>
              <select className="form-select" value={formData.residentType} onChange={e => setFormData({...formData, residentType: e.target.value})}>
                <option value="Owner">Owner</option>
                <option value="Tenant">Tenant</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Document Proof (Auto-Deleted Post Approval)</label>
              <div style={{ border: '1px dashed var(--border)', padding: '1.5rem', textAlign: 'center', borderRadius: '4px', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
                <Upload size={24} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '600' }}>Click to upload lease or bill</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Privacy First: Document is permanently deleted after verification.</div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              <LogIn size={18} style={{ marginRight: '0.4rem' }}/> Submit for Verification
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
