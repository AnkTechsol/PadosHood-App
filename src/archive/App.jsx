import React, { useContext, useState } from 'react';
import { AppContext } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import LiveMap from './pages/LiveMap';
import News from './pages/News';
import Events from './pages/Events';
import Directory from './pages/Directory';
import Emergency from './pages/Emergency';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import Opportunities from './pages/Opportunities';
import Transport from './pages/Transport';
import AiAssistant from './pages/AiAssistant';

function AppContent() {
  const { currentUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
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
