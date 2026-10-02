import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { useAuth } from '../auth/auth.context';

export const OpportunitiesContext = createContext();

const initialJobs = [
  { id: 'JOB-001', title: 'Store Accountant/Cashier', company: 'Spine City Supermarket', category: 'Retail', type: 'Full-time', salary: '₹18000-22000/month', requirement: 'B.Com/Tally', location: 'Sector 4 Spine Road Moshi', appliedCount: 4, applicants: [] },
  { id: 'JOB-002', title: 'Primary School Home Tutor', company: 'Indrayani Coaching Academy', category: 'Education', type: 'Part-time 4-7pm', salary: '₹6000-8000/month', requirement: 'Graduate/Marathi+English', location: 'Indrayani Nagar Moshi', appliedCount: 2, applicants: [] },
  { id: 'JOB-003', title: 'CNC Machine Operator Helper', company: 'Bhosari MIDC Engineering Co', category: 'Technical', type: 'Full-time shift', salary: '₹15000-19000/month', requirement: 'ITI/Diploma Mechanical', location: 'Bhosari MIDC Sector 7', appliedCount: 7, applicants: [] },
  { id: 'JOB-004', title: 'Delivery Partner Moshi Hub', company: 'Moshi Hyperlocal Logistics', category: 'Delivery', type: 'Flexible/Gig', salary: '₹12000-18000/month', requirement: 'Two-wheeler+DL+Aadhaar', location: 'Moshi Chowk Hub', appliedCount: 12, applicants: [] }
];

export const OpportunitiesProvider = ({ children }) => {
  const { get, set } = useLocalStorage('am_jobs', initialJobs);
  const [jobs, setJobs] = useState(get());
  const { currentUser, loginUser } = useAuth();

  const onPointsEarned = (points) => {
    if (currentUser && loginUser) {
        loginUser({ ...currentUser, points: (currentUser.points || 0) + points });
    }
  };

  useEffect(() => {
    set(jobs);
  }, [jobs, set]);

  const applyToJob = (jobId, userName) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId && !job.applicants.includes(userName)) {
        onPointsEarned(10);
        return { ...job, applicants: [...job.applicants, userName], appliedCount: job.appliedCount + 1 };
      }
      return job;
    }));
  };

  return (
    <OpportunitiesContext.Provider value={{ jobs, applyToJob }}>
      {children}
    </OpportunitiesContext.Provider>
  );
};

export const useOpportunities = () => useContext(OpportunitiesContext);
