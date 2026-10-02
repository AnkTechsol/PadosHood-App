import React, { createContext, useContext, useState } from 'react';

const SocietyContext = createContext();
export const useSociety = () => useContext(SocietyContext);

export const SocietyProvider = ({ children }) => {
  // Current logged in user
  const [currentUser, setCurrentUser] = useState({
    id: 'u1',
    name: 'Anuj Karn',
    email: 'anuj@anktechsol.com',
    role: 'Resident', // 'Resident', 'Admin', or 'SuperAdmin'
    societyId: 'soc1',
    verificationStatus: 'Pending', // 'Pending' (Guest), 'Verified'
  });

  // Multi-Tenant Societies
  const [societies, setSocieties] = useState([
    {
      id: 'soc1',
      name: 'Angaan Heights',
      code: 'ANG123',
      plan: 'Premium',
      planStatus: 'Active', // 'Active', 'Revoked'
    },
    {
      id: 'soc2',
      name: 'Green Valley',
      code: 'GRN456',
      plan: 'Basic',
      planStatus: 'Active',
    }
  ]);

  // Pricing Plans (SaaS)
  const pricingPlans = [
    { name: 'Basic', price: '₹999/mo', features: ['Up to 50 Flats', 'Notice Board', 'Forum'] },
    { name: 'Premium', price: '₹2499/mo', features: ['Up to 200 Flats', 'All Basic features', 'Complaint Tracker'] },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited Flats', 'Dedicated Support', 'White-labeling'] },
  ];

  // Pending Resident Approvals
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'pa1',
      societyId: 'soc1',
      userId: 'u1',
      name: 'Anuj Karn',
      email: 'anuj@anktechsol.com',
      block: 'Block A',
      flat: '402',
      residentType: 'Owner',
      documentUrl: 'lease_agreement.pdf'
    }
  ]);

  // Data Collections
  const [notices, setNotices] = useState([
    { id: 'n1', societyId: 'soc1', title: 'Water Supply', content: 'Maintenance tomorrow.', priority: 'Urgent', date: new Date(Date.now() - 86400000).toISOString(), readBy: [] },
  ]);

  const [forumPosts, setForumPosts] = useState([
    { id: 'p1', societyId: 'soc1', author: { name: 'Priya' }, content: 'Plumber needed.', tags: ['General'], likes: [], comments: [], date: new Date().toISOString() }
  ]);

  const [complaints, setComplaints] = useState([
    { id: 'c1', societyId: 'soc1', resident: { id: 'u2', name: 'Rahul' }, category: 'Plumbing', location: 'A-201', priority: 'High', description: 'Leak', status: 'Raised', timeline: [{ status: 'Raised', timestamp: new Date().toISOString() }], feedback: null }
  ]);

  // Helpers for Multi-Tenant Filtering
  const getActiveSociety = () => societies.find(s => s.id === currentUser.societyId);
  
  const filteredNotices = notices.filter(n => n.societyId === currentUser.societyId);
  const filteredForumPosts = forumPosts.filter(p => p.societyId === currentUser.societyId);
  const filteredComplaints = complaints.filter(c => c.societyId === currentUser.societyId);
  const filteredApprovals = pendingApprovals.filter(pa => pa.societyId === currentUser.societyId);

  // Actions
  const toggleRole = () => {
    setCurrentUser(prev => {
      if (prev.role === 'Resident') return { ...prev, role: 'Admin', verificationStatus: 'Verified' };
      if (prev.role === 'Admin') return { ...prev, role: 'SuperAdmin' };
      return { ...prev, role: 'Resident', verificationStatus: 'Pending' };
    });
  };

  // SuperAdmin Actions
  const addSociety = (name, plan) => {
    const id = `soc${Date.now()}`;
    const code = name.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 1000);
    setSocieties([...societies, { id, name, code, plan, planStatus: 'Active' }]);
  };

  const toggleSocietyStatus = (societyId) => {
    setSocieties(societies.map(s => s.id === societyId ? { ...s, planStatus: s.planStatus === 'Active' ? 'Revoked' : 'Active' } : s));
  };

  // Admin Actions
  const approveResident = (approvalId) => {
    const approval = pendingApprovals.find(pa => pa.id === approvalId);
    if (approval && approval.userId === currentUser.id) {
      setCurrentUser(prev => ({ ...prev, verificationStatus: 'Verified' }));
    }
    // Document deletion logic: The document URL is removed from the system immediately
    setPendingApprovals(pendingApprovals.filter(pa => pa.id !== approvalId));
  };

  const rejectResident = (approvalId) => {
    // Document deletion logic: The document URL is removed from the system immediately
    setPendingApprovals(pendingApprovals.filter(pa => pa.id !== approvalId));
  };

  // Resident Onboarding Actions
  const submitOnboarding = (societyCode, block, flat, type, docUrl) => {
    const soc = societies.find(s => s.code === societyCode);
    if (!soc) return false;

    setCurrentUser(prev => ({ ...prev, societyId: soc.id, verificationStatus: 'Pending' }));
    setPendingApprovals([
      ...pendingApprovals,
      { id: `pa${Date.now()}`, societyId: soc.id, userId: currentUser.id, name: currentUser.name, email: currentUser.email, block, flat, residentType: type, documentUrl: docUrl }
    ]);
    return true;
  };

  // Data Mutators
  const markNoticeRead = (id) => setNotices(notices.map(n => n.id === id ? { ...n, readBy: [...n.readBy, currentUser.id] } : n));
  const addNotice = (n) => setNotices([{ ...n, id: `n${Date.now()}`, societyId: currentUser.societyId, date: new Date().toISOString(), readBy: [] }, ...notices]);
  const addForumPost = (p) => setForumPosts([{ ...p, id: `p${Date.now()}`, societyId: currentUser.societyId, author: currentUser, likes: [], comments: [], date: new Date().toISOString() }, ...forumPosts]);
  const addComplaint = (c) => setComplaints([{ ...c, id: `c${Date.now()}`, societyId: currentUser.societyId, resident: currentUser, status: 'Raised', timeline: [{ status: 'Raised', timestamp: new Date().toISOString() }], feedback: null }, ...complaints]);
  const updateComplaintStatus = (id, status, note = '') => setComplaints(complaints.map(c => c.id === id ? { ...c, status, timeline: [...c.timeline, { status, note, timestamp: new Date().toISOString() }] } : c));
  const submitComplaintFeedback = (id, feedback) => setComplaints(complaints.map(c => c.id === id ? { ...c, feedback } : c));

  return (
    <SocietyContext.Provider value={{
      currentUser, toggleRole, getActiveSociety,
      societies, pricingPlans, addSociety, toggleSocietyStatus,
      pendingApprovals: filteredApprovals, approveResident, rejectResident, submitOnboarding,
      notices: filteredNotices, markNoticeRead, addNotice,
      forumPosts: filteredForumPosts, addForumPost,
      complaints: filteredComplaints, addComplaint, updateComplaintStatus, submitComplaintFeedback
    }}>
      {children}
    </SocietyContext.Provider>
  );
};
