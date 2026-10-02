import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { useAuth } from '../auth/auth.context';

export const TransportContext = createContext();

const initialTrafficData = [
  { id: 'TRF-001', title: 'Heavy Jam at Moshi Toll Plaza', category: 'Congestion', delay: '15 mins delay', location: 'Pune-Nashik Highway Crossing', reporter: 'Amit Shinde', upvotes: 8 },
  { id: 'TRF-002', title: 'Indrayani River Bridge Water-logging', category: 'Roadwork/Water', delay: '20 mins delay', location: 'Indrayani River old bridge', reporter: 'Kiran Patil', upvotes: 14 }
];

export const TransportProvider = ({ children }) => {
  const { get, set } = useLocalStorage('am_traffic', initialTrafficData);
  const [trafficAlerts, setTrafficAlerts] = useState(get());
  const { currentUser, loginUser } = useAuth();

  const onPointsEarned = (points) => {
    if (currentUser && loginUser) {
        loginUser({ ...currentUser, points: (currentUser.points || 0) + points });
    }
  };

  useEffect(() => {
    set(trafficAlerts);
  }, [trafficAlerts, set]);

  const addTrafficAlert = (alertData, reporterName) => {
    const newAlert = {
      ...alertData,
      id: `TRF-${Math.floor(100 + Math.random() * 900)}`,
      reporter: reporterName,
      timeReported: new Date().toISOString(),
      upvotes: 0
    };
    setTrafficAlerts(prev => [newAlert, ...prev]);
    onPointsEarned(10);
  };

  const upvoteTrafficAlert = (alertId) => {
    setTrafficAlerts(prev => prev.map(a => a.id === alertId ? { ...a, upvotes: a.upvotes + 1 } : a));
  };

  return (
    <TransportContext.Provider value={{ trafficAlerts, addTrafficAlert, upvoteTrafficAlert }}>
      {children}
    </TransportContext.Provider>
  );
};

export const useTransport = () => useContext(TransportContext);
