import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { BookOpen, Search, Phone, Star, Tag, Sparkles, GraduationCap, Award, Filter, MapPin, Clock } from 'lucide-react';

export default function Directory() {
  const { directoryData } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBoard, setActiveBoard] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Schools', 'Hospitals', 'Doctors', 'Electricians', 'Plumbers', 'Banks', 'Government Offices'];
  const schoolBoards = ['All', 'CBSE', 'State Board - English', 'Marathi Medium', 'Semi-English'];
  
  const boardColors = {
    'CBSE': { bg: '#dbeafe', color: '#1d4ed8' },
    'State Board': { bg: '#dcfce7', color: '#166534' },
    'CBSE (KV)': { bg: '#ede9fe', color: '#6d28d9' }
  };
  const mediumColors = {
    'English': { bg: '#f0f9ff', color: '#0369a1' },
    'Marathi': { bg: '#fef9c3', color: '#854d0e' },
    'Semi-English': { bg: '#fdf4ff', color: '#7e22ce' },
    'Marathi + Semi-English': { bg: '#fff7ed', color: '#9a3412' }
  };

  const sponsored = [
    { id: 's1', name: 'ANKTECHSOL IT SOLUTIONS', category: 'IT Services', rating: 5, address: 'Moshi', timing: '9 AM - 6 PM', phone: '1234567890' },
    { id: 's2', name: 'Spine City Electronics', category: 'Electronics', rating: 4.8, address: 'Spine Road', timing: '10 AM - 9 PM', phone: '0987654321' },
    { id: 's3', name: 'Moshi Diagnostic', category: 'Hospitals', rating: 4.7, address: 'Moshi Chowk', timing: '24/7', phone: '1112223333' }
  ];

  let filtered = [];
  if (directoryData) {
    filtered = directoryData.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.address?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.board?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.medium?.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchBoard = true;
      if (activeCategory === 'Schools' && activeBoard !== 'All') {
        if (activeBoard.includes('State Board')) matchBoard = item.board === 'State Board' && item.medium === 'English';
        else if (activeBoard.includes('Marathi')) matchBoard = item.medium?.includes('Marathi');
        else if (activeBoard.includes('Semi')) matchBoard = item.medium?.includes('Semi');
        else matchBoard = item.board === activeBoard;
      }
      return matchCat && matchSearch && matchBoard;
    });
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Local Directory</h1>
      
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ whiteSpace: 'nowrap', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <Search style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} size={20} />
        <input 
          type="text" 
          placeholder="Search by name, location, board, medium..." 
          className="form-input" 
          style={{ paddingLeft: '2.5rem' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {activeCategory === 'Schools' && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}><Filter size={16} style={{ marginRight: '4px' }}/> Filter: </span>
          {schoolBoards.map(board => (
            <span 
              key={board} 
              className="badge"
              style={{ 
                cursor: 'pointer', 
                backgroundColor: activeBoard === board ? 'var(--primary)' : 'var(--bg-main)',
                color: activeBoard === board ? 'white' : 'var(--text-main)',
                border: '1px solid var(--border)',
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem'
              }}
              onClick={() => setActiveBoard(board)}
            >
              {board}
            </span>
          ))}
        </div>
      )}

      {/* Sponsored section */}
      {(activeCategory === 'All' && !searchQuery) && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="var(--accent)"/> Premium Listings
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {sponsored.map(sp => (
              <div key={sp.id} className="card" style={{ border: '1px solid #fbbf24', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#fbbf24', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderBottomLeftRadius: 'var(--radius-sm)', borderTopRightRadius: 'calc(var(--radius-md) - 1px)' }}>SPONSORED</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{sp.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <span className="badge badge-assigned">{sp.category}</span>
                  <span style={{ display: 'flex', alignItems: 'center', color: '#fbbf24' }}><Star size={14} fill="currentColor"/> {sp.rating}</span>
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}><MapPin size={14}/> {sp.address}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14}/> {sp.timing}</div>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}><Phone size={16}/> Call {sp.phone}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Directory Listings */}
      <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Listings ({filtered.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {filtered.map(item => {
          if (item.category === 'Schools') {
            const bColor = boardColors[item.board] || { bg: '#e2e8f0', color: '#1e293b' };
            const mColor = mediumColors[item.medium] || { bg: '#e2e8f0', color: '#1e293b' };
            return (
              <div key={item.id} className="card" style={{ borderLeft: `4px solid ${bColor.color}` }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>{item.name}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <span className="badge" style={{ backgroundColor: bColor.bg, color: bColor.color }}>{item.board}</span>
                  <span className="badge" style={{ backgroundColor: mColor.bg, color: mColor.color }}>{item.medium}</span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><GraduationCap size={14}/> {item.grades || 'LKG - 10th'}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14}/> {item.address}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14}/> {item.timing || '8:00 AM - 3:00 PM'}</div>
                </div>
                <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}><Phone size={16}/> Contact</button>
              </div>
            );
          }
          return (
            <div key={item.id} className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{item.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-medium">{item.category}</span>
                {item.rating && <span style={{ display: 'flex', alignItems: 'center', color: '#fbbf24' }}><Star size={14} fill="currentColor"/> {item.rating}</span>}
              </div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}><MapPin size={14}/> {item.address}</div>
                {item.timing && <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14}/> {item.timing}</div>}
              </div>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}><Phone size={16}/> Contact</button>
            </div>
          );
        })}
        {filtered.length === 0 && <p>No listings found.</p>}
      </div>
    </div>
  );
}
