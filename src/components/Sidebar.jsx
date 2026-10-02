import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useSociety } from '../context/SocietyContext';
import {
  LayoutDashboard,
  ShieldAlert,
  ShoppingBag,
  Wrench,
  Heart,
  Landmark,
  MessageSquare,
  Home,
  Briefcase,
  Bus,
  Sparkles,
  User,
  LogOut,
  Star,
  LogIn,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const { currentUser, logoutUser, t } = useContext(AppContext);
  const { currentUser: societyUser, pendingApprovals } = useSociety();

  const handleNav = (id) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  const mainModules = [
    { id: 'dashboard', label: t('appName') + ' Dashboard', icon: LayoutDashboard },
    { id: 'emergency', label: t('emergencySOS'), icon: ShieldAlert },
    { id: 'marketplace', label: t('localShops'), icon: ShoppingBag },
    { id: 'services', label: t('servicesDirectory'), icon: Wrench },
    { id: 'ward', label: t('wardUpdates'), icon: Landmark },
    { id: 'forum', label: t('communityForum'), icon: MessageSquare }
  ];

  const superAppModules = [
    { id: 'realestate', label: t('realEstate'), icon: Home },
    { id: 'ai-assistant', label: t('aiAssistant'), icon: Sparkles },
    { id: 'transport', label: t('trafficBus'), icon: Bus },
    { id: 'opportunities', label: t('jobsBoard'), icon: Briefcase }
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
        />
      )}

      <aside className="desktop-sidebar" style={{
        width: '260px',
        backgroundColor: 'var(--bg-card)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem 1rem',
        position: 'sticky',
        top: '60px',
        height: 'calc(100vh - 60px)',
        overflowY: 'auto',
        zIndex: 50,
        transition: 'transform 0.3s'
      }}>
        {/* User / Guest Status Box */}
        <div style={{
          backgroundColor: 'var(--bg-main)',
          padding: '0.85rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.25rem',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-main)' }}>
            {currentUser.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {currentUser.isGuest ? t('guestMode') : currentUser.role} · {currentUser.pcmcWard}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.3rem' }}>
            <Star size={13} fill="var(--accent)" color="var(--accent)" />
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)' }}>
              {currentUser.points || 15} pts
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem', paddingLeft: '0.5rem' }}>
            Core Modules
          </div>
          {mainModules.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === id ? 'var(--primary)' : 'transparent',
                color: activeTab === id ? 'white' : 'var(--text-main)',
                fontWeight: activeTab === id ? '700' : '500',
                fontSize: '0.84rem',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s'
              }}
            >
              <Icon size={16} /> {label}
            </button>
          ))}

          <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.25rem', marginBottom: '0.4rem', paddingLeft: '0.5rem' }}>
            Super App Features
          </div>
          {superAppModules.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === id ? 'var(--primary)' : 'transparent',
                color: activeTab === id ? 'white' : 'var(--text-main)',
                fontWeight: activeTab === id ? '700' : '500',
                fontSize: '0.84rem',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s'
              }}
            >
              <Icon size={16} /> {label}
            </button>
          ))}

          {/* Admin / SaaS Navigation */}
          {(societyUser?.role === 'Admin' || societyUser?.role === 'SuperAdmin') && (
            <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.25rem', marginBottom: '0.4rem', paddingLeft: '0.5rem' }}>
              Management
            </div>
          )}

          {societyUser?.role === 'Admin' && (
            <button
              onClick={() => handleNav('approvals')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
                backgroundColor: activeTab === 'approvals' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'approvals' ? 'white' : 'var(--text-main)',
                fontWeight: activeTab === 'approvals' ? '700' : '500', fontSize: '0.84rem', textAlign: 'left', width: '100%', transition: 'all 0.15s'
              }}
            >
              <div style={{ position: 'relative' }}>
                <ShieldCheck size={16} />
                {pendingApprovals.length > 0 && (
                  <span style={{ position: 'absolute', top: '-5px', right: '-8px', backgroundColor: 'var(--danger)', color: 'white', fontSize: '0.6rem', padding: '0.1rem 0.3rem', borderRadius: '99px', fontWeight: 'bold' }}>
                    {pendingApprovals.length}
                  </span>
                )}
              </div>
              Resident Approvals
            </button>
          )}

          {societyUser?.role === 'SuperAdmin' && (
            <button
              onClick={() => handleNav('superadmin')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
                backgroundColor: activeTab === 'superadmin' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'superadmin' ? 'white' : 'var(--text-main)',
                fontWeight: activeTab === 'superadmin' ? '700' : '500', fontSize: '0.84rem', textAlign: 'left', width: '100%', transition: 'all 0.15s'
              }}
            >
              <Building2 size={16} />
              SaaS Control Center
            </button>
          )}
        </nav>

        {/* Footer Actions */}
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '0.85rem' }}>
          <button
            onClick={() => handleNav('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: 'var(--text-main)',
              fontSize: '0.84rem',
              width: '100%'
            }}
          >
            <User size={16} /> {t('profile')}
          </button>

          {!currentUser.isGuest && (
            <button
              onClick={logoutUser}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                color: 'var(--danger)',
                fontSize: '0.84rem',
                width: '100%'
              }}
            >
              <LogOut size={16} /> Switch to Guest Mode
            </button>
          )}

          <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.65rem', color: 'var(--text-light)' }}>
            Moshi PCMC Citizen App v2.0
          </div>
        </div>
      </aside>
    </>
  );
}
