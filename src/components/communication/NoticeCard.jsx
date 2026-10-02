import React from 'react';
import { useSociety } from '../../context/SocietyContext';
import { AlertCircle, CheckCircle, FileText } from 'lucide-react';

export default function NoticeCard({ notice }) {
  const { currentUser, markNoticeRead } = useSociety();
  const isUrgent = notice.priority === 'Urgent';
  const hasRead = notice.readBy.includes(currentUser.id);

  return (
    <div className={`card hover-elevate ${isUrgent ? 'notice-urgent' : 'notice-general'}`} style={{
      borderLeft: isUrgent ? '4px solid var(--danger)' : '4px solid var(--primary)',
      marginBottom: '1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {isUrgent && (
        <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'var(--danger)', color: 'white', padding: '0.2rem 1rem', fontSize: '0.75rem', fontWeight: 'bold', borderBottomLeftRadius: '8px' }}>
          URGENT
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: isUrgent ? 'var(--danger)' : 'var(--primary-dark)', margin: 0, paddingRight: '4rem' }}>
          {isUrgent && <AlertCircle size={16} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'text-bottom' }}/>}
          {notice.title}
        </h3>
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        {new Date(notice.date).toLocaleDateString()} at {new Date(notice.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
        {notice.content}
      </p>
      
      {notice.attachments && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', backgroundColor: 'var(--bg-main)', borderRadius: '4px', marginBottom: '1rem', border: '1px solid var(--border)' }}>
          <FileText size={16} color="var(--primary)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>{notice.attachments}</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!hasRead ? (
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }} onClick={() => markNoticeRead(notice.id)}>
            Mark as Read
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--success)', fontSize: '0.8rem', fontWeight: '600' }}>
            <CheckCircle size={14} /> Read
          </div>
        )}
      </div>
    </div>
  );
}
