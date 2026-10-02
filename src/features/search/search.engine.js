import { projectsData } from '../../data/projects';

export function searchAll(query, data) {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase();
  const groups = [];

  const {
    schools = [],
    directoryListings = [],
    complaints = [],
    news = [],
    events = [],
    jobs = [],
    marketplaceShops = [],
    emergencyContacts = []
  } = data || {};

  const match = (str) => str && str.toString().toLowerCase().includes(q);

  // Real Estate Projects
  const realEstateResults = projectsData.filter(p =>
    match(p.name) || match(p.builder) || match(p.location) || match(p.bhkOptions?.join(' ')) || match(p.description)
  ).map(p => ({
    id: p.id || Math.random(),
    title: p.name,
    subtitle: `${p.builder} · ${p.location} · ${p.priceRange}`,
    badge: `${p.bhkOptions?.join(', ')} BHK`,
    badgeColor: '#10b981',
    action: 'realestate',
    actionLabel: 'View Project'
  }));
  if (realEstateResults.length > 0) {
    groups.push({ category: 'Real Estate Projects', icon: '🏢', color: '#10b981', results: realEstateResults });
  }

  // Schools
  const schoolResults = schools.filter(s => 
    match(s.name) || match(s.board) || match(s.medium) || match(s.address)
  ).map(s => ({
    id: s.id || Math.random(),
    title: s.name,
    subtitle: `${s.board} · ${s.medium} Medium · ${s.grades}`,
    badge: s.board,
    badgeColor: '#1d4ed8',
    action: 'directory-schools',
    actionLabel: 'View School'
  }));
  if (schoolResults.length > 0) {
    groups.push({ category: 'Schools', icon: '🏫', color: '#1d4ed8', results: schoolResults });
  }

  // Directory Listings
  const dirResults = directoryListings.filter(l => 
    match(l.name) || match(l.category) || match(l.address)
  ).map(l => ({
    id: l.id || Math.random(),
    title: l.name,
    subtitle: l.address,
    badge: l.category,
    badgeColor: '#0369a1',
    action: 'directory',
    actionLabel: 'View in Directory'
  }));
  if (dirResults.length > 0) {
    groups.push({ category: 'Directory', icon: '📋', color: '#0369a1', results: dirResults });
  }

  // Complaints
  const compResults = complaints.filter(c => 
    match(c.id) || match(c.category) || match(c.address) || match(c.description)
  ).map(c => ({
    id: c.id || Math.random(),
    title: `${c.id} — ${c.category}`,
    subtitle: c.address,
    badge: c.status,
    badgeColor: '#dc2626',
    action: 'complaints',
    actionLabel: 'Track Complaint'
  }));
  if (compResults.length > 0) {
    groups.push({ category: 'Complaints', icon: '⚠️', color: '#dc2626', results: compResults });
  }

  // News
  const newsResults = news.filter(n => 
    match(n.title) || match(n.content) || match(n.category)
  ).map(n => ({
    id: n.id || Math.random(),
    title: n.title,
    subtitle: `${n.source} · ${new Date(n.date).toLocaleDateString()}`,
    badge: n.category,
    badgeColor: '#7c3aed',
    action: 'news',
    actionLabel: 'Read Alert'
  }));
  if (newsResults.length > 0) {
    groups.push({ category: 'News & Alerts', icon: '📰', color: '#7c3aed', results: newsResults });
  }

  // Events
  const eventResults = events.filter(e => 
    match(e.title) || match(e.description) || match(e.location)
  ).map(e => ({
    id: e.id || Math.random(),
    title: e.title,
    subtitle: `${e.date} · ${e.location}`,
    badge: e.category,
    badgeColor: '#059669',
    action: 'events',
    actionLabel: 'RSVP Now'
  }));
  if (eventResults.length > 0) {
    groups.push({ category: 'Events', icon: '🎪', color: '#059669', results: eventResults });
  }

  // Jobs
  const jobResults = jobs.filter(j => 
    match(j.title) || match(j.company) || match(j.category) || match(j.location)
  ).map(j => ({
    id: j.id || Math.random(),
    title: j.title,
    subtitle: `${j.company} · ${j.location} · ${j.salary}`,
    badge: j.type,
    badgeColor: '#d97706',
    action: 'opportunities',
    actionLabel: 'Apply Now'
  }));
  if (jobResults.length > 0) {
    groups.push({ category: 'Job Openings', icon: '💼', color: '#d97706', results: jobResults });
  }

  // Marketplace
  const shopResults = marketplaceShops.filter(s => 
    match(s.name) || match(s.category) || match(s.address)
  ).map(s => ({
    id: s.id || Math.random(),
    title: s.name,
    subtitle: `${s.address} · ⭐ ${s.rating}`,
    badge: s.category,
    badgeColor: '#db2777',
    action: 'marketplace',
    actionLabel: 'View Shop'
  }));
  if (shopResults.length > 0) {
    groups.push({ category: 'Local Shops', icon: '🛒', color: '#db2777', results: shopResults });
  }

  // Emergency
  const emergencyResults = emergencyContacts.filter(e => 
    match(e.name) || match(e.category) || match(e.phone)
  ).map(e => ({
    id: e.name,
    title: e.name,
    subtitle: `Emergency: ${e.phone}`,
    badge: e.urgency === 'High' ? '🚨 High Priority' : 'Medium',
    badgeColor: '#dc2626',
    action: 'emergency',
    actionLabel: 'Call Now'
  }));
  if (emergencyResults.length > 0) {
    groups.push({ category: 'Emergency Services', icon: '🚨', color: '#dc2626', results: emergencyResults });
  }

  return groups;
}
