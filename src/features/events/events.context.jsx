import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';

export const EventsContext = createContext();

const initialEvents = [
  { id: 'EVT-2026-101', title: 'Mega Blood Donation Drive', date: '2026-07-05', location: 'Sambhaji Maharaj Community Hall Moshi', category: 'Health Camp', rsvps: [] },
  { id: 'EVT-2026-102', title: 'Vrukshavalli 1000 Tree Plantation Drive', date: '2026-07-12', location: 'Indrayani Riverfront Park', category: 'Tree Plantation', rsvps: [] },
  { id: 'EVT-2026-103', title: 'Public Townhall Meeting', date: '2026-07-08', location: 'Open Theatre Moshi Chowk', category: 'Public Meetings', rsvps: [] }
];

export const EventsProvider = ({ children }) => {
  const { get, set } = useLocalStorage('am_events', initialEvents);
  const [events, setEvents] = useState(get());

  useEffect(() => {
    set(events);
  }, [events, set]);

  const toggleRsvp = (eventId, userName) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const hasRsvpd = ev.rsvps.includes(userName);
        return {
          ...ev,
          rsvps: hasRsvpd ? ev.rsvps.filter(name => name !== userName) : [...ev.rsvps, userName]
        };
      }
      return ev;
    }));
  };

  return (
    <EventsContext.Provider value={{ events, toggleRsvp }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
