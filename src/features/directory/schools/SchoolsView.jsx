import React, { useState } from 'react';
import { Award, GraduationCap, Clock, MapPin, Phone, Star, Filter } from 'lucide-react';

const boardColors = {
  'CBSE': { bg: '#dbeafe', color: '#1d4ed8', label: 'CBSE' },
  'CBSE (KV)': { bg: '#ede9fe', color: '#6d28d9', label: 'CBSE · KV' },
  'State Board': { bg: '#dcfce7', color: '#166534', label: 'State Board' },
};

const mediumColors = {
  'English': { bg: '#f0f9ff', color: '#0369a1' },
  'Marathi': { bg: '#fef9c3', color: '#854d0e' },
  'Semi-English': { bg: '#fdf4ff', color: '#7e22ce' },
  'Marathi + Semi-English': { bg: '#fff7ed', color: '#9a3412' },
};

const SchoolsView = ({ schools, searchQuery }) => {
  const [boardFilter, setBoardFilter] = useState('All');
  const boardFilters = ['All', 'CBSE', 'State Board – English', 'Marathi Medium', 'Semi-English'];

  const filtered = schools.filter(s => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !s.address.toLowerCase().includes(q) && !(s.board||'').toLowerCase().includes(q) && !(s.medium||'').toLowerCase().includes(q)) return false;
    }
    if (boardFilter === 'All') return true;
    if (boardFilter === 'CBSE') return s.board === 'CBSE' || s.board === 'CBSE (KV)';
    if (boardFilter === 'State Board – English') return s.board === 'State Board' && s.medium === 'English';
    if (boardFilter === 'Marathi Medium') return s.medium === 'Marathi' || s.medium === 'Marathi + Semi-English';
    if (boardFilter === 'Semi-English') return s.medium === 'Semi-English' || s.medium === 'Marathi + Semi-English';
    return true;
  });

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Filter size={14} /> Filter Board / Medium:
        </span>
        {boardFilters.map(bf => (
          <button key={bf} onClick={() => setBoardFilter(bf)} style={{ padding: '0.3rem 0.85rem', fontSize: '0.78rem', fontWeight: '700', borderRadius: '99px', border: boardFilter === bf ? '2px solid var(--primary)' : '1px solid var(--border)', cursor: 'pointer', backgroundColor: boardFilter === bf ? 'var(--primary)' : 'white', color: boardFilter === bf ? 'white' : 'var(--text-main)' }}>
            {bf}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          {filtered.length} school{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(s => {
          const bStyle = boardColors[s.board] || { bg: '#f1f5f9', color: '#475569', label: s.board };
          const mStyle = mediumColors[s.medium] || { bg: '#f8fafc', color: '#64748b' };
          return (
            <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', borderLeft: `4px solid ${bStyle.color}` }}>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: bStyle.bg, color: bStyle.color, fontSize: '0.65rem', fontWeight: '800', padding: '0.2rem 0.55rem', borderRadius: '99px' }}>
                  <Award size={10} style={{ display: 'inline', marginRight: '0.2rem' }} /> {bStyle.label}
                </span>
                <span style={{ backgroundColor: mStyle.bg, color: mStyle.color, fontSize: '0.65rem', fontWeight: '700', padding: '0.2rem 0.55rem', borderRadius: '99px' }}>
                  {s.medium} Medium
                </span>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-dark)', margin: '0 0 0.2rem 0' }}>{s.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={13} fill="var(--accent)" color="var(--accent)" />
                  <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{s.rating}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-main)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)' }}>
                <div><GraduationCap size={12} style={{ display: 'inline', marginRight: '0.3rem' }} /><strong>Grades:</strong> {s.grades}</div>
                <div><Clock size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />{s.timing}</div>
                <div><MapPin size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />{s.address}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.65rem', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-light)' }}>{s.phone}</span>
                <button onClick={() => alert(`Calling: ${s.phone}`)} className="btn btn-secondary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Phone size={11} /> Call School
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SchoolsView;
