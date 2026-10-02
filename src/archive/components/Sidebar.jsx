import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { LayoutDashboard, AlertCircle, MapPin, Newspaper, Calendar, BookOpen, Phone, User, ShoppingBag, Briefcase, Bus, Sparkles, LogOut, Star } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'complaints', label: 'File Complaint', icon: AlertCircle },
  { id: 'map', label: 'Complaint Map', icon: MapPin },
  { id: 'news', label: 'News & Alerts', icon: Newspaper },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'directory', label: 'Directory', icon: BookOpen },
  { id: 'emergency', label: 'Emergency', icon: Phone },
];

const superAppItems = [
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
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary-dark)' }}>🏛️ Aaple Moshi</h1>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Citizen Digital Platform</p>
        </div>

        {currentUser && (
          <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-main)' }}>{currentUser.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser.role} · Ward {currentUser.ward || 'B'}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
              <Star size={12} fill="var(--accent)" color="var(--accent)" />
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)' }}>{currentUser.points || 0} pts</span>
            </div>
          </div>
        )}

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Civic Services</div>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => handleNav(id)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', backgroundColor: activeTab === id ? 'var(--primary)' : 'transparent', color: activeTab === id ? 'white' : 'var(--text-main)', fontWeight: activeTab === id ? '700' : '500', fontSize: '0.85rem', textAlign: 'left', width: '100%', transition: 'all 0.15s' }}>
              <Icon size={16} /> {label}
            </button>
          ))}

          <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1rem', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Super App</div>
          {superAppItems.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => handleNav(id)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', backgroundColor: activeTab === id ? 'var(--primary)' : 'transparent', color: activeTab === id ? 'white' : 'var(--text-main)', fontWeight: activeTab === id ? '700' : '500', fontSize: '0.85rem', textAlign: 'left', width: '100%', transition: 'all 0.15s' }}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <button onClick={() => handleNav('profile')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: 'var(--text-main)', fontSize: '0.85rem', width: '100%' }}>
            <User size={16} /> My Profile
          </button>
          <button onClick={logoutUser} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: 'var(--danger)', fontSize: '0.85rem', width: '100%' }}>
            <LogOut size={16} /> Logout
          </button>
          <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.65rem', color: 'var(--text-light)' }}>
            Free courtesy of <a href="https://anktechsol.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-light)', fontWeight: '700' }}>anktechsol.com</a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
