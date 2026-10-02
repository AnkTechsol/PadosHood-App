import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {
  ShieldAlert,
  ShoppingBag,
  Wrench,
  Heart,
  Landmark,
  MessageSquare,
  CloudSun,
  Activity,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Home,
  Tag,
  Clock,
  MapPin
} from 'lucide-react';

export default function Dashboard({ setActiveTab, onOpenProfiling }) {
  const { currentUser, t, language, pcmcWardSchedules, communityPosts, merchants, complaints, trafficAlerts } = useContext(AppContext);

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      id: 1,
      tag: "CIVIC ALERT",
      tagBg: "#ef4444",
      title: "PCMC Water Supply Maintenance in Moshi",
      subtitle: "8-Hour Water cut announced for Thursday (9 AM - 5 PM) across Ward 3, 4 & 5. Please store water in advance.",
      bg: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
      btnText: "Check Ward Timings",
      action: () => setActiveTab('ward')
    },
    {
      id: 2,
      tag: "BLOOD DRIVE",
      tagBg: "#dc2626",
      title: "Mega Blood Donation Camp at Sambhaji Hall",
      subtitle: "Join Moshi Social Foundation on Sunday. YCM Hospital Blood Bank needs O+ and B+ donors urgently.",
      bg: "linear-gradient(135deg, #991b1b 0%, #ef4444 100%)",
      btnText: "View Blood Donors",
      action: () => {
        if (!currentUser.bloodGroup) onOpenProfiling('blood');
        else setActiveTab('emergency');
      }
    },
    {
      id: 3,
      tag: "LOCAL DEAL",
      tagBg: "#f59e0b",
      title: "10% OFF Fresh Organic Veggies at Spine Road",
      subtitle: "Moshi Fresh Grocers discount on orders above ₹300. Direct WhatsApp delivery available across Moshi.",
      bg: "linear-gradient(135deg, #78350f 0%, #d97706 100%)",
      btnText: "Order on WhatsApp",
      action: () => setActiveTab('marketplace')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const activeWardInfo = pcmcWardSchedules[currentUser.pcmcWard] || pcmcWardSchedules['Ward 4 (Moshi Pradhikaran)'];

  const quickActions = [
    { id: 'emergency', label: t('emergencySOS'), icon: ShieldAlert, color: '#ef4444', bg: '#fee2e2', desc: '1-Tap Call & SOS' },
    { id: 'marketplace', label: t('localShops'), icon: ShoppingBag, color: '#2563eb', bg: '#dbeafe', desc: 'Digital Menus & WhatsApp' },
    { id: 'services', label: t('servicesDirectory'), icon: Wrench, color: '#d97706', bg: '#fef3c7', desc: 'Plumbers & Electricians' },
    { id: 'emergency', label: t('bloodNetwork'), icon: Heart, color: '#dc2626', bg: '#ffe4e6', desc: 'Matching Donors' },
    { id: 'ward', label: t('wardUpdates'), icon: Landmark, color: '#059669', bg: '#dcfce7', desc: 'Water & Garbage Schedule' },
    { id: 'forum', label: t('communityForum'), icon: MessageSquare, color: '#7c3aed', bg: '#f3e8ff', desc: 'Lost & Found, Events' }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      
      {/* Hero Carousel */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        background: carouselItems[currentSlide].bg,
        color: 'white',
        padding: '1.75rem 1.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
        transition: 'background 0.5s ease-in-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{
            backgroundColor: carouselItems[currentSlide].tagBg,
            color: 'white',
            fontWeight: '800',
            fontSize: '0.7rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '99px',
            letterSpacing: '0.05em'
          }}>
            {carouselItems[currentSlide].tag}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8, fontSize: '0.8rem' }}>
            <CloudSun size={18} />
            <span>29°C Moshi · AQI 42 Good</span>
          </div>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: 1.2 }}>
          {carouselItems[currentSlide].title}
        </h2>
        <p style={{ opacity: 0.9, fontSize: '0.9rem', marginBottom: '1.25rem', maxWidth: '650px', lineHeight: 1.4 }}>
          {carouselItems[currentSlide].subtitle}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            onClick={carouselItems[currentSlide].action}
            style={{
              backgroundColor: 'white',
              color: 'var(--text-main)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '0.55rem 1.25rem',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {carouselItems[currentSlide].btnText} <ChevronRight size={16} />
          </button>

          {/* Carousel Dots */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {carouselItems.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: idx === currentSlide ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '99px',
                  backgroundColor: idx === currentSlide ? 'white' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Live Traffic Ticker */}
      {trafficAlerts && trafficAlerts.length > 0 && (
        <div
          onClick={() => setActiveTab('transport')}
          style={{
            backgroundColor: '#fff7ed',
            border: '1px solid #fdba74',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            color: '#c2410c'
          }}
        >
          <Activity size={20} />
          <div style={{ fontSize: '0.88rem' }}>
            <span style={{ fontWeight: '700' }}>Live Moshi Traffic Alert: </span>
            <span>{trafficAlerts[0].title} - Expect delay of {trafficAlerts[0].delay}</span>
          </div>
        </div>
      )}

      {/* Quick Action Grid (Core Specification A) */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
          Hyper-Local Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem'
        }}>
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <div
                key={action.id + action.label}
                onClick={() => {
                  if (action.id === 'emergency' && action.label === t('bloodNetwork') && !currentUser.bloodGroup) {
                    onOpenProfiling('blood');
                  } else {
                    setActiveTab(action.id);
                  }
                }}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1.25rem 0.75rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{
                  padding: '0.85rem',
                  backgroundColor: action.bg,
                  color: action.color,
                  borderRadius: '50%',
                  marginBottom: '0.75rem'
                }}>
                  <Icon size={26} />
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  {action.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {action.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PCMC Ward Status Card & AI Assistant Banner */}
      <div className="dashboard-columns">
        {/* Left: Ward Quick Schedule & Issue Reporting */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Ward Water & Garbage Live Status Card */}
          <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Landmark size={20} color="var(--primary)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--primary-dark)', margin: 0 }}>
                  {currentUser.pcmcWard} Status
                </h4>
              </div>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                onClick={() => onOpenProfiling('ward')}
              >
                Change Ward
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ backgroundColor: '#eff6ff', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '0.2rem' }}>
                  🚰 {t('waterTiming')}
                </div>
                <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{activeWardInfo.water}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: '600', marginTop: '0.25rem' }}>
                  ✓ {activeWardInfo.waterStatus}
                </div>
              </div>

              <div style={{ backgroundColor: '#f0fdf4', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '700', marginBottom: '0.2rem' }}>
                  🚛 {t('garbageSchedule')}
                </div>
                <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{activeWardInfo.garbageWet}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Dry Waste: {activeWardInfo.garbageDry}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                onClick={() => setActiveTab('complaints')}
              >
                {t('fileComplaint')}
              </button>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}
                onClick={() => setActiveTab('ward')}
              >
                Full Ward Details
              </button>
            </div>
          </div>

          {/* Featured Shops & Food (Digital Menus preview) */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--primary-dark)', margin: 0 }}>
                🏪 Top Moshi Shops & Digital Menus
              </h4>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                onClick={() => setActiveTab('marketplace')}
              >
                View All Shops
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {merchants.slice(0, 2).map(mch => (
                <div key={mch.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', backgroundColor: 'var(--bg-main)' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
                    {mch.business_name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <MapPin size={12} style={{ display: 'inline' }} /> {mch.address}
                  </div>
                  <div style={{ fontSize: '0.75rem', backgroundColor: '#fef3c7', color: '#b45309', padding: '0.25rem 0.5rem', borderRadius: '4px', marginBottom: '0.75rem', fontWeight: '600' }}>
                    🏷️ {mch.special_offer}
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.4rem' }}
                    onClick={() => setActiveTab('marketplace')}
                  >
                    View Menu ({mch.catalog?.length || 0} items)
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Scheme Helper & Super App Shortcuts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* AI Scheme Helper CTA */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '1px solid #bfdbfe' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ padding: '0.6rem', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '50%' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h4 style={{ fontWeight: '700', color: 'var(--primary-dark)', margin: 0, fontSize: '0.98rem' }}>
                  {t('aiAssistant')}
                </h4>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  PCMC & Govt Scheme Helpline
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.4 }}>
              Ask in English or मराठी about Ladki Bahin Yojana, PCMC Property tax rebates, or school admissions.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
              onClick={() => setActiveTab('ai-assistant')}
            >
              Ask AI Assistant Now
            </button>
          </div>

          {/* Super App Extra Modules Shortcuts */}
          <div className="card">
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>
              Moshi Super App Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => setActiveTab('realestate')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: '600' }}>
                  <Home size={16} color="var(--primary)" />
                  <span>{t('realEstate')}</span>
                </div>
                <ChevronRight size={16} color="var(--text-muted)" />
              </button>

              <button
                onClick={() => setActiveTab('opportunities')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: '600' }}>
                  <Briefcase size={16} color="#7c3aed" />
                  <span>{t('jobsBoard')}</span>
                </div>
                <ChevronRight size={16} color="var(--text-muted)" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
