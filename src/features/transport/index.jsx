import React, { useContext, useState } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import { Bus, ThumbsUp, AlertTriangle, Search } from 'lucide-react';

const busRoutes = [
  { route: '357', from: 'Moshi Chowk', to: 'Pune Station', via: 'Bhosari, Khadki', freq: 'Every 15 mins (06:00 - 22:00)', fare: '₹20' },
  { route: '358', from: 'Moshi Pradhikaran', to: 'Hinjewadi Phase 3', via: 'Chikhali, Akurdi, Wakad', freq: 'Every 20 mins', fare: '₹25' },
  { route: '359', from: 'Moshi Chowk', to: 'Bhosari Hub', via: 'Spine Road', freq: 'Every 10 mins', fare: '₹10' },
  { route: '120A', from: 'Moshi Sector 4', to: 'Hadapsar', via: 'Nashik Hwy, Pune Stn, Swargate', freq: 'Every 30 mins', fare: '₹30' },
  { route: 'Alandi-Moshi', from: 'Alandi Devasthan', to: 'Dehu Chowk', via: 'Moshi Chowk', freq: 'Every 15 mins', fare: '₹15' },
];

const Transport = () => {
  const { trafficAlerts, addTrafficAlert, upvoteTrafficAlert } = useContext(AppContext);
  const [subTab, setSubTab] = useState('traffic');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ category: 'Congestion', delay: '15 mins delay', location: '', description: '' });

  const handleReport = (e) => {
    e.preventDefault();
    addTrafficAlert({ ...form, title: `${form.category} at ${form.location}` });
    setForm({ category: 'Congestion', delay: '15 mins delay', location: '', description: '' });
  };

  const filteredBuses = busRoutes.filter(b => b.route.toLowerCase().includes(search.toLowerCase()) || b.to.toLowerCase().includes(search.toLowerCase()) || b.via.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bus size={24} color="var(--primary-light)" /> Moshi Transport & Traffic Center
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setSubTab('traffic')} className={"btn " + (subTab === 'traffic' ? 'btn-primary' : 'btn-secondary')}>
            Traffic Alerts ({trafficAlerts.length})
          </button>
          <button onClick={() => setSubTab('bus')} className={"btn " + (subTab === 'bus' ? 'btn-primary' : 'btn-secondary')}>
            PMPML Bus Routes
          </button>
        </div>
      </div>

      {subTab === 'traffic' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>Live Citizen Reports</h3>
            {trafficAlerts.map(a => (
              <div key={a.id} className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#d97706' }}>{a.category} · {a.delay}</span>
                  <button onClick={() => upvoteTrafficAlert(a.id)} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <ThumbsUp size={10} /> Upvote ({a.upvotes})
                  </button>
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{a.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{a.description}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Reported by {a.reportedBy}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ height: 'fit-content' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertTriangle size={16} color="#f59e0b" /> Report Traffic Delay
            </h3>
            <form onSubmit={handleReport} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Issue Type</label>
                <select className="form-select" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  <option>Congestion</option>
                  <option>Accident</option>
                  <option>Roadwork</option>
                  <option>Water logging</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Delay Estimate</label>
                <select className="form-select" value={form.delay} onChange={e => setForm({...form, delay: e.target.value})}>
                  <option>5 mins delay</option>
                  <option>15 mins delay</option>
                  <option>30+ mins delay</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Location / Landmark *</label>
                <input className="form-input" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="e.g. Spine Road Junction" required />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Details on traffic flow..." required />
              </div>
              <button type="submit" className="btn btn-primary">Post Traffic Alert (+10 Pts)</button>
            </form>
          </div>
        </div>
      )}

      {subTab === 'bus' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', maxWidth: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input className="form-input" style={{ paddingLeft: '2.25rem' }} placeholder="Search route or destination..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Bus No.</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Route</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Via</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Frequency</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Fare</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuses.map((b, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '800', color: 'var(--primary-dark)' }}>🚌 {b.route}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{b.from} → <strong>{b.to}</strong></td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{b.via}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{b.freq}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--success)' }}>{b.fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transport;
