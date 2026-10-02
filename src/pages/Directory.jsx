import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Wrench,
  Search,
  Phone,
  Star,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
  Award,
  GraduationCap,
  Sparkles,
  Zap,
  Hammer,
  ShieldCheck
} from 'lucide-react';

export default function Directory() {
  const { tradesmen, directoryData, t } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('tradesmen'); // 'tradesmen' or 'schools'
  const [activeTrade, setActiveTrade] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tradeCategories = [
    'All',
    'Plumber',
    'Electrician',
    'Appliance Repair',
    'Carpenter',
    'Domestic Help / Maid'
  ];

  const filteredTradesmen = tradesmen.filter(t => {
    const matchCat = activeTrade === 'All' || t.trade_category === activeTrade;
    const matchSearch = t.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.trade_category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
            🛠️ Local Services & Skilled Tradesmen Directory
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            Verified plumbers, electricians, appliance technicians & utilities operating in Moshi
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {tradeCategories.map(trade => (
          <button
            key={trade}
            className={`btn ${activeTrade === trade ? 'btn-primary' : 'btn-secondary'}`}
            style={{ whiteSpace: 'nowrap', padding: '0.4rem 0.85rem', fontSize: '0.85rem', borderRadius: '99px' }}
            onClick={() => setActiveTrade(trade)}
          >
            {trade}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} size={18} />
        <input
          type="text"
          placeholder="Search tradesman by name, skill, or Moshi sector..."
          className="form-input"
          style={{ paddingLeft: '2.5rem' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tradesmen Cards Grid Specification E */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
        {filteredTradesmen.map(trd => (
          <div key={trd.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className="badge badge-assigned">{trd.trade_category}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontWeight: '700', fontSize: '0.85rem' }}>
                  <Star size={14} fill="currentColor" /> {trd.rating} ({trd.reviews_count} reviews)
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>
                {trd.full_name}
              </h3>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.4rem' }}>
                <MapPin size={14} /> Service Zone: <strong>{trd.locality}</strong>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span>Exp: <strong>{trd.experience}</strong></span>
                <span>Rate: <strong style={{ color: 'var(--primary)' }}>{trd.hourly_rate}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <a
                href={`https://wa.me/${trd.whatsapp_number}?text=Hi%20${encodeURIComponent(trd.full_name)},%20I%20found%20your%20service%20listing%20on%20Aaple%20Moshi.%20Need%20${encodeURIComponent(trd.trade_category)}%20help.`}
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{ backgroundColor: '#25d366', color: 'white', justifyContent: 'center', fontSize: '0.8rem', textDecoration: 'none' }}
              >
                <MessageCircle size={14} /> WhatsApp
              </a>

              <a
                href={`tel:${trd.phone}`}
                className="btn btn-primary"
                style={{ justifyContent: 'center', fontSize: '0.8rem', textDecoration: 'none' }}
              >
                <Phone size={14} /> Call Tradesman
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
