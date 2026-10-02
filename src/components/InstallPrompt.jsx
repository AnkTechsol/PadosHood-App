import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (!isInstallable || isInstalled) return null;

  return (
    <div className="glass-panel" style={{
      position: 'fixed',
      bottom: '5.5rem', // Just above mobile nav
      left: '1rem',
      right: '1rem',
      padding: '1rem',
      borderRadius: 'var(--radius-md)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      animation: 'slideUp 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0, fontWeight: '800', color: 'var(--primary-dark)', fontSize: '1rem' }}>
            Install Angaan App
          </h4>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Add to homescreen for a faster native experience.
          </p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={handleInstallClick}
          style={{ padding: '0.5rem 1rem' }}
        >
          <Download size={16} style={{ marginRight: '0.4rem' }}/> Install
        </button>
      </div>
      
      <div style={{ fontSize: '0.65rem', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
        Courtesy of <strong>anktechsol.com</strong>
      </div>
    </div>
  );
}
