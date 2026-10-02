import React, { useContext } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import { Calendar, MapPin, Users, Check } from 'lucide-react';

const Events = () => {
  const { events, currentUser, toggleRsvp } = useContext(AppContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Calendar size={24} color="var(--primary-light)" /> Civic Events & RSVPs
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {events.map(evt => {
          const isRsvped = currentUser && evt.rsvps.includes(currentUser.name);
          return (
            <div key={evt.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              {evt.banner && <img src={evt.banner} alt={evt.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }} />}
              <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: '0.25rem' }}>{evt.category}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>{evt.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{evt.description}</p>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
                <div><Calendar size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />{evt.date} · {evt.time}</div>
                <div><MapPin size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />{evt.location}</div>
                <div><Users size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />{evt.rsvps.length} attending</div>
              </div>
              <button onClick={() => toggleRsvp(evt.id)} className={'btn ' + (isRsvped ? 'btn-secondary' : 'btn-primary')} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                {isRsvped ? <><Check size={14}/> Attending</> : 'RSVP Now (+5 Pts)'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
