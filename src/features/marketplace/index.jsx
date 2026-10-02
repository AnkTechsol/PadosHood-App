import React, { useContext, useState } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import { ShoppingBag, Star, Tag, Phone } from 'lucide-react';

const Marketplace = () => {
  const { marketplaceShops } = useContext(AppContext);
  const [filter, setFilter] = useState('All');
  const cats = ['All', 'Grocery', 'Restaurants', 'Hardware'];
  const filtered = filter === 'All' ? marketplaceShops : marketplaceShops.filter(s => s.category === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingBag size={24} color="var(--primary-light)" /> Local Moshi Marketplace
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Support local shops, discover deals, and read verified neighbor reviews.</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {cats.map(c => <button key={c} onClick={() => setFilter(c)} className={"btn " + (filter === c ? 'btn-primary' : 'btn-secondary')} style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}>{c}</button>)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filtered.map(shop => (
          <div key={shop.id} className="card" style={{ border: shop.sponsored ? '2px solid #f59e0b' : '1px solid var(--border)' }}>
            {shop.sponsored && <span style={{ backgroundColor: '#f59e0b', color: 'white', fontSize: '0.65rem', fontWeight: '800', padding: '0.15rem 0.5rem', borderRadius: '4px', float: 'right' }}>SPONSORED</span>}
            <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.25rem' }}>{shop.category}</span>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>{shop.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
              <Star size={14} fill="var(--accent)" color="var(--accent)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{shop.rating}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>· {shop.timing}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{shop.address}</p>

            {shop.offer && (
              <div style={{ backgroundColor: '#fffbeb', border: '1px dashed #f59e0b', borderRadius: 'var(--radius-sm)', padding: '0.5rem', marginBottom: '0.75rem', fontSize: '0.8rem', color: '#b45309', fontWeight: '600' }}>
                🏷️ {shop.offer}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.65rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-light)' }}>{shop.phone}</span>
              <button onClick={() => alert()} className="btn btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Phone size={11} /> Call Shop
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
