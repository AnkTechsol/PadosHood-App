import React, { useContext, useState } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import SchoolsView from './schools/SchoolsView';
import { BookOpen, Search, Phone, Star } from 'lucide-react';

const Directory = () => {
  const { directory, schools } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Schools', 'Hospitals', 'Doctors', 'Electricians', 'Plumbers', 'Banks', 'Government Offices'];

  const filteredListings = directory.filter(item => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.address.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={24} color="var(--primary-light)" /> Moshi Utility Directory
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Find schools, doctors, plumbers, banks, and government desks.</p>
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input
            type="text"
            placeholder="Search directory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.25rem', width: '260px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: '600',
              borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
              cursor: 'pointer', whiteSpace: 'nowrap',
              backgroundColor: activeCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
              color: activeCategory === cat ? 'white' : 'var(--text-main)'
            }}
          >
            {cat} {cat === 'Schools' ? `(${schools.length})` : ''}
          </button>
        ))}
      </div>

      {activeCategory === 'Schools' ? (
        <SchoolsView schools={schools} searchQuery={searchQuery} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredListings.map((listing) => (
            <div key={listing.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: listing.sponsored ? '2px solid #f59e0b' : '1px solid var(--border)' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.25rem' }}>
                  {listing.category}
                </span>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{listing.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                  <Star size={14} fill="var(--accent)" color="var(--accent)" />
                  <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{listing.rating}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>· {listing.timing}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{listing.address}</p>
              </div>

              {listing.sponsored && listing.offer && (
                <div style={{ backgroundColor: '#fef3c7', border: '1px dashed #f59e0b', borderRadius: 'var(--radius-sm)', padding: '0.5rem', marginBottom: '1rem', color: '#92400e', fontSize: '0.8rem', fontWeight: '600' }}>
                  🎁 {listing.offer}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-light)' }}>{listing.phone}</span>
                <button onClick={() => alert(`Calling: ${listing.phone}`)} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Phone size={12} /> Call
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Directory;
