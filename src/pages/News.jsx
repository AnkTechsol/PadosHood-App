import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Newspaper,
  PlusCircle,
  Search,
  AlertTriangle,
  Flame,
  Droplets,
  Zap,
  Bus,
  CheckCircle,
  Share2,
  X,
  Clock,
  Building2,
  Bell
} from 'lucide-react';

export default function News() {
  const { news, addNewsItem, currentUser, t } = useContext(AppContext);

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeWard, setActiveWard] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State for publishing breaking civic news
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    category: 'PCMC Civic',
    ward_number: currentUser.pcmcWard || 'All Wards',
    source: 'PCMC Citizen Desk',
    important: false
  });

  const categories = ['All', 'Water Cut', 'Power Cut', 'Traffic', 'PCMC Civic', 'Civic Event'];

  const filteredNews = news.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchWard = activeWard === 'All' || item.ward_number?.includes(activeWard) || item.ward_number === 'All Wards';
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchWard && matchSearch;
  });

  const handlePublishSubmit = (e) => {
    e.preventDefault();
    addNewsItem(newsForm);
    setShowPublishModal(false);
    setNewsForm({
      title: '',
      content: '',
      category: 'PCMC Civic',
      ward_number: currentUser.pcmcWard || 'All Wards',
      source: 'PCMC Citizen Desk',
      important: false
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Water Cut': return <Droplets size={18} color="#2563eb" />;
      case 'Power Cut': return <Zap size={18} color="#d97706" />;
      case 'Traffic': return <Bus size={18} color="#c2410c" />;
      default: return <Building2 size={18} color="var(--primary)" />;
    }
  };

  const shareNewsToWhatsApp = (item) => {
    const text = `*${item.title}*\n\n${item.content}\n\n_Source: ${item.source} · Aaple Moshi News_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      
      {/* Header & Publish Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Newspaper size={26} color="var(--primary)" /> Moshi Live Civic News & Alerts
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            Real-time PCMC ward updates, water cuts, traffic diversions & power outage schedules
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowPublishModal(true)}
        >
          <PlusCircle size={18} /> Publish Civic Alert / News
        </button>
      </div>

      {/* Ticker Alert Banner */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        padding: '0.85rem 1rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-dark)', fontSize: '0.88rem' }}>
          <Bell size={18} color="var(--primary)" />
          <span style={{ fontWeight: '700' }}>Live PCMC Feed:</span>
          <span>Showing {filteredNews.length} verified news alerts for {currentUser.pcmcWard}</span>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ whiteSpace: 'nowrap', padding: '0.4rem 0.85rem', fontSize: '0.85rem', borderRadius: '99px' }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} size={18} />
        <input
          type="text"
          placeholder="Search news by title, category, or authority..."
          className="form-input"
          style={{ paddingLeft: '2.5rem' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* News Cards Feed System */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredNews.map(item => (
          <div
            key={item.id}
            className="card"
            style={{
              borderLeft: item.important ? '5px solid var(--danger)' : '4px solid var(--primary-light)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {getCategoryIcon(item.category)}
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  color: item.important ? 'var(--danger)' : 'var(--primary)'
                }}>
                  {item.category}
                </span>
                {item.important && (
                  <span className="badge" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>
                    HIGH PRIORITY ALERT
                  </span>
                )}
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={13} /> {new Date(item.date).toLocaleDateString()} · {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <h3 style={{ fontSize: '1.18rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
              {item.title}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.5 }}>
              {item.content}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Authority Source: <strong>{item.source}</strong> ({item.ward_number || 'All Moshi'})
              </div>

              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', color: '#25d366' }}
                onClick={() => shareNewsToWhatsApp(item)}
              >
                <Share2 size={14} /> Share News on WhatsApp
              </button>
            </div>
          </div>
        ))}

        {filteredNews.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>No news alerts found matching your query.</p>
          </div>
        )}
      </div>

      {/* Publish News Modal */}
      {showPublishModal && (
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
          <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
                Publish Civic News & Alert
              </h3>
              <button onClick={() => setShowPublishModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePublishSubmit}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={newsForm.category}
                  onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}
                >
                  <option value="Water Cut">Water Cut Alert</option>
                  <option value="Power Cut">Power Outage Alert</option>
                  <option value="Traffic">Traffic Diversion</option>
                  <option value="PCMC Civic">PCMC Civic Announcement</option>
                  <option value="Civic Event">Civic & Community Event</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Headline / Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 8-Hour Water Cut in Moshi Sector 4 on Thursday"
                  value={newsForm.title}
                  onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Content & Advisory</label>
                <textarea
                  className="form-textarea"
                  placeholder="Provide complete timing, affected areas, and guidance..."
                  value={newsForm.content}
                  onChange={e => setNewsForm({ ...newsForm, content: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Issuing Authority / Source</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. PCMC Water Dept / Moshi Traffic Police"
                  value={newsForm.source}
                  onChange={e => setNewsForm({ ...newsForm, source: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <input
                  type="checkbox"
                  id="important"
                  checked={newsForm.important}
                  onChange={e => setNewsForm({ ...newsForm, important: e.target.checked })}
                  style={{ width: '18px', height: '18px' }}
                />
                <label htmlFor="important" style={{ fontWeight: '600', color: 'var(--danger)', fontSize: '0.88rem' }}>
                  Mark as High Priority Alert (Highlight Red)
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Publish News Alert
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowPublishModal(false)} style={{ flex: 1, justifyContent: 'center' }}>
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
