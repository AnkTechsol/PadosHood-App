import React from 'react';
import ReviewForm from './ReviewForm';

const ShopCard = ({ shop, isExpanded, onToggle, onReviewSubmit }) => {
  return (
    <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: shop.sponsored ? '2px solid gold' : '1px solid var(--border)' }}>
      {shop.sponsored && <div style={{ backgroundColor: '#fef08a', color: '#854d0e', padding: '0.2rem 0.6rem', borderRadius: '4px', display: 'inline-block', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Sponsored</div>}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>{shop.name}</h3>
          <span style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{shop.category}</span>
        </div>
        <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', fontWeight: 'bold' }}>
          ⭐ {shop.rating}
        </div>
      </div>

      <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        <div>📞 {shop.phone}</div>
        <div>⏰ {shop.timing}</div>
        <div style={{ gridColumn: '1 / -1' }}>📍 {shop.address}</div>
      </div>

      {shop.offer && (
        <div style={{ marginTop: '1rem', backgroundColor: '#fef2f2', border: '1px dashed #ef4444', padding: '0.8rem', borderRadius: 'var(--radius-sm)', color: '#b91c1c' }}>
          <strong>Special Offer:</strong> {shop.offer}
        </div>
      )}

      <button onClick={onToggle} style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', backgroundColor: '#f8fafc', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--primary)' }}>
        {isExpanded ? 'Hide Reviews' : 'Show Reviews & Add Yours'}
      </button>

      {isExpanded && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>Customer Reviews ({shop.reviews.length})</h4>
          {shop.reviews.length === 0 ? (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No reviews yet. Be the first!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {shop.reviews.map((rev, idx) => (
                <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '0.8rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <strong>{rev.name}</strong>
                    <span>⭐ {rev.rating}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
          <ReviewForm onSubmit={onReviewSubmit} />
        </div>
      )}
    </div>
  );
};

export default ShopCard;
