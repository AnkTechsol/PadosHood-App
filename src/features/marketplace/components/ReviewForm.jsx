import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', rating: 5, comment: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
      <h5 style={{ margin: '0 0 1rem 0' }}>Write a Review</h5>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input 
          type="text" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})}
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
          required
        />
        <select 
          value={formData.rating} 
          onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
        >
          {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
        </select>
      </div>
      <textarea 
        placeholder="Share your experience..." 
        value={formData.comment} 
        onChange={e => setFormData({...formData, comment: e.target.value})}
        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)', marginBottom: '1rem', minHeight: '60px' }}
        required
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
