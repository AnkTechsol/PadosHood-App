import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Phone,
  ShieldAlert,
  Heart,
  PlusCircle,
  MessageCircle,
  Search,
  CheckCircle,
  UserCheck,
  Building2,
  Ambulance,
  Flame,
  Shield,
  Zap,
  Users
} from 'lucide-react';

export default function Emergency({ onOpenProfiling }) {
  const { currentUser, bloodDonors, registerAsBloodDonor, t } = useContext(AppContext);

  const [activeTabMode, setActiveTabMode] = useState('donors'); // 'donors' or 'sos'
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Local state for Blood Donor opt-in registration modal
  const [showOptInModal, setShowOptInModal] = useState(false);
  const [donorForm, setDonorForm] = useState({
    full_name: currentUser.name || '',
    blood_group: currentUser.bloodGroup || 'O+',
    locality: currentUser.pcmcWard || 'Sector 4, Moshi',
    phone: currentUser.phone || ''
  });

  const bloodGroups = ['All', 'A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'];

  const emergencyContacts = [
    { name: 'Moshi Police Station', category: 'Police', phone: '020-27139100', urgency: 'High', icon: Shield, address: 'Dehu-Alandi Rd, Moshi Chowk' },
    { name: 'Sanjeevani Hospital 24/7 ICU & Ambulance', category: 'Hospital', phone: '020-27130045', urgency: 'High', icon: Ambulance, address: 'Nashik Highway, opp Moshi Toll' },
    { name: 'PCMC Fire Station (Bhosari / Moshi Desk)', category: 'Fire', phone: '020-27122101', urgency: 'High', icon: Flame, address: 'Sector 7, MIDC' },
    { name: 'Damini Squad Women Safety Helpline', category: 'Helpline', phone: '1091', urgency: 'High', icon: ShieldAlert, address: 'PCMC Police Command' },
    { name: 'YCM Hospital Govt Blood Bank', category: 'Blood Bank', phone: '020-27425000', urgency: 'High', icon: Heart, address: 'Pimpri-Chinchwad' },
    { name: 'MNGL Natural Gas Leakage Emergency', category: 'Gas Leak', phone: '1800-266-1800', urgency: 'High', icon: Zap, address: 'Moshi Supply Zone' },
    { name: 'MSEDCL Moshi Electricity Emergency Desk', category: 'Electricity', phone: '1800-233-3435', urgency: 'Medium', icon: Zap, address: 'Indrayani Substation' },
    { name: 'Moshi Citizen Society Federation Desk', category: 'Society Rep', phone: '+91 98220 11990', urgency: 'Medium', icon: Users, address: 'Pradhikaran Sector 4' }
  ];

  const filteredDonors = bloodDonors.filter(d => {
    const matchBg = selectedBloodGroup === 'All' || d.blood_group === selectedBloodGroup;
    const matchSearch = d.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        d.locality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBg && matchSearch;
  });

  const handleRegisterDonorSubmit = (e) => {
    e.preventDefault();
    registerAsBloodDonor(donorForm);
    setShowOptInModal(false);
  };

  const getMaskedPhone = (phone) => {
    if (!phone) return '+91 98XXX XXXX';
    return phone.slice(0, 7) + ' XXXX';
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      
      {/* Top Banner & Tab Switcher */}
      <div style={{
        background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <ShieldAlert size={24} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>
              Moshi Blood Donors & Emergency SOS
            </h1>
          </div>
          <p style={{ opacity: 0.9, fontSize: '0.85rem', margin: 0 }}>
            Hyper-local emergency network connecting Moshi citizens with verified blood donors & 24/7 aid
          </p>
        </div>

        <button
          className="btn"
          style={{ backgroundColor: 'white', color: '#dc2626', fontWeight: '700' }}
          onClick={() => setShowOptInModal(true)}
        >
          <PlusCircle size={16} /> Register as Blood Donor
        </button>
      </div>

      {/* Segmented Control Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button
          className={`btn ${activeTabMode === 'donors' ? 'btn-primary' : 'btn-secondary'}`}
          style={{
            flex: 1,
            justify: 'center',
            backgroundColor: activeTabMode === 'donors' ? '#dc2626' : undefined,
            borderColor: activeTabMode === 'donors' ? '#dc2626' : undefined
          }}
          onClick={() => setActiveTabMode('donors')}
        >
          <Heart size={18} /> Blood Donor Hub ({filteredDonors.length})
        </button>

        <button
          className={`btn ${activeTabMode === 'sos' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, justifyContent: 'center' }}
          onClick={() => setActiveTabMode('sos')}
        >
          <Phone size={18} /> 1-Tap Emergency Calling
        </button>
      </div>

      {activeTabMode === 'donors' ? (
        <div>
          {/* Blood Group Filter Chips Specification C */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Filter by Blood Group:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {bloodGroups.map(bg => (
                <button
                  key={bg}
                  onClick={() => {
                    if (bg !== 'All' && !currentUser.bloodGroup) {
                      // Prompt progressive profiling non-intrusively
                      onOpenProfiling('blood');
                    }
                    setSelectedBloodGroup(bg);
                  }}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '99px',
                    border: selectedBloodGroup === bg ? '2px solid #dc2626' : '1px solid var(--border)',
                    backgroundColor: selectedBloodGroup === bg ? '#fee2e2' : 'var(--bg-card)',
                    color: selectedBloodGroup === bg ? '#dc2626' : 'var(--text-main)',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {bg === 'All' ? 'All Blood Groups' : bg}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} size={18} />
            <input
              type="text"
              placeholder="Search donor name or locality in Moshi (e.g., Sector 4)..."
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Donor Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {filteredDonors.map(donor => (
              <div key={donor.id} className="card" style={{ borderLeft: '4px solid #dc2626' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
                      {donor.full_name}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      📍 {donor.locality}
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    fontWeight: '900',
                    fontSize: '1rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #fca5a5'
                  }}>
                    {donor.blood_group}
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Status: <strong style={{ color: 'var(--success)' }}>Available in Moshi</strong></span>
                  <span>Donated: {donor.last_donated}</span>
                </div>

                {/* Privacy Protected Contact Buttons Specification C */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <a
                    href={`https://wa.me/91${donor.phone.replace(/[^0-9]/g, '')}?text=Urgent%20Blood%20Req%20in%20Moshi%20for%20Group%20${encodeURIComponent(donor.blood_group)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    style={{ backgroundColor: '#25d366', color: 'white', justifyContent: 'center', fontSize: '0.78rem', textDecoration: 'none' }}
                  >
                    <MessageCircle size={14} /> Contact Donor
                  </a>

                  <a
                    href={`tel:${donor.phone}`}
                    className="btn btn-secondary"
                    style={{ justifyContent: 'center', fontSize: '0.78rem', textDecoration: 'none' }}
                  >
                    <Phone size={14} /> Call ({getMaskedPhone(donor.phone)})
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Emergency 1-Tap Calling Directory Specification C */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {emergencyContacts.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div key={idx} className="card" style={{ borderLeft: '4px solid var(--danger)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div style={{ padding: '0.5rem', backgroundColor: '#fee2e2', color: 'var(--danger)', borderRadius: '50%' }}>
                      <Icon size={20} />
                    </div>
                    <span className="badge" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>
                      {contact.urgency} Urgency
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
                    {contact.name}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    📍 {contact.address}
                  </div>
                </div>

                <a
                  href={`tel:${contact.phone}`}
                  className="btn btn-primary"
                  style={{ backgroundColor: 'var(--danger)', width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                >
                  <Phone size={16} /> Call {contact.phone}
                </a>
              </div>
            );
          })}
        </div>
      )}

      {/* Blood Donor Opt-in Modal */}
      {showOptInModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '440px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.6rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '50%' }}>
                <Heart size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
                  Blood Donor Opt-In Directory
                </h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  Your phone number will be protected with masked privacy options.
                </p>
              </div>
            </div>

            <form onSubmit={handleRegisterDonorSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={donorForm.full_name}
                  onChange={e => setDonorForm({ ...donorForm, full_name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <select
                  className="form-select"
                  value={donorForm.blood_group}
                  onChange={e => setDonorForm({ ...donorForm, blood_group: e.target.value })}
                >
                  {bloodGroups.filter(bg => bg !== 'All').map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Locality in Moshi</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Sector 4, Spine Road, Moshi Gaon"
                  value={donorForm.locality}
                  onChange={e => setDonorForm({ ...donorForm, locality: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+91 98XXXXXXXX"
                  value={donorForm.phone}
                  onChange={e => setDonorForm({ ...donorForm, phone: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#dc2626', flex: 1, justifyContent: 'center' }}>
                  <CheckCircle size={18} /> Join Donor Directory
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowOptInModal(false)} style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
