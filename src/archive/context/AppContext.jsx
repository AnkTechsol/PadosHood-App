import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const initialNews = [
  { id: 1, title: 'PCMC Announces 8-Hour Water Cut for Maintenance in Moshi & Indrayani Nagar', content: 'Pimpri Chinchwad Municipal Corporation (PCMC) has announced that water supply will be suspended on Thursday, July 2nd, from 9:00 AM to 5:00 PM. This water cut is necessary to undertake critical pipeline maintenance and repairing of the filtration unit. Residents are advised to store sufficient water in advance.', category: 'Water Cut', date: '2026-06-30T07:00:00Z', source: 'PCMC Water Dept', important: true },
  { id: 2, title: 'Traffic Diversion on Dehu-Alandi Road due to Flyover Construction', content: 'Commuters traveling via Dehu-Alandi Road are informed that traffic will be diverted starting from July 1st. Light vehicles will be rerouted through Spine Road, while heavy vehicles must use the Nashik Highway corridor. The diversion will be active for 15 days as concrete girders are being launched for the new flyover.', category: 'Traffic', date: '2026-06-29T14:30:00Z', source: 'Traffic Police Moshi', important: false },
  { id: 3, title: 'Planned Power Cut in Moshi Sector 3, 4 and 5 on Saturday', content: 'MSEDCL has informed that there will be a scheduled power outage on Saturday, July 4th, between 10:00 AM and 4:00 PM for pre-monsoon tree trimming and insulator replacements on overhead lines. Cooperation from citizens is requested.', category: 'Power Cut', date: '2026-06-28T09:00:00Z', source: 'MSEDCL Indrayani Division', important: false },
  { id: 4, title: 'Aaple Moshi Mega Health Camp at Indrayani Sports Ground', content: 'Under the guidance of the MLA Office, a free mega multi-specialty health camp is being organized this Sunday. Over 30 specialized doctors from prominent hospitals will offer consultation, basic check-ups, and medicines for free. Specialized tracks for cardiac screening, women safety, and pediatrics are available.', category: 'Civic', date: '2026-06-27T10:00:00Z', source: 'MLA Office Moshi', important: true }
];

