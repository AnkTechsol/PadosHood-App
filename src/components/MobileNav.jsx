import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useSociety } from '../context/SocietyContext';
import { LayoutDashboard, ShoppingBag, HeartHandshake, ShieldAlert, MessageSquare, ShieldCheck, Building2 } from 'lucide-react';

export default function MobileNav({ activeTab, setActiveTab }) {
  const { t } = useContext(AppContext);
  const { currentUser: societyUser, pendingApprovals } = useSociety();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'marketplace', label: 'Shops', icon: ShoppingBag },
    { id: 'emergency', label: 'Blood & SOS', icon: ShieldAlert, badge: 'SOS' },
    { id: 'ward', label: 'Ward', icon: HeartHandshake },
    { id: 'forum', label: 'Noticeboard', icon: MessageSquare }
  ];

  if (societyUser?.role === 'SuperAdmin') {
    navItems.push({ id: 'superadmin', label: 'SaaS', icon: Building2 });
  } else if (societyUser?.role === 'Admin') {
    navItems.push({ id: 'approvals', label: 'Approvals', icon: ShieldCheck, badge: pendingApprovals.length > 0 ? pendingApprovals.length.toString() : null });
  }

  return (
    <nav className="mobile-bottom-nav" style={{
      display: 'none', // Shown via CSS media query @media (max-width: 768px)
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--bg-card)',
      borderTop: '1px solid var(--border)',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      zIndex: 90,
      padding: '0.4rem 0.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
                border: 'none',
                backgroundColor: 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: isActive ? '700' : '500',
                fontSize: '0.7rem',
                cursor: 'pointer',
                flex: 1,
                position: 'relative',
                padding: '0.3rem 0'
              }}
            >
              <div style={{ position: 'relative' }}>
                <Icon size={20} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                {badge && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-8px',
                    backgroundColor: 'var(--danger)',
                    color: 'white',
                    fontSize: '0.55rem',
                    fontWeight: '800',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '99px'
                  }}>
                    {badge}
                  </span>
                )}
              </div>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
