import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { MapPin, Globe, User, LogIn, Check, Sparkles, ChevronDown } from 'lucide-react';

export default function Header({ onOpenProfileModal }) {
  const { currentUser, language, setLanguage, t, updateUserProfile, pcmcWardSchedules } = useContext(AppContext);
  const [showWardDropdown, setShowWardDropdown] = useState(false);

  const wardOptions = Object.keys(pcmcWardSchedules || {});

  const handleSelectWard = (ward) => {
    updateUserProfile({ pcmcWard: ward });
    setShowWardDropdown(false);
  };

  return (
    <header style={{
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      padding: '0.75rem 1.25rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      flexWrap: 'wrap',
      gap: '0.75rem'
    }}>
      {/* Brand & Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
            color: 'white',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontWeight: '900',
            fontSize: '1.2rem',
            boxShadow: '0 2px 4px rgba(30,64,175,0.3)'
          }}>
            M
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', lineHeight: 1.1, margin: 0 }}>
              {t('appName')}
            </h1>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              {t('tagline')}
            </span>
          </div>
        </div>

        {/* Location & Ward Selector Badge */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowWardDropdown(!showWardDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#eff6ff',
              color: 'var(--primary)',
              border: '1px solid #bfdbfe',
              padding: '0.35rem 0.75rem',
              borderRadius: '99px',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            <MapPin size={14} color="var(--primary)" />
            <span>{currentUser.pcmcWard || 'Moshi, PCMC'}</span>
            <ChevronDown size={12} />
          </button>

          {showWardDropdown && (
            <div style={{
              position: 'absolute',
              top: '120%',
              left: 0,
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '0.5rem',
              width: '260px',
              zIndex: 200
            }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', padding: '0.4rem 0.6rem', textTransform: 'uppercase' }}>
                {t('selectWard')}
              </div>
              {wardOptions.map(ward => (
                <button
                  key={ward}
                  onClick={() => handleSelectWard(ward)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    width: '100%',
                    padding: '0.5rem 0.6rem',
                    textAlign: 'left',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: currentUser.pcmcWard === ward ? '#dbeafe' : 'transparent',
                    color: currentUser.pcmcWard === ward ? 'var(--primary)' : 'var(--text-main)',
                    fontSize: '0.82rem',
                    fontWeight: currentUser.pcmcWard === ward ? '700' : '500',
                    cursor: 'pointer',
                    marginBottom: '0.2rem'
                  }}
                >
                  <span>{ward}</span>
                  {currentUser.pcmcWard === ward && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Language & Profile/Guest Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#fef3c7',
            color: '#b45309',
            border: '1px solid #fcd34d',
            padding: '0.35rem 0.75rem',
            borderRadius: '99px',
            fontSize: '0.8rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <Globe size={14} />
          <span>{language === 'en' ? 'मराठी' : 'English'}</span>
        </button>

        {/* User / Guest Profile Badge */}
        {currentUser.isGuest ? (
          <button
            onClick={onOpenProfileModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#f1f5f9',
              color: 'var(--text-main)',
              border: '1px solid var(--border)',
              padding: '0.35rem 0.75rem',
              borderRadius: '99px',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <LogIn size={14} color="var(--primary)" />
            <span>{t('guestMode')}</span>
          </button>
        ) : (
          <button
            onClick={onOpenProfileModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#dcfce7',
              color: '#166534',
              border: '1px solid #86efac',
              padding: '0.35rem 0.75rem',
              borderRadius: '99px',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            <User size={14} />
            <span>{currentUser.name}</span>
          </button>
        )}
      </div>
    </header>
  );
}
