import React from 'react';

const ChatBubble = ({ message, isUser }) => {
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{ 
        maxWidth: '80%', 
        padding: '1rem', 
        borderRadius: '1.2rem',
        borderBottomRightRadius: isUser ? '0.2rem' : '1.2rem',
        borderBottomLeftRadius: isUser ? '1.2rem' : '0.2rem',
        backgroundColor: isUser ? 'var(--primary)' : 'var(--bg-card)',
        color: isUser ? 'white' : 'var(--text-main)',
        boxShadow: 'var(--shadow-sm)',
        lineHeight: '1.4'
      }}>
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;
