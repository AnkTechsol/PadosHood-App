import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { User, Phone, MapPin, Heart } from 'lucide-react';
const Login = () => {
  const { currentUser, loginUser, logoutUser } = useContext(AppContext);
  const [form, setForm] = useState({ name: '', phone: '', ward: 'B', address: '', bloodGroup: 'O+', occupation: '' });
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    if (otp !== '1234') { alert('Enter OTP: 1234 (demo)'); return; }
    loginUser({ ...form, role: 'Citizen', points: 0, badges: [], isVolunteer: false, volunteerSkills: [] });
  };
  if (currentUser) return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <User size={48} color="var(--primary-light)" style={{ marginBottom: '1rem' }} />
      <h2 style={{ color: 'var(--primary-dark)' }}>{currentUser.name}</h2>
      <p style={{ color: 'var(--text-muted)' }}>{currentUser.role} · Ward {currentUser.ward}</p>
      <div style={{ margin: '1rem 0', padding: '0.75rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ fontWeight: '700', color: 'var(--accent)' }}>{currentUser.points || 0} Civic Points</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentUser.badges?.join(', ') || 'No badges yet'}</div>
      </div>
      <button onClick={logoutUser} className="btn btn-secondary" style={{ width: '100%' }}>Logout</button>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)' }}>🏛️ Aaple Moshi</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Register as a Moshi Citizen</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {step === 1 ? (<>
            <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" required /></div>
            <div className="form-group"><label className="form-label">Mobile Number *</label><input className="form-input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98XXX XXXXX" required /></div>
            <div className="form-group"><label className="form-label">Address in Moshi</label><input className="form-input" value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Your area/sector" /></div>
            <div className="form-group"><label className="form-label">Occupation</label><input className="form-input" value={form.occupation} onChange={e => setForm({...form, occupation: e.target.value})} placeholder="Student / Business / Service..." /></div>
            <div className="form-group"><label className="form-label">Blood Group</label><select className="form-select" value={form.bloodGroup} onChange={e => setForm({...form, bloodGroup: e.target.value})}>{['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}</select></div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Send OTP →</button>
          </>) : (<>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Enter OTP sent to {form.phone}<br/><strong>(Demo OTP: 1234)</strong></p>
            <div className="form-group"><label className="form-label">Enter OTP</label><input className="form-input" value={otp} onChange={e => setOtp(e.target.value)} placeholder="4-digit OTP" maxLength={4} /></div>
            <button type="submit" className="btn btn-primary">Verify & Create Profile</button>
            <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
          </>)}
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.72rem', color: 'var(--text-light)' }}>
          Free platform courtesy of <a href="https://anktechsol.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-light)', fontWeight: '700' }}>anktechsol.com</a>
        </div>
      </div>
    </div>
  );
};
export default Login;
