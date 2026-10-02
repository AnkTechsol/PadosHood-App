import React, { createContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

export const AppContext = createContext();

const initialNews = [
  {
    id: 'news-001',
    title: 'PCMC Announces 8-Hour Water Supply Cut in Moshi & Indrayani Nagar',
    content: 'Pimpri Chinchwad Municipal Corporation (PCMC) has announced a scheduled water supply shutdown on Thursday from 9:00 AM to 5:00 PM for critical main pipeline valve repairs near Spine Road. All residents across Sector 3, 4 & 5 are requested to store adequate water in advance.',
    category: 'Water Cut',
    ward_number: 'Ward 4 & Ward 3',
    date: '2026-07-31T07:30:00Z',
    source: 'PCMC Water Works Dept',
    important: true,
    author: 'Ward Officer Desk'
  },
  {
    id: 'news-002',
    title: 'Traffic Diversion on Dehu-Alandi Road for Flyover Girder Launching',
    content: 'Traffic Police Moshi Division has issued a traffic advisory for commuters on Dehu-Alandi Road. Light vehicles will be diverted via Spine Road while heavy container trucks must use Nashik Highway bypass for 10 days during flyover girder installation.',
    category: 'Traffic',
    ward_number: 'Ward 4 (Moshi Chowk)',
    date: '2026-07-30T14:15:00Z',
    source: 'Moshi Traffic Police',
    important: false,
    author: 'Traffic Dept Moshi'
  },
  {
    id: 'news-003',
    title: 'Pre-Monsoon Tree Trimming & Power Maintenance in Moshi Sector 3 & 4',
    content: 'MSEDCL Indrayani Substation team will execute feeder maintenance and tree branch clearing along 11kV overhead lines on Saturday from 10 AM to 3 PM. Power will be restored sequentially.',
    category: 'Power Cut',
    ward_number: 'Ward 4 (Sector 3 & 4)',
    date: '2026-07-29T10:00:00Z',
    source: 'MSEDCL Moshi Desk',
    important: false,
    author: 'MSEDCL Engineer'
  },
  {
    id: 'news-004',
    title: 'Mega Health & Blood Donation Drive at Sambhaji Community Hall',
    content: 'MLA Desk and Moshi Citizen Club are holding a free multi-specialty health screening camp and blood donation drive on Sunday. Over 25 specialists from YCM Hospital will offer free check-ups.',
    category: 'Civic Event',
    ward_number: 'All Wards',
    date: '2026-07-28T09:00:00Z',
    source: 'Moshi Social Foundation',
    important: true,
    author: 'Citizen Desk'
  }
];

const initialMerchants = [
  {
    id: 'mch-001',
    business_name: 'Moshi Fresh Farmers Grocery & Dairy',
    category: 'Kirana/Groceries',
    address: 'Shop 10, Indrayani Heights, Dehu-Alandi Road, Moshi',
    phone: '+91 98220 11223',
    whatsapp_number: '919822011223',
    google_maps_url: 'https://maps.google.com/?q=Moshi+Pune',
    banner_image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    is_verified: true,
    special_offer: '10% Cash discount on fresh farm veggies above ₹300! Code: MOSHI10',
    catalog: [
      { id: 'cat-101', item_name: 'Fresh Indrayani Rice (5kg)', description: 'Locally grown premium polished Indrayani rice', price: 340, category: 'Grains', is_special: true },
      { id: 'cat-102', item_name: 'Pure Cow Ghee (500ml)', description: 'Fresh A2 farm ghee from local dairy', price: 420, category: 'Dairy', is_special: false },
      { id: 'cat-103', item_name: 'Organic Wheat Flour / Atta (10kg)', description: 'Chakki fresh whole wheat flour', price: 380, category: 'Grains', is_special: false },
      { id: 'cat-104', item_name: 'Fresh Farm Spinach & Veggies Pack', description: 'Fresh morning spinach, tomatoes, and coriander', price: 120, category: 'Vegetables', is_special: true }
    ]
  },
  {
    id: 'mch-002',
    business_name: 'Hotel Jagdamba & Indrayani Thali',
    category: 'Restaurants',
    address: 'Near Moshi Toll Plaza, Nashik Highway, Moshi',
    phone: '+91 98900 44556',
    whatsapp_number: '919890044556',
    google_maps_url: 'https://maps.google.com/?q=Moshi+Toll+Plaza',
    banner_image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    is_verified: true,
    special_offer: 'Free Sweet Lassi on ordering 2 Special Veg Thalis',
    catalog: [
      { id: 'cat-201', item_name: 'Special Puneri Veg Thali', description: '2 Puran Poli / Chapati, Pithla Bhakri, Amti, Rice & Solkadhi', price: 210, category: 'Thalis', is_special: true },
      { id: 'cat-202', item_name: 'Pithla Bhakri Combo', description: 'Hot Jowar Bhakri served with Authentic Garlic Pithla & Thecha', price: 130, category: 'Maharashtrian', is_special: false },
      { id: 'cat-203', item_name: 'Special Shev Bhaji', description: 'Spicy Khandeshi gravy with crunchy ratlami shev', price: 160, category: 'Main Course', is_special: false },
      { id: 'cat-204', item_name: 'Ukdiche Modak (2 pcs)', description: 'Steamed rice flour modak filled with fresh coconut & jaggery', price: 90, category: 'Dessert', is_special: true }
    ]
  },
  {
    id: 'mch-003',
    business_name: 'Spine Road Electricals & Hardware',
    category: 'Electronics & Hardware',
    address: 'Shop 4, Spine City Mall Complex, Sector 4, Moshi',
    phone: '+91 99210 55667',
    whatsapp_number: '919921055667',
    google_maps_url: 'https://maps.google.com/?q=Spine+City+Mall+Moshi',
    banner_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    is_verified: true,
    special_offer: 'Free home delivery of heavy electrical tools in Moshi',
    catalog: [
      { id: 'cat-301', item_name: 'Havells Smart LED Batten 20W', description: 'Energy saving bright white tube light with 2-year warranty', price: 280, category: 'Lighting', is_special: false },
      { id: 'cat-302', item_name: 'Orient Electric 3-Blade Ceiling Fan', description: 'High speed copper motor fan in elegant brown finish', price: 1850, category: 'Appliances', is_special: true },
      { id: 'cat-303', item_name: 'Heavy Duty Extension Board (4 Plug)', description: 'Surge protection heavy copper wire socket', price: 450, category: 'Electrical', is_special: false }
    ]
  },
  {
    id: 'mch-004',
    business_name: 'Suhani Bakery & Pure Milk Dairy',
    category: 'Dairy & Bakery',
    address: 'Moshi Chowk, Opp. Bus Stop, Moshi',
    phone: '+91 97650 88990',
    whatsapp_number: '919765088990',
    google_maps_url: 'https://maps.google.com/?q=Moshi+Chowk',
    banner_image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    is_verified: true,
    special_offer: 'Buy 1kg Fresh Paneer, Get 200g Butter Free!',
    catalog: [
      { id: 'cat-401', item_name: 'Fresh Cow Milk (1 Litre Packet)', description: 'Chilled pure milk delivered twice daily', price: 56, category: 'Dairy', is_special: false },
      { id: 'cat-402', item_name: 'Fresh Homemade Malai Paneer (500g)', description: 'Soft & creamy unpasteurized fresh paneer', price: 190, category: 'Dairy', is_special: true },
      { id: 'cat-403', item_name: 'Chocolate Truffle Birthday Cake (1/2 kg)', description: 'Eggless freshly baked rich chocolate cake', price: 400, category: 'Bakery', is_special: true }
    ]
  }
];

const initialBloodDonors = [
  { id: 'bd-1', full_name: 'Sachin Patil', blood_group: 'O+', locality: 'Sector 4, Moshi Pradhikaran', phone: '+91 98221 99001', is_available: true, last_donated: '4 months ago' },
  { id: 'bd-2', full_name: 'Pooja Deshmukh', blood_group: 'A+', locality: 'Indrayani Nagar, Moshi', phone: '+91 99230 44112', is_available: true, last_donated: '6 months ago' },
  { id: 'bd-3', full_name: 'Rohan Landge', blood_group: 'B+', locality: 'Moshi Gaon Chowk', phone: '+91 91580 33221', is_available: true, last_donated: '2 months ago' },
  { id: 'bd-4', full_name: 'Amit Shinde', blood_group: 'AB+', locality: 'Spine Road, Moshi', phone: '+91 97660 11998', is_available: true, last_donated: '5 months ago' },
  { id: 'bd-5', full_name: 'Vikram Sane', blood_group: 'O-', locality: 'Sector 3, Moshi', phone: '+91 94220 88776', is_available: true, last_donated: '3 months ago' },
  { id: 'bd-6', full_name: 'Sneha Kulkarni', blood_group: 'AB-', locality: 'Woodsville Township, Moshi', phone: '+91 98811 22334', is_available: true, last_donated: '7 months ago' }
];

const initialTradesmen = [
  { id: 'trd-1', full_name: 'Kiran Patil Plumbing Services', trade_category: 'Plumber', phone: '+91 91580 88990', whatsapp_number: '919158088990', locality: 'Moshi & Indrayani Nagar', rating: 4.8, hourly_rate: '₹250 / visit', reviews_count: 34, experience: '8 years' },
  { id: 'trd-2', full_name: 'Shripad Joshi Electrical Works', trade_category: 'Electrician', phone: '+91 99210 12345', whatsapp_number: '919921012345', locality: 'Sector 1-6 & Spine Road', rating: 4.7, hourly_rate: '₹200 / visit', reviews_count: 29, experience: '10 years' },
  { id: 'trd-3', full_name: 'Deepak Washing Machine & AC Repair', trade_category: 'Appliance Repair', phone: '+91 98223 99887', whatsapp_number: '919822399887', locality: 'All Moshi PCMC Area', rating: 4.9, hourly_rate: '₹300 inspection', reviews_count: 45, experience: '6 years' },
  { id: 'trd-4', full_name: 'Ganesh Furniture & Carpenter', trade_category: 'Carpenter', phone: '+91 97650 33445', whatsapp_number: '919765033445', locality: 'Pradhikaran & Moshi Phata', rating: 4.6, hourly_rate: '₹350 / visit', reviews_count: 18, experience: '12 years' },
  { id: 'trd-5', full_name: 'Mauli Domestic Help Agency', trade_category: 'Domestic Help / Maid', phone: '+91 98810 55667', whatsapp_number: '919881055667', locality: 'Sector 3 & Sector 4 Moshi', rating: 4.8, hourly_rate: '₹2,500 / month', reviews_count: 52, experience: '5 years' }
];

const initialCommunityPosts = [
  { id: 'post-1', author_name: 'Moshi Residents Association', title: 'Sunday Organic Farmers Market at Spine Road', content: 'Fresh organic vegetables directly from Junnar & Khed farmers will be sold at Spine City Open Ground this Sunday from 7 AM to 1 PM. Support local farmers!', category: 'event', ward_number: 'Ward 4', upvotes: 24, created_at: '2026-07-30T09:00:00Z', image_url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80' },
  { id: 'post-2', author_name: 'Rahul Gawali (Sector 4)', title: 'FOUND: Black Leather Wallet near Moshi Bus Stop', content: 'Found a black wallet containing Aadhaar Card belonging to Mahesh Thorat. Please contact via reply or collect from Moshi Police Desk.', category: 'lost_found', ward_number: 'Ward 4', upvotes: 18, created_at: '2026-07-31T08:15:00Z', image_url: null },
  { id: 'post-3', author_name: 'PCMC Ward Officer Desk', title: 'Property Tax Rebate 5% Extended till August 15', content: 'Citizens paying PCMC property tax online via Paytm or PCMC Portal will get an additional 5% early bird rebate. Take advantage before the deadline.', category: 'civic', ward_number: 'All Moshi Wards', upvotes: 42, created_at: '2026-07-29T11:30:00Z', image_url: null }
];

const pcmcWardSchedules = {
  'Ward 4 (Moshi Pradhikaran)': {
    water: 'Morning: 06:15 AM - 08:45 AM (Daily)',
    waterStatus: 'Normal Supply',
    garbageWet: 'Daily Morning 07:30 AM - 09:30 AM',
    garbageDry: 'Tuesday & Friday 08:00 AM - 10:00 AM',
    corporator: 'Sambhaji Landge (MLA Desk / Ward Rep)',
    helpline: '020-27425511'
  },
  'Ward 3 (Moshi Gaon & Indrayani)': {
    water: 'Morning: 06:00 AM - 08:30 AM (Daily)',
    waterStatus: 'Normal Supply',
    garbageWet: 'Daily Morning 08:00 AM - 10:00 AM',
    garbageDry: 'Monday & Thursday 08:30 AM - 10:30 AM',
    corporator: 'Vasant Sane (Ward Rep Desk)',
    helpline: '020-27425512'
  },
  'Ward 5 (Spine Road & Sector 6)': {
    water: 'Morning: 06:30 AM - 09:00 AM (Daily)',
    waterStatus: 'Maintenance Scheduled on Thursday',
    garbageWet: 'Daily Morning 07:45 AM - 09:45 AM',
    garbageDry: 'Wednesday & Saturday 08:00 AM - 10:00 AM',
    corporator: 'Minakshi Landge (Ward Rep Desk)',
    helpline: '020-27425513'
  }
};

const getStoredOr = (key, fallback) => {
  const stored = localStorage.getItem(key);
  try { return stored ? JSON.parse(stored) : fallback; } catch (e) { return fallback; }
};

export const AppProvider = ({ children }) => {
  // Default to Guest Mode if no user is saved
  const [currentUser, setCurrentUser] = useState(() => getStoredOr('am_user', {
    isGuest: true,
    name: 'Guest Citizen',
    phone: '',
    role: 'Citizen',
    pcmcWard: 'Ward 4 (Moshi Pradhikaran)',
    bloodGroup: '',
    points: 15,
    badges: ['Civic Explorer']
  }));

  const [language, setLanguage] = useState(() => localStorage.getItem('am_lang') || 'en');
  const [news, setNews] = useState(() => getStoredOr('am_news', initialNews));
  const [merchants, setMerchants] = useState(() => getStoredOr('am_merchants', initialMerchants));
  const [bloodDonors, setBloodDonors] = useState(() => getStoredOr('am_donors', initialBloodDonors));
  const [tradesmen] = useState(initialTradesmen);
  const [communityPosts, setCommunityPosts] = useState(() => getStoredOr('am_posts', initialCommunityPosts));
  const [complaints, setComplaints] = useState(() => getStoredOr('am_complaints', [
    {
      id: 'COMP-2026-001',
      category: 'Street Light',
      address: 'Near Spine City Mall, Sector 4, Moshi',
      description: '3 street lights are non-functional for past 3 days creating darkness on main road.',
      priority: 'High',
      status: 'In Progress',
      dateSubmitted: '2026-07-28T10:00:00Z',
      citizenName: 'Amit Shinde',
      assignedKaryakarta: 'Uday Landge',
      department: 'Electrical / Public Lighting',
      timeline: [
        { status: 'Submitted', date: '2026-07-28T10:00:00Z', message: 'Complaint registered with PCMC Moshi Ward Officer.' },
        { status: 'Under Inspection', date: '2026-07-28T14:30:00Z', message: 'Inspection assigned to Junior Engineer Uday Landge.' },
        { status: 'In Progress', date: '2026-07-29T09:00:00Z', message: 'Replacement bulbs & wiring team dispatched to site.' }
      ],
      feedback: null
    },
    {
      id: 'COMP-2026-002',
      category: 'Water Pipeline Leakage',
      address: 'Dehu-Alandi Road near Moshi Phata',
      description: 'Major water pipeline leak wasting drinking water on roadside.',
      priority: 'High',
      status: 'Resolved',
      dateSubmitted: '2026-07-26T08:15:00Z',
      citizenName: 'Sachin Patil',
      assignedKaryakarta: 'Sachin Patil (Water Dept)',
      department: 'Water Supply & Sanitation',
      timeline: [
        { status: 'Submitted', date: '2026-07-26T08:15:00Z', message: 'Complaint registered successfully.' },
        { status: 'Under Inspection', date: '2026-07-26T10:00:00Z', message: 'Leakage verified by Water Dept Inspector.' },
        { status: 'In Progress', date: '2026-07-26T12:30:00Z', message: 'Main valve isolated and clamp pipe repair initiated.' },
        { status: 'Resolved', date: '2026-07-27T11:00:00Z', message: 'Pipeline repaired and water supply tested normal.' }
      ],
      resolutionNote: 'Main 6-inch GI line joint replaced. Pressure restored.',
      feedback: { rating: 5, comment: 'Quick action by PCMC team within 24 hours!' }
    }
  ]));

  useEffect(() => {
    localStorage.setItem('am_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('am_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('am_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('am_merchants', JSON.stringify(merchants));
  }, [merchants]);

  useEffect(() => {
    localStorage.setItem('am_donors', JSON.stringify(bloodDonors));
  }, [bloodDonors]);

  useEffect(() => {
    localStorage.setItem('am_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('am_complaints', JSON.stringify(complaints));
  }, [complaints]);

  // Translation helper function
  const t = (key) => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  // News publishing system
  const addNewsItem = (newsData) => {
    const newItem = {
      id: `news-${Date.now()}`,
      date: new Date().toISOString(),
      author: currentUser.name || 'PCMC Official Desk',
      source: newsData.source || 'Aaple Moshi Civic Desk',
      important: Boolean(newsData.important),
      ...newsData
    };
    setNews(prev => [newItem, ...prev]);
    return newItem;
  };

  // Auth & Profile actions
  const loginUser = (profileData) => {
    setCurrentUser({
      ...profileData,
      isGuest: false,
      points: profileData.points || 50,
      badges: profileData.badges || ['Verified Citizen']
    });
  };

  const logoutUser = () => {
    setCurrentUser({
      isGuest: true,
      name: 'Guest Citizen',
      phone: '',
      role: 'Citizen',
      pcmcWard: 'Ward 4 (Moshi Pradhikaran)',
      bloodGroup: '',
      points: 0,
      badges: []
    });
  };

  const updateUserProfile = (fields) => {
    setCurrentUser(prev => ({ ...prev, ...fields }));
  };

  // Merchant Self-Onboarding
  const addMerchant = (newMerchantData) => {
    const newMerchant = {
      id: `mch-${Date.now()}`,
      rating: 5.0,
      is_verified: true,
      catalog: newMerchantData.catalog || [],
      ...newMerchantData
    };
    setMerchants(prev => [newMerchant, ...prev]);
    return newMerchant;
  };

  const addCatalogItem = (merchantId, newItem) => {
    setMerchants(prev => prev.map(mch => {
      if (mch.id === merchantId) {
        const catalog = mch.catalog || [];
        return { ...mch, catalog: [...catalog, { id: `cat-${Date.now()}`, ...newItem }] };
      }
      return mch;
    }));
  };

  // Blood Donor Registration
  const registerAsBloodDonor = (donorInfo) => {
    const newDonor = {
      id: `bd-${Date.now()}`,
      full_name: donorInfo.full_name || currentUser.name,
      blood_group: donorInfo.blood_group,
      locality: donorInfo.locality || currentUser.pcmcWard,
      phone: donorInfo.phone || currentUser.phone || '+91 98000 00000',
      is_available: true,
      last_donated: 'Recently Registered'
    };
    setBloodDonors(prev => [newDonor, ...prev]);
    updateUserProfile({ is_blood_donor: true, bloodGroup: donorInfo.blood_group });
  };

  // Community Post creation
  const addCommunityPost = (postData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author_name: currentUser.name || 'Citizen',
      upvotes: 1,
      created_at: new Date().toISOString(),
      ...postData
    };
    setCommunityPosts(prev => [newPost, ...prev]);
    updateUserProfile({ points: (currentUser.points || 0) + 10 });
  };

  const upvoteCommunityPost = (postId) => {
    setCommunityPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  // Civic Complaint filing
  const addComplaint = (newComp) => {
    const formattedId = `COMP-2026-${String(complaints.length + 1).padStart(3, '0')}`;
    let assignedKaryakarta = 'Sachin Patil';
    let department = 'Public Works Department';
    if (newComp.category === 'Garbage Overflow / Sanitation') { assignedKaryakarta = 'Amit Shinde'; department = 'Solid Waste Management'; }
    else if (['Water Pipeline Leakage', 'Drainage & Sewage Blockage'].includes(newComp.category)) { assignedKaryakarta = 'Sachin Patil'; department = 'Water Supply & Sanitation'; }
    else if (['Street Light / Electricity'].includes(newComp.category)) { assignedKaryakarta = 'Uday Landge'; department = 'Electrical / Public Lighting'; }
    else if (['Road & Potholes'].includes(newComp.category)) { assignedKaryakarta = 'Amit Shinde'; department = 'Road Construction & Maintenance'; }
    
    const complaint = {
      id: formattedId,
      ...newComp,
      status: 'Submitted',
      dateSubmitted: new Date().toISOString(),
      citizenName: newComp.anonymous ? 'Anonymous Citizen' : (currentUser?.name || 'Guest User'),
      assignedKaryakarta,
      department,
      timeline: [{ status: 'Submitted', date: new Date().toISOString(), message: 'Complaint registered with PCMC Moshi Ward Desk.' }]
    };

    setComplaints(prev => [complaint, ...prev]);
    updateUserProfile({ points: (currentUser.points || 0) + 15 });
    return complaint;
  };

  // Interactive Status Update System for Complaints
  const updateComplaintStatus = (id, newStatus, officerNote = '', proofImage = null) => {
    setComplaints(prev => prev.map(comp => {
      if (comp.id === id) {
        const newTimelineEntry = {
          status: newStatus,
          date: new Date().toISOString(),
          message: officerNote || `Complaint status updated to ${newStatus} by PCMC Ward Desk.`,
          proofImage: proofImage || null
        };
        return {
          ...comp,
          status: newStatus,
          resolutionNote: newStatus === 'Resolved' ? (officerNote || 'Issue inspected and fixed.') : comp.resolutionNote,
          timeline: [...(comp.timeline || []), newTimelineEntry]
        };
      }
      return comp;
    }));
  };

  // Submit Feedback on Resolved Complaint
  const submitComplaintFeedback = (id, rating, comment) => {
    setComplaints(prev => prev.map(comp => comp.id === id ? { ...comp, feedback: { rating, comment } } : comp));
    updateUserProfile({ points: (currentUser.points || 0) + 10 });
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      language,
      setLanguage,
      t,
      news,
      merchants,
      bloodDonors,
      tradesmen,
      communityPosts,
      complaints,
      pcmcWardSchedules,
      loginUser,
      logoutUser,
      updateUserProfile,
      addNewsItem,
      addMerchant,
      addCatalogItem,
      registerAsBloodDonor,
      addCommunityPost,
      upvoteCommunityPost,
      addComplaint,
      updateComplaintStatus,
      submitComplaintFeedback
    }}>
      {children}
    </AppContext.Provider>
  );
};
