import React, { useState, useContext } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import RegisterForm from './components/RegisterForm';

const Auth = () => {
  const { currentUser, loginUser, logoutUser } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [otp, setOtp] = useState('');

  const handleRegisterSubmit = (data) => {
    setFormData(data);
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === '1234') {
      loginUser({ ...formData, role: 'citizen', points: 0, badges: [] });
    } else {
      alert('Invalid OTP. Use 1234 for demo.');
    }
  };

  if (currentUser) {
    return (
      <div className="p-4" style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
        <div className="card max-w-md mx-auto" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>User Profile</h2>
          <p><strong>Name:</strong> {currentUser.name}</p>
          <p><strong>Role:</strong> {currentUser.role}</p>
          <p><strong>Ward:</strong> {currentUser.ward}</p>
          <p><strong>Points:</strong> {currentUser.points}</p>
          <div style={{ margin: '1rem 0' }}>
            <strong>Badges:</strong>
            {currentUser.badges && currentUser.badges.map(b => (
              <span key={b} className="badge badge-medium" style={{ marginLeft: '0.5rem', backgroundColor: 'var(--accent)', color: '#fff' }}>{b}</span>
            ))}
          </div>
          <button className="btn btn-secondary w-full" onClick={logoutUser}>Logout</button>
        </div>
        <div className="text-center mt-4">
          <a href="https://anktechsol.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>Free courtesy of anktechsol.com</a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4" style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <div className="card max-w-md mx-auto" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{step === 1 ? 'Register' : 'Verify OTP'}</h2>
        {step === 1 ? (
          <RegisterForm onSubmit={handleRegisterSubmit} />
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="form-group mb-4">
              <label className="form-label block mb-2">Enter OTP (Demo: 1234)</label>
              <input 
                type="text" 
                className="form-input w-full p-2 border" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-full p-2" style={{ backgroundColor: 'var(--primary)', color: '#fff' }}>Verify OTP</button>
          </form>
        )}
      </div>
      <div className="text-center mt-4">
        <a href="https://anktechsol.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}>Free courtesy of anktechsol.com</a>
      </div>
    </div>
  );
};

export default Auth;
