import React, { createContext, useContext, useState, useEffect } from 'react';
import { schoolsData } from '../../features/directory/schools/schools.constants';
import { directoryListings, sponsoredListings } from '../../features/directory/directory.constants';
import { newsData } from '../../features/news/news.constants';
import { emergencyContacts } from '../../features/emergency/emergency.constants';

// ─── Shared AppContext ────────────────────────────────────────────────────────
// This is a thin bridge that composes all feature state slices into one
// unified context. Components use useContext(AppContext) as before.
// ─────────────────────────────────────────────────────────────────────────────

export const AppContext = createContext();

const stored = (key, fallback) => {
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
};

// ── Initial data for event-driven features ────────────────────────────────────
const initialEvents = [
  { id: 'EVT-2026-101', title: 'Mega Blood Donation Drive', description: 'Join the annual blood donation drive. Blood donated to YCM Hospital Blood Bank.', date: '2026-07-05', time: '09:00 AM - 05:00 PM', location: 'Sambhaji Maharaj Community Hall, Moshi Pradhikaran', organizer: 'Moshi Social Foundation & MLA Youth Club', banner: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80', rsvps: [], category: 'Health Camp' },
  { id: 'EVT-2026-102', title: 'Vrukshavalli: 1000 Tree Plantation Drive', description: 'Planting 1000 native saplings along Indrayani River bank and Sector 4 green zones.', date: '2026-07-12', time: '07:30 AM - 11:30 AM', location: 'Indrayani Riverfront Park, Moshi', organizer: 'Green Moshi Clean Moshi NGO', banner: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80', rsvps: [], category: 'Tree Plantation' },
  { id: 'EVT-2026-103', title: 'Public Townhall Meeting', description: 'Open assembly to discuss monsoon preparation, garbage schedules, ward budgets.', date: '2026-07-08', time: '06:00 PM - 08:30 PM', location: 'Open Theatre, Moshi Chowk', organizer: 'Aaple Moshi Citizen Committee', banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', rsvps: [], category: 'Public Meetings' },
];

const initialTraffic = [
  { id: 'TRF-001', title: 'Heavy Jam at Moshi Toll Plaza intersection', category: 'Congestion', delay: '15 mins delay', location: 'Pune-Nashik Highway Crossing, Moshi', description: 'Three trucks broke down near the bypass crossing.', reportedBy: 'Amit Shinde', timeReported: '2026-07-04T10:30:00Z', upvotes: 8 },
  { id: 'TRF-002', title: 'Indrayani River Bridge Water-logging', category: 'Roadwork / Water', delay: '20 mins delay', location: 'Indrayani River old bridge road, Moshi', description: 'Pothole patch work narrowed to single lane. Heavy rain logged water on margins.', reportedBy: 'Kiran Patil', timeReported: '2026-07-04T11:15:00Z', upvotes: 14 },
];

const initialJobs = [
  { id: 'JOB-001', title: 'Store Accountant / Cashier', company: 'Spine City Supermarket', category: 'Retail', type: 'Full-time', salary: '₹18,000 - ₹22,000 / month', qualification: 'B.Com / Basic Tally / Excel', location: 'Sector 4, Spine Road, Moshi', description: 'Manage daily invoicing, checkout, billing tallies, and store inventory records.', datePosted: '2026-07-01', appliedCount: 4, applicants: [] },
  { id: 'JOB-002', title: 'Primary School Home Tutor', company: 'Indrayani Coaching Academy', category: 'Education', type: 'Part-time', salary: '₹6,000 - ₹8,000 / month', qualification: 'Graduate / Marathi & English', location: 'Indrayani Nagar, Moshi', description: 'Teach Mathematics, Science, English to Class 1-5 students.', datePosted: '2026-07-02', appliedCount: 2, applicants: [] },
  { id: 'JOB-003', title: 'CNC Machine Operator Helper', company: 'Bhosari MIDC Engineering Co.', category: 'Technical', type: 'Full-time', salary: '₹15,000 - ₹19,000 / month', qualification: 'ITI / Diploma Mechanical', location: 'Bhosari MIDC, Sector 7', description: 'Load steel components onto CNC machinery, monitor coolant levels.', datePosted: '2026-07-03', appliedCount: 7, applicants: [] },
  { id: 'JOB-004', title: 'Delivery Partner (Moshi Hub)', company: 'Moshi Hyperlocal Logistics', category: 'Delivery', type: 'Gig-based', salary: '₹12,000 - ₹18,000 / month', qualification: 'Two-wheeler / Valid DL / Aadhaar', location: 'Moshi Chowk Hub', description: 'Deliver grocery and food parcels within 5km radius.', datePosted: '2026-07-04', appliedCount: 12, applicants: [] },
];

const initialMarketplace = [
  { id: 'MKT-001', name: 'Moshi Fresh & Green Grocers', category: 'Grocery', phone: '+91 91122 33445', address: 'Shop 10, Indrayani Heights, Alandi Road, Moshi', rating: 4.7, timing: '08:00 AM - 10:00 PM', sponsored: true, offer: 'Get 10% cash discount on veggies above ₹300! Code: FRESH10', reviews: [{ name: 'Sambhaji Landge', rating: 5, comment: 'Veggies are super fresh!' }] },
  { id: 'MKT-002', name: 'Hotel Jagdamba & Indrayani Thali', category: 'Restaurants', phone: '+91 20 2713 7777', address: 'Near Moshi Toll Plaza, Nashik Highway', rating: 4.8, timing: '11:30 AM - 11:00 PM', sponsored: false, offer: 'Free Lassi on 2 Special Veg Thalis.', reviews: [{ name: 'Kunal Deshmukh', rating: 5, comment: 'Awesome Maharashtrian food!' }] },
  { id: 'MKT-003', name: 'Shraddha Hardware & Paints', category: 'Hardware', phone: '+91 99750 11223', address: 'Moshi Chowk Market area', rating: 4.5, timing: '09:00 AM - 08:30 PM', sponsored: false, offer: '5% discount code: PAINTS5', reviews: [{ name: 'Dilip Patil', rating: 4, comment: 'All plumbing parts under one roof.' }] },
];

export const AppProvider = ({ children }) => {
  // ── Auth slice ──────────────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(() => stored('am_user', null));
  useEffect(() => {
    if (currentUser) localStorage.setItem('am_user', JSON.stringify(currentUser));
    else localStorage.removeItem('am_user');
  }, [currentUser]);

  const loginUser = (profile) => setCurrentUser({ ...profile, role: 'Citizen', points: 0, badges: [], isVolunteer: false, volunteerSkills: [] });
  const logoutUser = () => setCurrentUser(null);
  const switchRole = (role) => setCurrentUser(prev => prev ? { ...prev, role } : null);
  const registerAsVolunteer = (skills) => setCurrentUser(prev => prev ? ({ ...prev, isVolunteer: true, volunteerSkills: skills, points: (prev.points || 0) + 50, badges: prev.badges.includes('Civic Volunteer') ? prev.badges : [...prev.badges, 'Civic Volunteer'] }) : null);
  const addPoints = (n) => setCurrentUser(prev => prev ? { ...prev, points: (prev.points || 0) + n } : null);

  // ── Complaints slice ────────────────────────────────────────────────────────
  const [complaints, setComplaints] = useState(() => stored('am_complaints', []));
  useEffect(() => { localStorage.setItem('am_complaints', JSON.stringify(complaints)); }, [complaints]);

  const addComplaint = (data) => {
    const id = `COMP-2026-${String(complaints.length + 1).padStart(3, '0')}`;
    let karyakarta = 'Sachin Patil', dept = 'Public Works Department';
    if (data.category === 'Garbage') { karyakarta = 'Amit Shinde'; dept = 'Solid Waste Management'; }
    else if (['Water','Drainage','Sewage'].includes(data.category)) { karyakarta = 'Sachin Patil'; dept = 'Water Supply & Sanitation'; }
    else if (['Street Light','Electricity'].includes(data.category)) { karyakarta = 'Uday Landge'; dept = 'Electrical / Public Lighting'; }
    else if (['Road','Construction'].includes(data.category)) { karyakarta = 'Amit Shinde'; dept = 'Road Construction & Maintenance'; }
    const complaint = { id, ...data, status: 'Submitted', dateSubmitted: new Date().toISOString(), citizenName: data.anonymous ? 'Anonymous Citizen' : (currentUser?.name || 'Guest'), assignedKaryakarta: karyakarta, department: dept, timeline: [{ status: 'Submitted', date: new Date().toISOString(), message: 'Complaint registered successfully.' }], feedback: null };
    setComplaints(prev => [complaint, ...prev]);
    addPoints(15);
    return complaint;
  };
  const updateComplaintStatus = (id, status, message) => setComplaints(prev => prev.map(c => c.id === id ? { ...c, status, timeline: [...c.timeline, { status, date: new Date().toISOString(), message: message || `Status updated to ${status}.` }] } : c));
  const submitComplaintFeedback = (id, rating, comment) => { setComplaints(prev => prev.map(c => c.id === id ? { ...c, feedback: { rating, comment } } : c)); addPoints(5); };

  // ── Events slice ────────────────────────────────────────────────────────────
  const [events, setEvents] = useState(() => stored('am_events', initialEvents));
  useEffect(() => { localStorage.setItem('am_events', JSON.stringify(events)); }, [events]);
  const toggleRsvp = (eventId) => {
    if (!currentUser) return;
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, rsvps: e.rsvps.includes(currentUser.name) ? e.rsvps.filter(n => n !== currentUser.name) : [...e.rsvps, currentUser.name] } : e));
  };

  // ── Transport slice ─────────────────────────────────────────────────────────
  const [trafficAlerts, setTrafficAlerts] = useState(() => stored('am_traffic', initialTraffic));
  useEffect(() => { localStorage.setItem('am_traffic', JSON.stringify(trafficAlerts)); }, [trafficAlerts]);
  const addTrafficAlert = (data) => {
    const id = `TRF-${String(trafficAlerts.length + 1).padStart(3, '0')}`;
    setTrafficAlerts(prev => [{ id, ...data, reportedBy: currentUser?.name || 'Anonymous', timeReported: new Date().toISOString(), upvotes: 0 }, ...prev]);
    addPoints(10);
  };
  const upvoteTrafficAlert = (id) => setTrafficAlerts(prev => prev.map(a => a.id === id ? { ...a, upvotes: a.upvotes + 1 } : a));

  // ── Opportunities slice ─────────────────────────────────────────────────────
  const [jobs, setJobs] = useState(() => stored('am_jobs', initialJobs));
  useEffect(() => { localStorage.setItem('am_jobs', JSON.stringify(jobs)); }, [jobs]);
  const applyToJob = (jobId) => {
    if (!currentUser) return;
    setJobs(prev => prev.map(j => j.id === jobId && !j.applicants.includes(currentUser.name) ? { ...j, appliedCount: j.appliedCount + 1, applicants: [...j.applicants, currentUser.name] } : j));
    addPoints(10);
  };

  // ── Static data (constants, no state needed) ────────────────────────────────
  const news = newsData;
  const emergency = emergencyContacts;
  const directory = [...sponsoredListings, ...directoryListings];
  const schools = schoolsData;
  const marketplaceShops = initialMarketplace;

  return (
    <AppContext.Provider value={{
      // Auth
      currentUser, loginUser, logoutUser, switchRole, registerAsVolunteer,
      // Complaints
      complaints, addComplaint, updateComplaintStatus, submitComplaintFeedback,
      // Events
      events, toggleRsvp,
      // Transport
      trafficAlerts, addTrafficAlert, upvoteTrafficAlert,
      // Opportunities
      jobs, applyToJob,
      // Static data (searchable)
      news, emergency, directory, schools,
      directoryListings, sponsoredListings,
      marketplaceShops,
    }}>
      {children}
    </AppContext.Provider>
  );
};
