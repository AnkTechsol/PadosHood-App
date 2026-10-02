import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { get, set, remove } = useLocalStorage('am_user', null);
  const [currentUser, setCurrentUser] = useState(get());

  useEffect(() => {
    if (currentUser) {
      set(currentUser);
    } else {
      remove();
    }
  }, [currentUser, set, remove]);

  const loginUser = (profileData) => {
    const user = { ...profileData, points: profileData.points || 0, badges: profileData.badges || [] };
    setCurrentUser(user);
    set(user);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    remove();
  };

  const switchRole = (newRole) => {
    setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);
  };

  const registerAsVolunteer = (skills, availability) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const updated = {
        ...prev,
        isVolunteer: true,
        volunteerSkills: skills,
        volunteerAvailability: availability,
        points: (prev.points || 0) + 50,
        badges: [...(prev.badges || []), 'Civic Volunteer']
      };
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser, switchRole, registerAsVolunteer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
