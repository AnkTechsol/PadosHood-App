import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { useAuth } from '../auth/auth.context';

export const ComplaintsContext = createContext();

export const ComplaintsProvider = ({ children }) => {
  const { get, set } = useLocalStorage('am_complaints', []);
  const [complaints, setComplaints] = useState(get());
  const { currentUser, loginUser } = useAuth(); // Assume loginUser can update points if we had a proper action, here we'll just mock onPointsEarned

  const onPointsEarned = (points) => {
    if (currentUser && loginUser) {
        loginUser({ ...currentUser, points: (currentUser.points || 0) + points });
    }
  };

  useEffect(() => {
    set(complaints);
  }, [complaints, set]);

  const addComplaint = (newComp, user) => {
    const id = `COMP-2026-${Math.floor(100 + Math.random() * 900)}`;
    let assignee = '';
    let dept = '';
    
    const cat = newComp.category?.toLowerCase() || '';
    if (cat.includes('garbage')) { assignee = 'Amit Shinde'; dept = 'Solid Waste'; }
    else if (cat.includes('water') || cat.includes('drainage') || cat.includes('sewage')) { assignee = 'Sachin Patil'; dept = 'Water Supply'; }
    else if (cat.includes('light') || cat.includes('electricity')) { assignee = 'Uday Landge'; dept = 'Electrical'; }
    else if (cat.includes('road') || cat.includes('construction')) { assignee = 'Amit Shinde'; dept = 'Road Maintenance'; }
    else { assignee = 'Sachin Patil'; dept = 'Public Works'; }

    const complaint = {
      ...newComp,
      id,
      assignee,
      department: dept,
      status: 'Open',
      timeline: [{ status: 'Open', message: 'Complaint registered', date: new Date().toISOString() }],
      reportedBy: user?.name || 'Anonymous'
    };

    setComplaints(prev => [complaint, ...prev]);
    onPointsEarned(15);
  };

  const updateComplaintStatus = (id, newStatus, message) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus,
          timeline: [...c.timeline, { status: newStatus, message, date: new Date().toISOString() }]
        };
      }
      return c;
    }));
  };

  const submitComplaintFeedback = (id, rating, comment) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, feedback: { rating, comment } } : c));
    onPointsEarned(5);
  };

  return (
    <ComplaintsContext.Provider value={{ complaints, addComplaint, updateComplaintStatus, submitComplaintFeedback }}>
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintsContext);
