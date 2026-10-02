import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { X, CheckCircle, ShieldCheck, Heart, MapPin, Phone } from 'lucide-react';

export default function ProgressiveProfileModal({ isOpen, onClose, mode = 'general' }) {
  const { currentUser, loginUser, updateUserProfile, pcmcWardSchedules, t } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    phone: currentUser.phone || '',
    bloodGroup: currentUser.bloodGroup || '',
    pcmcWard: currentUser.pcmcWard || 'Ward 4 (Moshi Pradhikaran)',
    locality: currentUser.locality || 'Moshi Gaon'
  });

  if (!isOpen) return null;

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const wards = Object.keys(pcmcWardSchedules || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser.isGuest && formData.phone) {
      loginUser({
        name: formData.name || 'Citizen',
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        pcmcWard: formData.pcmcWard,
        locality: formData.locality,
        role: 'Verified Resident'
      });
    } else {
      updateUserProfile(formData);
    }
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '460px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        animation: 'fadeIn 0.25s ease-out'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        {mode === 'blood' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.6rem', backgroundColor: '#fee2e2', color: 'var(--danger)', borderRadius: '50%' }}>
              <Heart size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-dark)', margin: 0 }}>
                Set Your Blood Group
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Required to connect with donors or offer emergency blood in Moshi
              </p>
            </div>
          </div>
        ) : mode === 'ward' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.6rem', backgroundColor: '#eff6ff', color: 'var(--primary)', borderRadius: '50%' }}>
              <MapPin size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-dark)', margin: 0 }}>
                Select Your PCMC Ward
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Get real-time water supply, garbage schedules & corporator news
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.6rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '50%' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-dark)', margin: 0 }}>
                {currentUser.isGuest ? 'Citizen Quick Registration' : 'Your Moshi Profile'}
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                {currentUser.isGuest ? 'Enter your details to unlock verified features' : 'Update your hyper-local neighborhood settings'}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Sambhaji Patil"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number (Mobile)</label>
            <input
              type="tel"
              className="form-input"
              placeholder="+91 98220 XXXXX"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">PCMC Ward Zone</label>
            <select
              className="form-select"
              value={formData.pcmcWard}
              onChange={e => setFormData({ ...formData, pcmcWard: e.target.value })}
            >
              {wards.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Blood Group (Optional / Opt-in)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {bloodGroups.map(bg => (
                <button
                  type="button"
                  key={bg}
                  onClick={() => setFormData({ ...formData, bloodGroup: bg })}
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: formData.bloodGroup === bg ? '2px solid var(--danger)' : '1px solid var(--border)',
                    backgroundColor: formData.bloodGroup === bg ? '#fee2e2' : 'var(--bg-card)',
                    color: formData.bloodGroup === bg ? 'var(--danger)' : 'var(--text-main)',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              <CheckCircle size={18} /> Save & Continue
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
