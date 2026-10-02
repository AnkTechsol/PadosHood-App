import React from 'react';

const SchoolCard = ({ school }) => {
  let borderColor = '#ccc';
  let badgeBg = '#f0f0f0';
  
  if (school.board.includes('CBSE') && school.name.includes('KV')) {
    borderColor = '#6d28d9';
    badgeBg = '#ede9fe';
  } else if (school.board.includes('CBSE')) {
    borderColor = '#1d4ed8';
    badgeBg = '#dbeafe';
  } else if (school.board.includes('State Board')) {
    borderColor = '#166534';
    badgeBg = '#dcfce7';
  }

  return (
    <div className="card" style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${borderColor}`, boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{ backgroundColor: badgeBg, padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{school.board}</span>
        <span style={{ backgroundColor: '#f3f4f6', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{school.medium}</span>
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{school.name}</h3>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>⭐ {school.rating}</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>📚 {school.grades}</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>⏰ {school.timing}</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>📍 {school.address}</p>
      <p style={{ margin: '0.2rem 0', fontSize: '0.9rem' }}>📞 {school.phone}</p>
      <button style={{ marginTop: '0.5rem', width: '100%', padding: '0.5rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Call School
      </button>
    </div>
  );
};

export default SchoolCard;
