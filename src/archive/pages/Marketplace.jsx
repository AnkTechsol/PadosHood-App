import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, Star, MapPin, Clock, Tag, MessageSquare, Send } from 'lucide-react';

export default function Marketplace() {
  const { marketplaceShops } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state for interactive shop reviews
  const [shops, setShops] = useState(marketplaceShops || []);
  const [expandedShopId, setExpandedShopId] = useState(null);
  
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });

  const categories = ['All', 'Grocery', 'Restaurants', 'Hardware', 'Medical'];

  let filteredShops = shops.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleReviewSubmit = (e, shopId) => {
    e.preventDefault();
    const newReview = { id: Date.now(), user: reviewForm.name || 'Anonymous', rating: parseInt(reviewForm.rating), comment: reviewForm.comment };
    
    setShops(prevShops => prevShops.map(shop => {
      if (shop.id === shopId) {
        const newReviews = [...(shop.reviews || []), newReview];
        const newAvg = (newReviews.reduce((acc, curr) => acc + curr.rating, 0) / newReviews.length).toFixed(1);
        return { ...shop, reviews: newReviews, rating: parseFloat(newAvg) };
      }
      return shop;
    }));
    
    setReviewForm({ name: '', rating: 5, comment: '' });
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Local Marketplace</h1>
      
      {/* Promo Banner */}
      <div style={{ backgroundColor: '#fef9c3', border: '2px dashed #eab308', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#854d0e' }}>
          <Tag size={24} />
          <div>
            <div style={{ fontWeight: '700' }}>Weekend Special: 10% OFF at Moshi Grocers</div>
            <div style={{ fontSize: '0.85rem' }}>Valid till Sunday</div>
          </div>
        </div>
        <button className="btn" style={{ backgroundColor: 'white', color: '#854d0e', border: '1px solid #eab308' }} onClick={() => navigator.clipboard.writeText('MOSHI10')}>Copy Code: MOSHI10</button>
      </div>

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
          placeholder="Search shops, services..." 
          className="form-input" 
          style={{ paddingLeft: '2.5rem' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredShops.map(shop => (
          <div key={shop.id} className="card" style={{ border: shop.sponsored ? '2px solid #fbbf24' : '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="badge badge-assigned">{shop.category}</span>
                  {shop.sponsored && <span style={{ backgroundColor: '#fbbf24', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>SPONSORED</span>}
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>{shop.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontWeight: '600', marginBottom: '0.5rem' }}>
                  <Star size={16} fill="currentColor"/> {shop.rating} <span style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: '400' }}>({shop.reviews?.length || 0} reviews)</span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={14}/> {shop.address}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14}/> {shop.timing}</div>
                </div>
              </div>
              
              <button 
                className="btn btn-secondary" 
                onClick={() => setExpandedShopId(expandedShopId === shop.id ? null : shop.id)}
              >
                <MessageSquare size={16}/> {expandedShopId === shop.id ? 'Hide Reviews' : 'Read Reviews'}
              </button>
            </div>

            {/* Reviews Section Expansion */}
            {expandedShopId === shop.id && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <h4 style={{ marginBottom: '1rem' }}>Customer Reviews</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {shop.reviews && shop.reviews.length > 0 ? shop.reviews.map(rev => (
                    <div key={rev.id} style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600' }}>{rev.user}</span>
                        <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center' }}><Star size={12} fill="currentColor"/> {rev.rating}</span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{rev.comment}</p>
                    </div>
                  )) : (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>No reviews yet. Be the first to review!</p>
                  )}
                </div>

                <form onSubmit={(e) => handleReviewSubmit(e, shop.id)} style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                  <h5 style={{ marginBottom: '0.75rem' }}>Write a Review</h5>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <div className="form-group" style={{ margin: 0, flex: 1, minWidth: '150px' }}>
                      <input type="text" className="form-input" placeholder="Your Name" value={reviewForm.name} onChange={e => setReviewForm({...reviewForm, name: e.target.value})} required />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <select className="form-select" value={reviewForm.rating} onChange={e => setReviewForm({...reviewForm, rating: e.target.value})}>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <textarea className="form-textarea" placeholder="Share your experience..." style={{ minHeight: '60px' }} value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary"><Send size={16}/> Submit Review</button>
                </form>
              </div>
            )}
          </div>
        ))}
        {filteredShops.length === 0 && <p>No shops found.</p>}
      </div>
    </div>
  );
}
