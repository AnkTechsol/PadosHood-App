import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Bus, Activity, MapPin, Search, Clock, ThumbsUp, AlertTriangle } from 'lucide-react';

export default function Transport() {
  const { trafficAlerts, addTrafficAlert, upvoteTrafficAlert, currentUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('Community Traffic Alerts');
  const [searchQuery, setSearchQuery] = useState('');

  // Traffic report form state
  const [reportForm, setReportForm] = useState({
    category: 'Congestion',
    delay: '10 mins',
    title: '',
    location: '',
    description: ''
  });
  const [showReward, setShowReward] = useState(false);

  const busRoutes = [
    { route: '357', path: 'Moshi Chowk → Pune Station via Bhosari Khadki', freq: 'Every 15 mins (06:00-22:00)', fare: '₹20' },
    { route: '358', path: 'Moshi Pradhikaran → Hinjewadi Phase 3 via Chikhali Akurdi Wakad', freq: 'Every 20 mins', fare: '₹25' },
    { route: '359', path: 'Moshi Chowk → Bhosari Hub via Spine Road', freq: 'Every 10 mins', fare: '₹10' },
    { route: '120A', path: 'Moshi Sector 4 → Hadapsar via Nashik Highway Pune Station Swargate', freq: 'Every 30 mins', fare: '₹30' },
    { route: 'Alandi-Moshi', path: 'Alandi Devasthan → Dehu Chowk via Moshi Chowk', freq: 'Every 15 mins', fare: '₹15' }
  ];

  const filteredRoutes = busRoutes.filter(r => 
    r.route.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (addTrafficAlert) {
      addTrafficAlert(reportForm);
      setReportForm({ category: 'Congestion', delay: '10 mins', title: '', location: '', description: '' });
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Transport & Traffic</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          className={`btn ${activeTab === 'Community Traffic Alerts' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('Community Traffic Alerts')}
        >
          <Activity size={18} /> Community Traffic Alerts
        </button>
        <button 
          className={`btn ${activeTab === 'PMPML Bus Timings' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('PMPML Bus Timings')}
        >
          <Bus size={18} /> PMPML Bus Timings
        </button>
      </div>

      {activeTab === 'Community Traffic Alerts' && (
        <div className="dashboard-columns">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Live Reports</h2>
            {trafficAlerts && trafficAlerts.length > 0 ? trafficAlerts.map(alert => (
              <div key={alert.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={18} color="var(--accent)" />
                    <h3 style={{ fontSize: '1.1rem' }}>{alert.title}</h3>
                  </div>
                  <span className="badge badge-medium">{alert.category}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>{alert.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><MapPin size={14}/> {alert.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Clock size={14}/> Delay: {alert.delay}</span>
                  </div>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => upvoteTrafficAlert && upvoteTrafficAlert(alert.id)}
                  >
                    <ThumbsUp size={14}/> {alert.upvotes || 0} Helpful
                  </button>
                </div>
              </div>
            )) : (
              <p>No active traffic alerts reported.</p>
            )}
          </div>
          
          <div>
            <div className="card">
              <div className="card-title">Report Traffic</div>
              {showReward && <div style={{ color: 'white', backgroundColor: 'var(--success)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>+10 Civic Points earned!</div>}
              <form onSubmit={handleReportSubmit}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={reportForm.category} onChange={e => setReportForm({...reportForm, category: e.target.value})}>
                    <option>Congestion</option>
                    <option>Accident</option>
                    <option>Roadwork</option>
                    <option>Water logging</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Est. Delay</label>
                  <select className="form-select" value={reportForm.delay} onChange={e => setReportForm({...reportForm, delay: e.target.value})}>
                    <option>5 mins</option>
                    <option>10 mins</option>
                    <option>20 mins</option>
                    <option>30+ mins</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-input" required placeholder="e.g. Traffic jam at Moshi Toll" value={reportForm.title} onChange={e => setReportForm({...reportForm, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input type="text" className="form-input" required placeholder="Street or Landmark" value={reportForm.location} onChange={e => setReportForm({...reportForm, location: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Details (Optional)</label>
                  <textarea className="form-textarea" style={{ minHeight: '60px' }} value={reportForm.description} onChange={e => setReportForm({...reportForm, description: e.target.value})}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Submit Report</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'PMPML Bus Timings' && (
        <div className="card">
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <Search style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="text" 
              placeholder="Search by route number or destination..." 
              className="form-input" 
              style={{ paddingLeft: '2.5rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-main)' }}>
                  <th style={{ padding: '0.75rem', borderBottom: '2px solid var(--border)' }}>Route</th>
                  <th style={{ padding: '0.75rem', borderBottom: '2px solid var(--border)' }}>Path</th>
                  <th style={{ padding: '0.75rem', borderBottom: '2px solid var(--border)' }}>Frequency</th>
                  <th style={{ padding: '0.75rem', borderBottom: '2px solid var(--border)' }}>Fare</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map((route, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: 'var(--primary)' }}>{route.route}</td>
                    <td style={{ padding: '0.75rem' }}>{route.path}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{route.freq}</td>
                    <td style={{ padding: '0.75rem', fontWeight: '500' }}>{route.fare}</td>
                  </tr>
                ))}
                {filteredRoutes.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No routes found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
