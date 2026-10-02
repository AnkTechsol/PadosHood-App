import React, { useContext, useState } from 'react';
import { AppContext } from './context/AppContext';
import { useSociety } from './context/SocietyContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import ProgressiveProfileModal from './components/ProgressiveProfileModal';
import InstallPrompt from './components/InstallPrompt';

import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import Directory from './pages/Directory';
import Emergency from './pages/Emergency';
import Marketplace from './pages/Marketplace';
import CommunityForum from './pages/CommunityForum';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import ResidentApprovals from './pages/ResidentApprovals';

import LiveMap from './pages/LiveMap';
import News from './pages/News';
import Events from './pages/Events';
import Opportunities from './pages/Opportunities';
import Transport from './pages/Transport';
import AiAssistant from './pages/AiAssistant';
import RealEstate from './pages/RealEstate';

function AppContent() {
  const { currentUser } = useContext(AppContext);
  const { currentUser: societyUser, getActiveSociety } = useSociety();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Progressive Profiling Modal State
  const [profilingModal, setProfilingModal] = useState({
    isOpen: false,
    mode: 'general' // 'general', 'blood', 'ward'
  });

  const handleOpenProfiling = (mode = 'general') => {
    setProfilingModal({ isOpen: true, mode });
  };

  const handleCloseProfiling = () => {
    setProfilingModal({ isOpen: false, mode: 'general' });
  };

  const renderContent = () => {
    // If not onboarded (missing societyId), force onboarding
    if (!societyUser?.societyId && activeTab !== 'profile') {
      return <Onboarding onComplete={() => setActiveTab('dashboard')} />;
    }

    // Guest Mode / SaaS Revoked state check
    const soc = getActiveSociety?.();
    const isRevoked = soc?.planStatus === 'Revoked';
    const isGuest = societyUser?.verificationStatus === 'Pending';
    const isRestricted = isRevoked || isGuest;

    if (activeTab === 'complaints' && isRestricted) return <GuestBlockMessage isRevoked={isRevoked} />;
    
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} onOpenProfiling={handleOpenProfiling} />;
      case 'marketplace':
        return <Marketplace />;
      case 'services':
      case 'directory':
        return <Directory />;
      case 'emergency':
        return <Emergency onOpenProfiling={handleOpenProfiling} />;
      case 'ward':
      case 'complaints':
        return <Complaints onOpenProfiling={handleOpenProfiling} />;
      case 'forum':
        return <CommunityForum />;
      case 'profile':
        return <Login />;
      case 'realestate':
        return <RealEstate />;
      case 'ai-assistant':
      case 'aiAssistant':
        return <AiAssistant />;
      case 'transport':
        return <Transport />;
      case 'opportunities':
        return <Opportunities />;
      case 'news':
        return <News />;
      case 'events':
        return <Events />;
      case 'map':
        return <LiveMap />;
      case 'superadmin':
        return <SuperAdminDashboard />;
      case 'approvals':
        return <ResidentApprovals />;
      default:
        return <Dashboard setActiveTab={setActiveTab} onOpenProfiling={handleOpenProfiling} />;
    }
  };

  const GuestBlockMessage = ({ isRevoked }) => (
    <div style={{ textAlign: 'center', padding: '4rem 1rem', animation: 'fadeIn 0.3s ease-in-out' }}>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto', borderTop: '4px solid var(--danger)' }}>
        <h3 style={{ color: 'var(--danger)', marginBottom: '1rem', fontWeight: '800' }}>Access Restricted</h3>
        <p style={{ color: 'var(--text-main)', marginBottom: 0 }}>
          {isRevoked 
            ? "Your society's SaaS subscription has expired. Please contact your Society Admin." 
            : "Your account is pending verification by the admin. You only have read access to community notices currently."}
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Top Header Bar */}
      <Header onOpenProfileModal={() => handleOpenProfiling('general')} />

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Left Desktop Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content Area */}
        <main className="main-content-container" style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          paddingBottom: '5rem' // Padding for mobile bottom nav
        }}>
          {renderContent()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Progressive Profiling Modal */}
      <ProgressiveProfileModal
        isOpen={profilingModal.isOpen}
        onClose={handleCloseProfiling}
        mode={profilingModal.mode}
      />
      
      {/* PWA Add to Homescreen Prompt */}
      <InstallPrompt />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
