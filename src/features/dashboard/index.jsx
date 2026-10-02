import React, { useContext, useState } from 'react';
import { AppContext } from '../../shared/context/AppContext';
// Mock import for EmergencyBar
const EmergencyBar = () => <div style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '0.5rem', textAlign: 'center' }}>Emergency Contacts: 100 / 108</div>;

const Dashboard = ({ setActiveTab }) => {
  const { currentUser, complaints, news, trafficAlerts, jobs } = useContext(AppContext);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  const name = currentUser ? currentUser.name : 'Guest';
  const latestAlert = trafficAlerts?.length > 0 ? trafficAlerts[0] : null;

  return (
    <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      {/* Top Section */}
      <div style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-light))', color: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }}>
        <h1>Namaskar {name}</h1>
        <p>Welcome to Aaple Moshi Dashboard</p>
        <div style={{ marginTop: '1rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
          Weather: 29°C, Moshi Monsoon Sky, AQI 42
        </div>
      </div>

      {latestAlert && (
        <div onClick={() => setActiveTab('transport')} style={{ cursor: 'pointer', backgroundColor: 'var(--accent)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontWeight: 'bold' }}>
          Traffic Alert: {latestAlert.title} - Delay: {latestAlert.delay}
        </div>
      )}

      <EmergencyBar />

      <div className="dashboard-columns" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="card" onClick={() => setActiveTab('complaints')} style={{ padding: '1rem', cursor: 'pointer', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>📝 File Complaint</div>
            <div className="card" onClick={() => setActiveTab('ai-assistant')} style={{ padding: '1rem', cursor: 'pointer', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>🤖 AI Scheme Help</div>
            <div className="card" onClick={() => setActiveTab('transport')} style={{ padding: '1rem', cursor: 'pointer', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>🚦 Traffic Alerts</div>
            <div className="card" onClick={() => setActiveTab('opportunities')} style={{ padding: '1rem', cursor: 'pointer', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>💼 Jobs Board</div>
            <div className="card" onClick={() => setActiveTab('marketplace')} style={{ padding: '1rem', cursor: 'pointer', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>🛒 Marketplace</div>
            <div className="card" onClick={() => setActiveTab('directory')} style={{ padding: '1rem', cursor: 'pointer', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>📞 Utility Directory</div>
          </div>

          <div style={{ background: 'linear-gradient(45deg, #2563eb, #3b82f6)', color: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3>✨ Confused about PCMC schemes?</h3>
            <button className="btn mt-2" onClick={() => setActiveTab('ai-assistant')} style={{ backgroundColor: 'white', color: 'var(--primary)', padding: '0.5rem 1rem', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Ask AI</button>
          </div>

          <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Today's Civic Alerts</h3>
            {news?.slice(0, 2).map((item, idx) => (
              <div key={idx} style={{ padding: '0.5rem 0' }}>{item.title}</div>
            ))}
          </div>

          <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Recent Complaints</h3>
            {complaints?.slice(0, 3).map((c, idx) => (
              <div key={idx} style={{ padding: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                <span>{c.category}</span>
                <span className="badge badge-assigned" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'linear-gradient(to right, #10b981, #34d399)', color: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3>Volunteer Panel</h3>
            <button className="btn mt-2" onClick={() => setShowVolunteerModal(true)} style={{ backgroundColor: 'white', color: 'var(--success)', padding: '0.5rem 1rem', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Register as Volunteer</button>
          </div>

          {jobs?.length > 0 && (
            <div className="card" onClick={() => setActiveTab('opportunities')} style={{ cursor: 'pointer', padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
              <h3>Featured Job</h3>
              <p><strong>{jobs[0].title}</strong> at {jobs[0].company}</p>
            </div>
          )}

          <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
            <h3>Points & Badges</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{currentUser ? currentUser.points : 0}</p>
            <div>
              {currentUser?.badges?.map(b => (
                <span key={b} className="badge badge-medium" style={{ backgroundColor: 'var(--accent)', color: 'white', marginRight: '0.5rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showVolunteerModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', width: '400px' }}>
            <h2>Volunteer Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              {['Medical Aid', 'Tree Plantation', 'Blood Donation', 'Teaching', 'Cleanliness Drive', 'IT Help', 'Disaster Response'].map(skill => (
                <label key={skill}><input type="checkbox" /> {skill}</label>
              ))}
            </div>
            <button className="btn btn-primary mt-4 w-full" onClick={() => setShowVolunteerModal(false)} style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
