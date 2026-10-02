import React from 'react';
import { ThumbsUp, MessageSquare, Tag } from 'lucide-react';
import { useSociety } from '../../context/SocietyContext';

export default function ForumPost({ post }) {
  const { currentUser } = useSociety();
  const isLiked = post.likes.includes(currentUser.id);

  return (
    <div className="card hover-elevate" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
            {post.author.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary-dark)' }}>{post.author.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(post.date).toLocaleString()}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {post.tags.map(tag => (
            <span key={tag} className="badge" style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.5' }}>
        {post.content}
      </p>

      <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
        <button className="btn" style={{ background: 'none', padding: 0, color: isLiked ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.85rem' }}>
          <ThumbsUp size={16} fill={isLiked ? "currentColor" : "none"} /> {post.likes.length} Likes
        </button>
        <button className="btn" style={{ background: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <MessageSquare size={16} /> {post.comments.length} Comments
        </button>
      </div>

      {post.comments.length > 0 && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
          {post.comments.map(comment => (
            <div key={comment.id} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>{comment.author}:</span>
              <span style={{ color: 'var(--text-main)' }}>{comment.content}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
