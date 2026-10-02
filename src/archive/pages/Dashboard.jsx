import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AlertCircle, MapPin, Newspaper, Calendar, Heart, CloudSun, TrendingUp, Award, PlusCircle, Activity, HeartHandshake, BookOpen, ShoppingBag, Briefcase, Bus, Sparkles } from 'lucide-react';
import EmergencyBar from '../components/EmergencyBar';

export default function Dashboard({ setActiveTab }) {
  const { currentUser, complaints, news, events, registerAsVolunteer, jobs, trafficAlerts } = useContext(AppContext);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availability, setAvailability] = useState('Weekends');

  const skillsList = ['Medical Aid', 'Tree Plantation', 'Blood Donation', 'Teaching', 'Cleanliness Drive', 'IT Help', 'Disaster Response'];

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleVolunteerSubmit = () => {
    if (registerAsVolunteer) registerAsVolunteer({ skills: selectedSkills, availability });
    setShowVolunteerModal(false);
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      {/* Top Banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', borderRadius: 'var(--radius-md)', padding: '2rem', color: 'white', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.2rem' }}>Namaskar, {currentUser?.name || 'Citizen'}! 🙏</h1>
          <p style={{ opacity: 0.9 }}>Welcome to Aaple Moshi Civic Platform</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CloudSun size={28} />
            <div>
              <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>29°C</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Moshi Monsoon Sky</div>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>AQI</div>
            <div style={{ fontWeight: '600', color: '#a7f3d0' }}>42 (Good)</div>
          </div>
        </div>
      </div>

      {/* Traffic Ticker */}
      {trafficAlerts && trafficAlerts.length > 0 && (
        <div 
          onClick={() => setActiveTab('transport')}
          style={{ backgroundColor: '#fff7ed', border: '1px solid #fdba74', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '1.5rem', color: '#c2410c' }}
        >
          <Activity size={20} />
          <span style={{ fontWeight: '600' }}>Live Traffic Alert:</span>
          <span>{trafficAlerts[0].title} - Expect delay of {trafficAlerts[0].delay}</span>
        </div>
      )}

      <EmergencyBar />

      <div className="dashboard-columns" style={{ marginTop: '1.5rem' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Quick Services */}
          <div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>Quick Services</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
              <button className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }} onClick={() => setActiveTab('complaints')}>
                <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', color: 'var(--primary)', borderRadius: '50%' }}><PlusCircle size={24}/></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>File Complaint</span>
              </button>
              <button className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }} onClick={() => setActiveTab('aiAssistant')}>
                <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', color: 'var(--success)', borderRadius: '50%' }}><Sparkles size={24}/></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>AI Scheme Help</span>
              </button>
              <button className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }} onClick={() => setActiveTab('transport')}>
                <div style={{ padding: '0.75rem', backgroundColor: '#fff7ed', color: 'var(--accent)', borderRadius: '50%' }}><Bus size={24}/></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Traffic Alerts</span>
              </button>
              <button className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }} onClick={() => setActiveTab('opportunities')}>
                <div style={{ padding: '0.75rem', backgroundColor: '#f5f3ff', color: '#7c3aed', borderRadius: '50%' }}><Briefcase size={24}/></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Jobs Board</span>
              </button>
              <button className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }} onClick={() => setActiveTab('marketplace')}>
                <div style={{ padding: '0.75rem', backgroundColor: '#fdf2f8', color: '#db2777', borderRadius: '50%' }}><ShoppingBag size={24}/></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Marketplace</span>
              </button>
              <button className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }} onClick={() => setActiveTab('directory')}>
                <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', color: 'var(--text-muted)', borderRadius: '50%' }}><BookOpen size={24}/></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Utility Directory</span>
              </button>
            </div>
          </div>

          {/* AI Assistant CTA */}
          <div className="card" style={{ background: 'linear-gradient(to right, #eff6ff, #dbeafe)', border: '1px solid #bfdbfe' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: '50%' }}><Sparkles size={24}/></div>
                <div>
                  <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>Confused about PCMC & Government Schemes?</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chat in English, Marathi, or Hindi to check your eligibility instantly.</p>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setActiveTab('aiAssistant')}>Ask AI</button>
            </div>
          </div>

          {/* Recent Complaints */}
          <div className="card">
            <div className="card-title"><AlertCircle size={20}/> Recent Complaints</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {complaints && complaints.length > 0 ? complaints.slice(0, 3).map(comp => (
                <div key={comp.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '0.2rem' }}>{comp.category} Issue</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><MapPin size={12}/> {comp.address}</div>
                  </div>
                  <div><span className={`badge ${comp.status === 'Resolved' ? 'badge-medium' : 'badge-assigned'}`}>{comp.status || 'Pending'}</span></div>
                </div>
              )) : (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No recent complaints.</p>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Volunteer Network */}
          <div className="card" style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)', border: '1px solid #bbf7d0' }}>
            <div className="card-title" style={{ color: '#166534' }}><HeartHandshake size={20}/> Volunteer Network</div>
            <p style={{ fontSize: '0.9rem', color: '#166534', marginBottom: '1rem', opacity: 0.9 }}>Join hands to make Moshi better! Earn points and community badges.</p>
            <button className="btn" style={{ backgroundColor: '#166534', color: 'white', width: '100%', justifyContent: 'center' }} onClick={() => setShowVolunteerModal(true)}>
              Register as Volunteer
            </button>
          </div>

          {/* Featured Job */}
          {jobs && jobs.length > 0 && (
            <div className="card">
              <div className="card-title"><Briefcase size={20}/> Featured Local Job</div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontWeight: '600' }}>{jobs[0].title}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{jobs[0].company}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="badge badge-medium">{jobs[0].type}</span>
                </div>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }} onClick={() => setActiveTab('opportunities')}>View All Jobs</button>
            </div>
          )}

          {/* Gamification / Leaderboard */}
          <div className="card">
            <div className="card-title"><Award size={20}/> Your Civic Score</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent)' }}>{currentUser?.points || 0}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Points Earned</div>
            </div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Badges:</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge" style={{ backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' }}>🌟 Civic Starter</span>
              {currentUser?.points > 50 && <span className="badge" style={{ backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #86efac' }}>🌿 Eco Warrior</span>}
            </div>
          </div>
          
        </div>
      </div>

      {/* Volunteer Modal */}
      {showVolunteerModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Register as Volunteer</h2>
            <div className="form-group">
              <label className="form-label">Select your skills / interests:</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {skillsList.map(skill => (
                  <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={selectedSkills.includes(skill)} onChange={() => handleSkillChange(skill)} />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Availability:</label>
              <select className="form-select" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                <option value="Weekends">Weekends Only</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Anytime">Anytime / Emergencies</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={handleVolunteerSubmit} style={{ flex: 1, justifyContent: 'center' }}>Join Network</button>
              <button className="btn btn-secondary" onClick={() => setShowVolunteerModal(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