const initialEvents = [
  { id: 'EVT-2026-101', title: 'Mega Blood Donation Drive', description: 'Join the annual blood donation drive organized on the occasion of Youth Day. All collected blood will be donated to Yashwantrao Chavan Memorial Hospital (YCM) Blood Bank. Safe, sterile environment with certificates and food packets for all donors.', date: '2026-07-05', time: '09:00 AM - 05:00 PM', location: 'Sambhaji Maharaj Community Hall, Moshi Pradhikaran', organizer: 'Moshi Social Foundation & MLA Youth Club', banner: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80', rsvps: [], category: 'Health Camp' },
  { id: 'EVT-2026-102', title: 'Vrukshavalli: 1000 Tree Plantation Drive', description: 'Let us make Moshi green! We are planting 1000 native tree saplings along the Indrayani River bank and Sector 4 green zones. Volunteers are requested to bring their own water bottles. Saplings and digging tools will be provided. Breakfast will be served to all volunteers.', date: '2026-07-12', time: '07:30 AM - 11:30 AM', location: 'Indrayani Riverfront Park, Moshi', organizer: 'Green Moshi Clean Moshi NGO', banner: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80', rsvps: [], category: 'Tree Plantation' },
  { id: 'EVT-2026-103', title: 'Public Townhall Meeting', description: 'An open interactive assembly to discuss the upcoming monsoon preparation, garbage collection schedules, and ward development budgets. Bring your proposals, questions, and suggestions. The MLA and PCMC Ward Officers will be present.', date: '2026-07-08', time: '06:00 PM - 08:30 PM', location: 'Open Theatre, Moshi Chowk', organizer: 'Aaple Moshi Citizen Committee', banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', rsvps: [], category: 'Public Meetings' }
];

const initialDirectory = [
  { id: 1, name: 'Sanjeevani Hospital & ICU', category: 'Hospitals', phone: '+91 20 2713 0045', address: 'Nashik Highway, opposite Moshi Toll Plaza, Moshi', rating: 4.6, timing: '24 Hours' },
  { id: 2, name: 'Dr. Sudhir Patil (Pediatrician)', category: 'Doctors', phone: '+91 98223 44556', address: 'Shop 12, Spine City Mall, Spine Road, Moshi', rating: 4.8, timing: '10:00 AM - 01:00 PM, 06:00 PM - 09:00 PM' },
  { id: 4, name: 'Vishwajeet Electricals (Shripad Joshi)', category: 'Electricians', phone: '+91 99210 12345', address: 'Mobile Service (Sector 4 / Pradhikaran Area)', rating: 4.5, timing: '09:00 AM - 08:00 PM' },
  { id: 5, name: 'Kiran Plumbing & Sanitary (Kiran Patil)', category: 'Plumbers', phone: '+91 91580 88990', address: 'Shop 4, Indrayani Heights, Moshi', rating: 4.7, timing: '08:00 AM - 09:00 PM' },
  { id: 6, name: 'State Bank of India (SBI) - Moshi Branch', category: 'Banks', phone: '+91 20 2713 1122', address: 'Gat No. 120, Spine Road, Moshi', rating: 4.0, timing: '10:00 AM - 04:00 PM' },
  { id: 7, name: 'PCMC Ward B Administrative Office', category: 'Government Offices', phone: '+91 20 2742 5511', address: 'Pradhikaran, Sector 5, Pimpri (Moshi Ward Rep Desk)', rating: 4.3, timing: '09:45 AM - 05:45 PM (Mon-Sat)' },
  // CBSE Schools
  { id: 101, name: 'City Pride School', category: 'Schools', board: 'CBSE', medium: 'English', grades: 'Nursery – Class 12', phone: '+91 20 2713 5501', address: 'Chikhali-Moshi Road, Dehu-Alandi Rd, Moshi', rating: 4.7, timing: '07:30 AM – 02:30 PM' },
  { id: 102, name: 'Sadhu Vaswani International School (SVIS)', category: 'Schools', board: 'CBSE', medium: 'English', grades: 'Nursery – Class 12', phone: '+91 20 2765 9900', address: 'Moshi Pradhikaran, Sector 6, Moshi', rating: 4.8, timing: '07:30 AM – 02:30 PM' },
  { id: 103, name: 'Innovative World School', category: 'Schools', board: 'CBSE', medium: 'English', grades: 'Nursery – Class 10', phone: '+91 98230 11450', address: 'Spine Road, Chikhali-Moshi, Pune', rating: 4.6, timing: '08:00 AM – 02:30 PM' },
  { id: 104, name: 'Sri Sri Ravishankar Vidya Mandir (SSRVM)', category: 'Schools', board: 'CBSE', medium: 'English', grades: 'Nursery – Class 10', phone: '+91 98810 23456', address: 'Near Woodsville Township, Moshi, Pune', rating: 4.5, timing: '08:00 AM – 02:00 PM' },
  { id: 105, name: 'Galaxy Public School', category: 'Schools', board: 'CBSE', medium: 'English', grades: 'Nursery – Class 10', phone: '+91 99750 44321', address: 'Moshi Gaon, Near Pradhikaran, Moshi', rating: 4.4, timing: '07:45 AM – 02:15 PM' },
  { id: 106, name: 'Abhishek International School', category: 'Schools', board: 'CBSE', medium: 'English', grades: 'Nursery – Class 10', phone: '+91 20 2765 7700', address: 'Sector 4, Moshi Pradhikaran, Moshi', rating: 4.3, timing: '08:00 AM – 02:30 PM' },
  { id: 107, name: 'Dheeraj International School', category: 'Schools', board: 'CBSE', medium: 'English', grades: 'Nursery – Class 10', phone: '+91 91451 22334', address: 'Pradhikaran Road, Moshi Pradhikaran, Moshi', rating: 4.2, timing: '08:00 AM – 02:00 PM' },
  { id: 108, name: 'SNBP International School', category: 'Schools', board: 'CBSE', medium: 'English', grades: 'Nursery – Class 12', phone: '+91 20 2765 3399', address: 'Chikhali-Moshi Border, near Nashik Phata', rating: 4.6, timing: '07:30 AM – 02:30 PM' },
  { id: 109, name: 'Gayatri English Medium School & Jr. College', category: 'Schools', board: 'CBSE', medium: 'English', grades: 'Nursery – Class 12', phone: '+91 20 2713 7799', address: 'Chikhali-Moshi Road, Alandi Road Junction', rating: 4.4, timing: '07:45 AM – 02:15 PM' },
  { id: 110, name: 'Blue Ridge Public School', category: 'Schools', board: 'CBSE', medium: 'English', grades: 'Nursery – Class 10', phone: '+91 99219 88001', address: 'Spine Road, Sector 2, Moshi', rating: 4.3, timing: '08:00 AM – 02:00 PM' },
  // State Board English
  { id: 201, name: 'New Indrayani English Medium School & Jr. College', category: 'Schools', board: 'State Board', medium: 'English', grades: 'Class 1 – Class 12', phone: '+91 20 2713 9200', address: 'Indrayani Nagar, Moshi, Pune', rating: 4.5, timing: '07:30 AM – 01:30 PM' },
  { id: 202, name: 'Priyadarshani School & Junior College', category: 'Schools', board: 'State Board', medium: 'English', grades: 'Class 1 – Class 12', phone: '+91 20 2713 6600', address: 'Bhosari-Moshi Road, Near MIDC Gate', rating: 4.4, timing: '07:30 AM – 01:30 PM' },
  { id: 203, name: 'Shri Nageshwar New English School', category: 'Schools', board: 'State Board', medium: 'English', grades: 'Nursery – Class 10', phone: '+91 97650 33221', address: 'Moshi Gaon, Alandi Road, Moshi', rating: 4.2, timing: '07:45 AM – 01:30 PM' },
  { id: 204, name: 'Shri Saraswati Vidyalaya English Medium', category: 'Schools', board: 'State Board', medium: 'English', grades: 'Class 1 – Class 10', phone: '+91 98812 00443', address: 'Near Alandi Road, Moshi, Pune', rating: 4.1, timing: '08:00 AM – 01:30 PM' },
  { id: 205, name: 'Kendriya Vidyalaya Dehu Road', category: 'Schools', board: 'CBSE (KV)', medium: 'English', grades: 'Class 1 – Class 12', phone: '+91 20 2633 1402', address: 'Dehu Road Cantonment, Pune (≈6 km from Moshi)', rating: 4.6, timing: '08:00 AM – 02:30 PM' },
  // Marathi / Semi-English
  { id: 301, name: 'Zilla Parishad Prathamik Shala, Moshi', category: 'Schools', board: 'State Board', medium: 'Marathi', grades: 'Class 1 – Class 7', phone: '+91 20 2742 0001', address: 'Moshi Gaon (Village), Old Settlement, Moshi', rating: 4.0, timing: '07:00 AM – 12:30 PM' },
  { id: 302, name: 'PCMC Municipal School No. 1, Moshi', category: 'Schools', board: 'State Board', medium: 'Marathi + Semi-English', grades: 'Class 1 – Class 7', phone: '+91 20 2742 0110', address: 'Near Moshi Bus Stop, Alandi Road, Moshi', rating: 4.1, timing: '07:00 AM – 12:30 PM' },
  { id: 303, name: 'PCMC Municipal School No. 2, Indrayani Nagar', category: 'Schools', board: 'State Board', medium: 'Marathi', grades: 'Class 1 – Class 4', phone: '+91 20 2742 0220', address: 'Indrayani Nagar, Sector 1, Moshi', rating: 4.0, timing: '07:00 AM – 12:00 PM' },
  { id: 304, name: 'Shri Vitthalrao Shinde Vidyalaya', category: 'Schools', board: 'State Board', medium: 'Marathi', grades: 'Class 1 – Class 10', phone: '+91 97663 55001', address: 'Moshi Phata, Old Village Road, Moshi', rating: 4.2, timing: '07:30 AM – 01:00 PM' },
  { id: 305, name: 'Shri Sant Dnyaneshwar Madhyamik Vidyalay', category: 'Schools', board: 'State Board', medium: 'Marathi', grades: 'Class 5 – Class 10', phone: '+91 98501 22110', address: 'Near Alandi Road, Bhosari-Moshi Junction', rating: 4.3, timing: '07:30 AM – 01:00 PM' },
  { id: 306, name: 'Mahatma Phule Vidyalaya', category: 'Schools', board: 'State Board', medium: 'Marathi', grades: 'Class 1 – Class 7', phone: '+91 99231 66780', address: 'Bhosari-Moshi Road, Near Water Tank', rating: 4.1, timing: '07:00 AM – 12:30 PM' },
  { id: 307, name: 'Savitribai Phule Prashala (PCMC)', category: 'Schools', board: 'State Board', medium: 'Marathi', grades: 'Class 1 – Class 5', phone: '+91 20 2742 0330', address: 'Pradhikaran Sector 3, Moshi', rating: 4.0, timing: '07:00 AM – 12:00 PM' },
  { id: 308, name: 'Ramchandra Gaikwad Madhyamik Vidyalaya', category: 'Schools', board: 'State Board', medium: 'Marathi', grades: 'Class 5 – Class 10', phone: '+91 96572 44009', address: 'Dighi-Moshi Road, near Dighi Chowk', rating: 4.2, timing: '07:30 AM – 01:00 PM' },
  { id: 309, name: 'Shri Shivaji Raje Vidyalaya', category: 'Schools', board: 'State Board', medium: 'Semi-English', grades: 'Class 1 – Class 10', phone: '+91 94222 78001', address: 'Chikhali-Moshi Road, Shivar Moshi', rating: 4.3, timing: '07:30 AM – 01:30 PM' },
  { id: 310, name: 'Bal Bharati Vidya Mandir', category: 'Schools', board: 'State Board', medium: 'Marathi + Semi-English', grades: 'Class 1 – Class 7', phone: '+91 98810 09900', address: 'Near Moshi Chowk, Alandi Road, Moshi', rating: 4.2, timing: '07:00 AM – 12:30 PM' }
];

const initialEmergency = [
  { name: 'Moshi Police Station', category: 'Police', phone: '020-27139100', urgency: 'High' },
  { name: 'PCMC Fire Station (Bhosari/Moshi)', category: 'Fire', phone: '020-27122101', urgency: 'High' },
  { name: 'YCM Hospital Ambulance', category: 'Ambulance', phone: '108', urgency: 'High' },
  { name: 'Women Safety Helpline (Damini Squad)', category: 'Women Helpline', phone: '1091', urgency: 'High' },
  { name: 'Child Care Helpline', category: 'Child Helpline', phone: '1098', urgency: 'Medium' },
  { name: 'MSEDCL Electricity Emergency (Moshi)', category: 'Electricity', phone: '1800-233-3435', urgency: 'Medium' },
  { name: 'MNGL Natural Gas Leakage Hotline', category: 'Gas Leakage', phone: '1800-266-1800', urgency: 'High' },
  { name: 'Disaster Management Cell PCMC', category: 'Disaster Team', phone: '020-27422222', urgency: 'High' }
];

const initialJobs = [
  { id: 'JOB-001', title: 'Store Accountant / Cashier', company: 'Spine City Supermarket', category: 'Retail', type: 'Full-time', salary: '₹18,000 - ₹22,000 / month', qualification: 'B.Com / Basic Tally / Excel knowledge', location: 'Sector 4, Spine Road, Moshi', description: 'Manage daily invoicing, checkout, billing tallies, and store inventory records. Basic training on ERP software will be provided.', datePosted: '2026-07-01', appliedCount: 4, applicants: [] },
  { id: 'JOB-002', title: 'Primary School Home Tutor', company: 'Indrayani Coaching Academy', category: 'Education', type: 'Part-time (04:00 PM - 07:00 PM)', salary: '₹6,000 - ₹8,000 / month', qualification: 'Undergraduate or Graduate / Good communication in Marathi & English', location: 'Indrayani Nagar, Moshi', description: 'Teach Mathematics, Science, and English to Class 1 to 5 students. Conduct weekly test sessions.', datePosted: '2026-07-02', appliedCount: 2, applicants: [] },
  { id: 'JOB-003', title: 'CNC Machine Operator Helper', company: 'Bhosari MIDC Engineering Co.', category: 'Technical', type: 'Full-time (Shift based)', salary: '₹15,000 - ₹19,000 / month', qualification: 'ITI / Diploma in Mechanical or fresher willing to learn CNC operations', location: 'Bhosari Industrial Estate (MIDC) - Sector 7', description: 'Load steel components onto CNC machinery, monitor coolant levels, perform deburring and basic inspection checks using micrometers.', datePosted: '2026-07-03', appliedCount: 7, applicants: [] },
  { id: 'JOB-004', title: 'Delivery Partner (Moshi Hub)', company: 'Moshi Hyperlocal Logistics', category: 'Delivery', type: 'Flexible / Gig-based', salary: '₹12,000 - ₹18,000 / month (Based on deliveries)', qualification: 'Must own a two-wheeler / Valid DL / Aadhaar Card', location: 'Moshi Chowk Hub', description: 'Pick up grocery and food delivery parcels from local merchants and deliver them to customers within a 5km radius.', datePosted: '2026-07-04', appliedCount: 12, applicants: [] }
];

const initialTraffic = [
  { id: 'TRF-001', title: 'Heavy Jam at Moshi Toll Plaza intersection', category: 'Congestion', delay: '15 mins delay', location: 'Pune-Nashik Highway Crossing, Moshi', description: 'Three trucks broke down near the bypass crossing. Traffic police are directing vehicles, but progress is very slow.', reportedBy: 'Amit Shinde', timeReported: '2026-07-04T10:30:00Z', upvotes: 8 },
  { id: 'TRF-002', title: 'Indrayani River Bridge Water-logging', category: 'Roadwork / Water', delay: '20 mins delay / Drive Slow', location: 'Indrayani River old bridge road, Moshi', description: 'Pothole patch work started on the old bridge, narrowing it to single-lane operation. Heavy rain has also logged water on the margins.', reportedBy: 'Kiran Patil', timeReported: '2026-07-04T11:15:00Z', upvotes: 14 }
];

const initialMarketplace = [
  { id: 'MKT-001', name: 'Moshi Fresh & Green Grocers', category: 'Grocery', phone: '+91 91122 33445', address: 'Shop 10, Indrayani Heights, Alandi Road, Moshi', rating: 4.7, timing: '08:00 AM - 10:00 PM', sponsored: true, offer: 'Get 10% cash discount on buying fresh farm veggies above ₹300! Code: FRESH10', reviews: [{ name: 'Sambhaji Landge', rating: 5, comment: 'Veggies are super fresh and clean, better than online portals.' }, { name: 'Minakshi Sane', rating: 4, comment: 'Good quality. They also deliver to homes nearby.' }] },
  { id: 'MKT-002', name: 'Hotel Jagdamba & Indrayani Thali', category: 'Restaurants', phone: '+91 20 2713 7777', address: 'Near Moshi Toll Plaza, Nashik Highway, Moshi', rating: 4.8, timing: '11:30 AM - 11:00 PM', sponsored: false, offer: 'Free Sweet Lassi on ordering 2 Special Veg Thalis.', reviews: [{ name: 'Kunal Deshmukh', rating: 5, comment: 'Awesome Maharashtrian veg food, pure home taste.' }] },
  { id: 'MKT-003', name: 'Shraddha Hardware & Paints', category: 'Hardware', phone: '+91 99750 11223', address: 'Moshi Chowk Market area, Moshi', rating: 4.5, timing: '09:00 AM - 08:30 PM', sponsored: false, offer: '5% discount code: PAINTS5', reviews: [{ name: 'Dilip Patil', rating: 4, comment: 'All plumbing and electrical parts available under one roof.' }] }
];

const getStoredOr = (key, fallback) => {
  const stored = localStorage.getItem(key);
  try { return stored ? JSON.parse(stored) : fallback; } catch (e) { return fallback; }
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => getStoredOr('am_user', null));
  const [complaints, setComplaints] = useState(() => getStoredOr('am_complaints', []));
  const [news] = useState(initialNews);
  const [events, setEvents] = useState(() => getStoredOr('am_events', initialEvents));
  const [directory] = useState(initialDirectory);
  const [emergency] = useState(initialEmergency);
  const [jobs, setJobs] = useState(() => getStoredOr('am_jobs', initialJobs));
  const [trafficAlerts, setTrafficAlerts] = useState(() => getStoredOr('am_traffic', initialTraffic));
  const [marketplaceShops] = useState(initialMarketplace);

  useEffect(() => { if (currentUser) { localStorage.setItem('am_user', JSON.stringify(currentUser)); } else { localStorage.removeItem('am_user'); } }, [currentUser]);
  useEffect(() => { localStorage.setItem('am_complaints', JSON.stringify(complaints)); }, [complaints]);
  useEffect(() => { localStorage.setItem('am_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('am_jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem('am_traffic', JSON.stringify(trafficAlerts)); }, [trafficAlerts]);

  const loginUser = (profileData) => setCurrentUser(profileData);
  const logoutUser = () => setCurrentUser(null);
  const switchRole = (newRole) => setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);

  const addComplaint = (newComp) => {
    const formattedId = `COMP-2026-${String(complaints.length + 1).padStart(3, '0')}`;
    let assignedKaryakarta = 'Sachin Patil';
    let department = 'Public Works Department';
    if (newComp.category === 'Garbage') { assignedKaryakarta = 'Amit Shinde'; department = 'Solid Waste Management'; }
    else if (['Water', 'Drainage', 'Sewage'].includes(newComp.category)) { assignedKaryakarta = 'Sachin Patil'; department = 'Water Supply & Sanitation'; }
    else if (['Street Light', 'Electricity'].includes(newComp.category)) { assignedKaryakarta = 'Uday Landge'; department = 'Electrical / Public Lighting'; }
    else if (['Road', 'Construction'].includes(newComp.category)) { assignedKaryakarta = 'Amit Shinde'; department = 'Road Construction & Maintenance'; }
    const complaint = { id: formattedId, ...newComp, status: 'Submitted', dateSubmitted: new Date().toISOString(), citizenName: newComp.anonymous ? 'Anonymous Citizen' : (currentUser?.name || 'Guest User'), assignedKaryakarta, department, timeline: [{ status: 'Submitted', date: new Date().toISOString(), message: 'Complaint registered successfully.' }], feedback: null };
    setComplaints(prev => [complaint, ...prev]);
    if (currentUser) { setCurrentUser(prev => ({ ...prev, points: (prev.points || 0) + 15 })); }
    return complaint;
  };

  const updateComplaintStatus = (id, newStatus, message) => { setComplaints(prev => prev.map(comp => comp.id === id ? { ...comp, status: newStatus, timeline: [...comp.timeline, { status: newStatus, date: new Date().toISOString(), message: message || `Status updated to ${newStatus}.` }] } : comp)); };
  const submitComplaintFeedback = (id, rating, comment) => { setComplaints(prev => prev.map(comp => comp.id === id ? { ...comp, feedback: { rating, comment } } : comp)); if (currentUser) { setCurrentUser(prev => ({ ...prev, points: (prev.points || 0) + 5 })); } };
  const toggleRsvp = (eventId) => { if (!currentUser) return; setEvents(prev => prev.map(evt => { if (evt.id === eventId) { const isRsvped = evt.rsvps.includes(currentUser.name); return { ...evt, rsvps: isRsvped ? evt.rsvps.filter(n => n !== currentUser.name) : [...evt.rsvps, currentUser.name] }; } return evt; })); };
  const registerAsVolunteer = (skills, availability) => { if (!currentUser) return; setCurrentUser(prev => ({ ...prev, isVolunteer: true, volunteerSkills: skills, points: (prev.points || 0) + 50, badges: prev.badges.includes('Civic Volunteer') ? prev.badges : [...prev.badges, 'Civic Volunteer'] })); };
  const addTrafficAlert = (alertData) => { const formattedId = `TRF-${String(trafficAlerts.length + 1).padStart(3, '0')}`; const newAlert = { id: formattedId, ...alertData, reportedBy: currentUser?.name || 'Anonymous Citizen', timeReported: new Date().toISOString(), upvotes: 0 }; setTrafficAlerts(prev => [newAlert, ...prev]); if (currentUser) { setCurrentUser(prev => ({ ...prev, points: (prev.points || 0) + 10 })); } };
  const upvoteTrafficAlert = (alertId) => { setTrafficAlerts(prev => prev.map(alert => alert.id === alertId ? { ...alert, upvotes: alert.upvotes + 1 } : alert)); };
  const applyToJob = (jobId) => { if (!currentUser) return; setJobs(prev => prev.map(job => { if (job.id === jobId) { if (job.applicants.includes(currentUser.name)) return job; return { ...job, appliedCount: job.appliedCount + 1, applicants: [...job.applicants, currentUser.name] }; } return job; })); setCurrentUser(prev => ({ ...prev, points: (prev.points || 0) + 10 })); };

  return (
    <AppContext.Provider value={{ currentUser, complaints, news, events, directory, emergency, jobs, trafficAlerts, marketplaceShops, loginUser, logoutUser, switchRole, addComplaint, updateComplaintStatus, submitComplaintFeedback, toggleRsvp, registerAsVolunteer, addTrafficAlert, upvoteTrafficAlert, applyToJob }}>
      {children}
    </AppContext.Provider>
  );
};
