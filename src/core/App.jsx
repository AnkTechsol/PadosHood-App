import React, { useContext, useState } from 'react';
import { AppContext } from '../shared/context/AppContext';
import Sidebar from './components/Sidebar';

// ── Decoupled Feature Page Imports ─────────────────────────────────────────────
import Login from '../features/auth/index';
import Dashboard from '../features/dashboard/index';
import SearchPage from '../features/search/index';
import Complaints from '../features/complaints/index';
import LiveMap from '../features/map/index';
import News from '../features/news/index';
import Events from '../features/events/index';
import Directory from '../features/directory/index';
import Emergency from '../features/emergency/index';
import Transport from '../features/transport/index';
import Opportunities from '../features/opportunities/index';
import Marketplace from '../features/marketplace/index';
import AiAssistant from '../features/ai-assistant/index';
import RealEstate from '../features/realestate/index';

function AppContent() {
  const { currentUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'search': return <SearchPage setActiveTab={setActiveTab} />;
      case 'complaints': return <Complaints />;
      case 'map': return <LiveMap />;
      case 'news': return <News />;
      case 'events': return <Events />;
      case 'directory': return <Directory />;
      case 'emergency': return <Emergency />;
      case 'profile': return <Login />;
      case 'marketplace': return <Marketplace />;
      case 'opportunities': return <Opportunities />;
      case 'transport': return <Transport />;
      case 'ai-assistant': return <AiAssistant />;
      case 'realestate': return <RealEstate />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  if (!currentUser) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)' }}>
        <Login />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <button
          onClick={() => setSidebarOpen(true)}
          className="mobile-menu-btn"
          style={{ display: 'none', marginBottom: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          ☰ Menu
        </button>
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
