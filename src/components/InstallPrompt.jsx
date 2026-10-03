import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIosDevice = 
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // Check if already installed (standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
      setShowPrompt(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'var(--bg-card, #ffffff)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      borderRadius: '12px',
      padding: '16px',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      width: 'calc(100% - 40px)',
      maxWidth: '400px',
      border: '1px solid var(--border, #eee)'
    }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: 'var(--text-main, #333)' }}>Install Angaan App</h4>
        {isIOS ? (
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted, #666)', lineHeight: '1.4' }}>
            Tap <Share size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> then "Add to Home Screen"
          </p>
        ) : (
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted, #666)' }}>
            Add to home screen for quick access
          </p>
        )}
      </div>
      
      {!isIOS && (
        <button 
          onClick={handleInstallClick}
          style={{
            backgroundColor: 'var(--primary, #294a3e)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Download size={14} /> Install
        </button>
      )}

      <button 
        onClick={handleDismiss}
        style={{
          background: 'none',
          border: 'none',
          padding: '4px',
          cursor: 'pointer',
          color: 'var(--text-muted, #666)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
