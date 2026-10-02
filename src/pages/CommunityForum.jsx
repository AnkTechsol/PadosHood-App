import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import NoticeCard from '../components/communication/NoticeCard';
import ForumPost from '../components/communication/ForumPost';
import { PlusCircle, FileText, X } from 'lucide-react';

export default function CommunityForum() {
  const { currentUser, notices, forumPosts, addNotice, addForumPost } = useSociety();
  const [activeTab, setActiveTab] = useState('Notices'); // 'Notices' | 'Forum'

  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', priority: 'General', attachments: '' });

  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', tags: [] });
  const [tagInput, setTagInput] = useState('');

  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    addNotice(newNotice);
    setShowNoticeModal(false);
    setNewNotice({ title: '', content: '', priority: 'General', attachments: '' });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    addForumPost({ ...newPost, tags: newPost.tags.length > 0 ? newPost.tags : ['General'] });
    setShowPostModal(false);
    setNewPost({ content: '', tags: [] });
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      setNewPost({ ...newPost, tags: [...newPost.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
            Society Communication
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
            Stay updated with notices and community discussions
          </p>
        </div>
        
        {currentUser.role === 'Admin' && activeTab === 'Notices' && (
          <button className="btn btn-primary" onClick={() => setShowNoticeModal(true)}>
            <PlusCircle size={18} /> New Notice
          </button>
        )}
        {activeTab === 'Forum' && (
          <button className="btn btn-primary" onClick={() => setShowPostModal(true)}>
            <PlusCircle size={18} /> New Post
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <button
          style={{
            background: 'none', border: 'none', padding: '0.5rem 1rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
            borderBottom: activeTab === 'Notices' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'Notices' ? 'var(--primary)' : 'var(--text-muted)'
          }}
          onClick={() => setActiveTab('Notices')}
        >
          Notice Board
        </button>
        <button
          style={{
            background: 'none', border: 'none', padding: '0.5rem 1rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
            borderBottom: activeTab === 'Forum' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'Forum' ? 'var(--primary)' : 'var(--text-muted)'
          }}
          onClick={() => setActiveTab('Forum')}
        >
          Community Forum
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'Notices' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {notices.map(notice => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
            {notices.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>No notices available.</p>}
          </div>
        )}

        {activeTab === 'Forum' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {forumPosts.map(post => (
              <ForumPost key={post.id} post={post} />
            ))}
            {forumPosts.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>No forum posts yet.</p>}
          </div>
        )}
      </div>

      {/* Admin New Notice Modal */}
      {showNoticeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card glass-panel" style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>Create Official Notice</h3>
              <button onClick={() => setShowNoticeModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleNoticeSubmit}>
              <div className="form-group">
                <label className="form-label">Notice Title</label>
                <input type="text" className="form-input" value={newNotice.title} onChange={e => setNewNotice({ ...newNotice, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="form-select" value={newNotice.priority} onChange={e => setNewNotice({ ...newNotice, priority: e.target.value })}>
                  <option value="General">General</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Notice Content</label>
                <textarea className="form-textarea" value={newNotice.content} onChange={e => setNewNotice({ ...newNotice, content: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Attachment (Optional filename)</label>
                <input type="text" className="form-input" value={newNotice.attachments} onChange={e => setNewNotice({ ...newNotice, attachments: e.target.value })} placeholder="e.g. document.pdf" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Publish Notice</button>
            </form>
          </div>
        </div>
      )}

      {/* Resident New Forum Post Modal */}
      {showPostModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card glass-panel" style={{ width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>Create Forum Post</h3>
              <button onClick={() => setShowPostModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handlePostSubmit}>
              <div className="form-group">
                <label className="form-label">What's on your mind?</label>
                <textarea className="form-textarea" value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} required placeholder="Share something with the community..." />
              </div>
              <div className="form-group">
                <label className="form-label">Tags (Press Enter to add)</label>
                <input type="text" className="form-input" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag} placeholder="e.g. Events, LostAndFound" />
                <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {newPost.tags.map(t => (
                    <span key={t} className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'white' }}>{t} <X size={10} style={{ cursor: 'pointer', marginLeft: '2px' }} onClick={() => setNewPost({...newPost, tags: newPost.tags.filter(tag => tag !== t)})} /></span>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>Post to Forum</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
