import React, { useContext, useState } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import { Newspaper } from 'lucide-react';

const News = () => {
  const { news } = useContext(AppContext);
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(news.map(n => n.category))];
  const filtered = filter === 'All' ? news : news.filter(n => n.category === filter);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Newspaper size={24} color="var(--primary-light)" /> Civic News & Alerts
      </h2>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {cats.map(c => <button key={c} onClick={() => setFilter(c)} style={{ padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', cursor: 'pointer', backgroundColor: filter===c ? 'var(--primary)' : 'var(--bg-card)', color: filter===c ? 'white' : 'var(--text-main)', fontWeight: '600', fontSize: '0.8rem' }}>{c}</button>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(item => (
          <div key={item.id} className="card" style={{ borderLeft: '4px solid ' + (item.important ? 'var(--danger)' : 'var(--primary-light)') }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: item.important ? 'var(--danger)' : 'var(--primary-light)' }}>{item.category}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(item.date).toLocaleDateString()}</span>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{item.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{item.content}</p>
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-light)' }}>Source: {item.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
