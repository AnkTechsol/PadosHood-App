import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { schemes } from './schemes.constants';

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    { text: 'Namaskar! I am Moshi Civic AI. How can I help you with PCMC & Government Schemes today?', isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend) => {
    const q = textToSend || input;
    if (!q.trim()) return;
    const userMsg = { text: q, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const qLower = q.toLowerCase();
      const matched = schemes.find(s => s.keywords.some(k => qLower.includes(k)));
      let replyText = '';
      if (matched) {
        replyText = `📌 **${matched.name}** (${matched.marathi_name})\n\n` +
          `**Eligibility:**\n${matched.eligibility.map(e => '• ' + e).join('\n')}\n\n` +
          `**Documents Required:**\n${matched.documents.map(d => '• ' + d).join('\n')}`;
      } else {
        replyText = `Thank you for asking. For exact details on "${q}", please visit the PCMC Ward B office desk or use the directory in Aaple Moshi. You can also ask about housing schemes (PMAY), scholarships, or senior pensions.`;
      }
      setMessages(prev => [...prev, { text: replyText, isUser: false }]);
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: 'calc(100vh - 120px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
        <Sparkles size={24} color="var(--primary-light)" />
        <div>
          <h2 style={{ color: 'var(--primary-dark)', margin: 0, fontSize: '1.2rem' }}>AI Scheme & Civic Assistant</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Instant guidance on PCMC & State Schemes</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {['PMAY Housing', 'Scholarships', 'Senior Pension', 'Swachh Toilet Grant', 'Ration Card Link'].map(chip => (
          <button key={chip} onClick={() => handleSend(chip)} style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', borderRadius: '99px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', cursor: 'pointer' }}>
            💡 {chip}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.isUser ? 'flex-end' : 'flex-start', maxWidth: '80%', backgroundColor: m.isUser ? 'var(--primary)' : 'var(--bg-card)', color: m.isUser ? 'white' : 'var(--text-main)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', whiteSpace: 'pre-line', fontSize: '0.85rem', boxShadow: 'var(--shadow-sm)' }}>
            {m.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input className="form-input" style={{ flex: 1 }} placeholder="Ask about any scheme or procedure..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
        <button onClick={() => handleSend()} className="btn btn-primary"><Send size={16} /></button>
      </div>
    </div>
  );
};

export default AiAssistant;
