import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../shared/context/AppContext';
import { searchAll } from './search.engine';
import SearchBar from './components/SearchBar';
import ResultGroup from './components/ResultGroup';
import { Search, Sparkles } from 'lucide-react';

const SearchPage = ({ setActiveTab }) => {
  const { schools, directoryListings, complaints, news, events, jobs, marketplaceShops, emergency } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const res = searchAll(query, {
        schools,
        directoryListings,
        complaints,
        news,
        events,
        jobs,
        marketplaceShops,
        emergencyContacts: emergency
      });
      setResults(res);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, schools, directoryListings, complaints, news, events, jobs, marketplaceShops, emergency]);

  const totalResults = results.reduce((acc, g) => acc + g.results.length, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Search size={24} color="var(--primary-light)" /> Global Flat Search
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
          Search across all civic modules — schools, complaints, news, events, jobs, shops, and emergency numbers in one click.
        </p>
      </div>

      <SearchBar value={query} onChange={setQuery} placeholder="Search schools by board, complaints by area, jobs by title..." autoFocus />

      {query.length >= 2 && (
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          Found {totalResults} result{totalResults !== 1 ? 's' : ''} across {results.length} category{results.length !== 1 ? 'ies' : ''} for "{query}"
        </div>
      )}

      {query.length < 2 && (
        <div className="card" style={{ backgroundColor: 'var(--bg-main)', border: '1px dashed var(--border)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-dark)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={14} color="var(--accent)" /> Try searching for:
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['CBSE Schools', 'Garbage', 'Blood Donation', 'CNC Operator', 'Police Station', 'Indrayani Nagar'].map(chip => (
              <button
                key={chip}
                onClick={() => setQuery(chip)}
                style={{
                  fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '99px',
                  border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)',
                  color: 'var(--primary-dark)', cursor: 'pointer', fontWeight: '600'
                }}
              >
                🔍 {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No civic records found matching "{query}". Try checking your spelling or search a broader area.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {results.map((group, idx) => (
          <ResultGroup key={idx} group={group} setActiveTab={setActiveTab} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
