import React from 'react';

const busData = [
  { no: '348', route: 'Nigdi to Bhosari via Moshi', frequency: '20 mins', firstBus: '05:30 AM', lastBus: '11:00 PM' },
  { no: '119', route: 'Moshi to Pune Station', frequency: '30 mins', firstBus: '06:00 AM', lastBus: '10:30 PM' },
  { no: '358', route: 'Bhosari to Alandi', frequency: '15 mins', firstBus: '05:45 AM', lastBus: '11:15 PM' },
  { no: '120', route: 'Moshi to Shivaji Nagar', frequency: '25 mins', firstBus: '06:15 AM', lastBus: '10:00 PM' },
  { no: '400', route: 'Pimpri to Moshi', frequency: '40 mins', firstBus: '07:00 AM', lastBus: '09:00 PM' }
];

const BusTable = ({ searchQuery = '' }) => {
  const filteredBuses = busData.filter(b => 
    b.no.includes(searchQuery) || b.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <thead style={{ backgroundColor: 'var(--primary-light)', color: 'white' }}>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Bus No</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Route</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Frequency</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>First-Last</th>
          </tr>
        </thead>
        <tbody>
          {filteredBuses.map((bus, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--primary)' }}>{bus.no}</td>
              <td style={{ padding: '1rem' }}>{bus.route}</td>
              <td style={{ padding: '1rem' }}>{bus.frequency}</td>
              <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{bus.firstBus} - {bus.lastBus}</td>
            </tr>
          ))}
          {filteredBuses.length === 0 && (
            <tr>
              <td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>No bus routes found matching your search.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BusTable;
