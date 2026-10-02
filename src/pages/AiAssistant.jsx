import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Globe, AlertCircle } from 'lucide-react';

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaskar! I am your Aaple Moshi AI assistant. How can I help you today? I can provide information on government schemes, PCMC services, or help you draft a complaint.", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('English');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQueries = [
    "PMAY Housing Scheme",
    "Student Scholarship",
    "Senior Pension Scheme",
    "Swachh Bharat Toilet Grant",
    "Aadhaar & Ration Card Help"
  ];

  const generateAiResponse = (userMsg) => {
    const lowerMsg = userMsg.toLowerCase();
    
    // Check for complaint triggers
    if (['garbage', 'road', 'water', 'light', 'drain', 'pothole'].some(word => lowerMsg.includes(word))) {
      return `It sounds like you're facing a civic issue regarding ${lowerMsg.match(/(garbage|road|water|light|drain|pothole)/)[0]}. Would you like me to draft a complaint for the PCMC portal? You can go to the Complaints tab to submit it officially.`;
    }

    if (lowerMsg.includes('pmay') || lowerMsg.includes('housing')) {
      return `**Pradhan Mantri Awas Yojana (PMAY)**\nEligibility: Family income under ₹3 Lakh (EWS) or ₹6 Lakh (LIG). Must not own a pucca house anywhere in India.\nDocuments needed:\n- Aadhaar Card\n- PAN Card\n- Income Certificate\n- Bank Passbook\nApply online at pmaymis.gov.in or visit the Moshi PCMC ward office.`;
    }

    if (lowerMsg.includes('scholarship') || lowerMsg.includes('student')) {
      return `**MahaDBT Student Scholarships**\nThere are various schemes for Post-Matric students based on category (SC/ST/OBC/EBC). \nDocuments needed:\n- Aadhaar linked to Bank\n- Domicile Certificate\n- Caste Certificate (if applicable)\n- Income Certificate\nApplications usually open in July-August on the MahaDBT portal.`;
    }

    return "I can help you find information on Maharashtra and Central Govt schemes. Could you provide a bit more detail about what you are looking for? (e.g., housing, education, pension, agriculture)";
  };

  const handleSend = (e, explicitText = null) => {
    if (e) e.preventDefault();
    const textToSend = explicitText || input;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsgObj = { id: Date.now(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsgObj]);
    setInput('');

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponseText = generateAiResponse(textToSend);
      const aiMsgObj = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
      setMessages(prev => [...prev, aiMsgObj]);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', animation: 'fadeIn 0.3s ease-in-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={24} color="var(--primary)"/> AI Scheme Assistant
        </h1>
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', padding: '0.25rem' }}>
          {['English', 'Marathi', 'Hindi'].map(lang => (
            <button 
              key={lang}
              style={{
                padding: '0.3rem 0.8rem',
                border: 'none',
                backgroundColor: activeLanguage === lang ? 'white' : 'transparent',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: activeLanguage === lang ? '600' : '400',
                cursor: 'pointer',
                boxShadow: activeLanguage === lang ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
              onClick={() => setActiveLanguage(lang)}
            >
              {activeLanguage === lang && <Globe size={12}/>} {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Queries */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {quickQueries.map(q => (
          <button 
            key={q} 
            className="badge" 
            style={{ backgroundColor: '#e0e7ff', color: '#4338ca', cursor: 'pointer', border: '1px solid #c7d2fe', padding: '0.4rem 0.8rem', whiteSpace: 'nowrap' }}
            onClick={() => handleSend(null, q)}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#f8fafc' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ 
                maxWidth: '75%', 
                padding: '1rem', 
                borderRadius: 'var(--radius-md)', 
                backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'white',
                color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                boxShadow: 'var(--shadow-sm)',
                border: msg.sender === 'ai' ? '1px solid var(--border)' : 'none',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', backgroundColor: 'white' }}>
          <form onSubmit={(e) => handleSend(e)} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder={`Ask about schemes, documents, or report issues (in ${activeLanguage})...`}
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
              <Send size={18}/>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
