import React, { useContext } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import { Search, LayoutDashboard, AlertCircle, MapPin, Newspaper, Calendar, BookOpen, Phone, User, ShoppingBag, Briefcase, Bus, Sparkles, LogOut, Star, Home } from 'lucide-react';

const mainNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'search', label: 'Global Search', icon: Search, badge: 'NEW' },
  { id: 'complaints', label: 'File Complaint', icon: AlertCircle },
  { id: 'map', label: 'Complaint Map', icon: MapPin },
  { id: 'news', label: 'News & Alerts', icon: Newspaper },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'directory', label: 'Directory', icon: BookOpen },
  { id: 'emergency', label: 'Emergency', icon: Phone },
];

const superAppItems = [
  { id: 'realestate', label: 'Real Estate', icon: Home },
  { id: 'ai-assistant', label: 'AI Schemes Help', icon: Sparkles },
  { id: 'transport', label: 'Traffic & Bus', icon: Bus },
  { id: 'opportunities', label: 'Jobs Board', icon: Briefcase },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
];

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const { currentUser, logoutUser } = useContext(AppContext);

  const handleNav = (id) => { setActiveTab(id); setSidebarOpen(false); };

  return (
    <>
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }} />}
      <aside style={{ width: '260px', backgroundColor: 'var(--bg-card)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', zIndex: 50, transition: 'transform 0.3s' }}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary-dark)', margin: 0 }}>🏛️ Aaple Moshi</h1>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Citizen Digital Platform</p>
        </div>

        {/* Global Search Quick Launcher */}
        <button
          onClick={() => handleNav('search')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%',
            padding: '0.5rem 0.75rem', marginBottom: '1.25rem',
            backgroundColor: activeTab === 'search' ? 'var(--primary)' : 'var(--bg-main)',
            color: activeTab === 'search' ? 'white' : 'var(--text-muted)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left'
          }}
        >
          <Search size={14} color={activeTab === 'search' ? 'white' : 'var(--primary-light)'} />
          <span style={{ flex: 1 }}>Search all Moshi...</span>
          <span style={{ backgroundColor: activeTab === 'search' ? 'rgba(255,255,255,0.3)' : '#dbeafe', color: activeTab === 'search' ? 'white' : '#1d4ed8', fontSize: '0.65rem', fontWeight: '800', padding: '0.1rem 0.4rem', borderRadius: '99px' }}>
            Ctrl+K
          </span>
        </button>

        {currentUser && (
          <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-main)' }}>{currentUser.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser.role} · Ward {currentUser.ward || 'B'}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
              <Star size={12} fill="var(--accent)" color="var(--accent)" />
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)' }}>{currentUser.points || 0} pts</span>
            </div>
          </div>
        )}

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem', paddingLeft: '0.5rem' }}>Civic Platform</div>
          {mainNav.map(({ id, label, icon: Icon, badge }) => (
            <button key={id} onClick={() => handleNav(id)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', backgroundColor: activeTab === id ? 'var(--primary)' : 'transparent', color: activeTab === id ? 'white' : 'var(--text-main)', fontWeight: activeTab === id ? '700' : '500', fontSize: '0.85rem', textAlign: 'left', width: '100%', transition: 'all 0.15s' }}>
              <Icon size={16} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && <span style={{ backgroundColor: '#f59e0b', color: 'white', fontSize: '0.6rem', fontWeight: '800', padding: '0.05rem 0.35rem', borderRadius: '99px' }}>{badge}</span>}
            </button>
          ))}

          <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1rem', marginBottom: '0.35rem', paddingLeft: '0.5rem' }}>Super App Hyperlocal</div>
          {superAppItems.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => handleNav(id)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', backgroundColor: activeTab === id ? 'var(--primary)' : 'transparent', color: activeTab === id ? 'white' : 'var(--text-main)', fontWeight: activeTab === id ? '700' : '500', fontSize: '0.85rem', textAlign: 'left', width: '100%', transition: 'all 0.15s' }}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
          <button onClick={() => handleNav('profile')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: 'var(--text-main)', fontSize: '0.85rem', width: '100%' }}>
            <User size={16} /> My Profile
          </button>
          <button onClick={logoutUser} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: 'var(--danger)', fontSize: '0.85rem', width: '100%' }}>
            <LogOut size={16} /> Logout
          </button>
          <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.65rem', color: 'var(--text-light)' }}>
            Free courtesy of <a href="https://anktechsol.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-light)', fontWeight: '700' }}>anktechsol.com</a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
