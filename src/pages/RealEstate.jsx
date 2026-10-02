import React, { useState } from 'react';
import { Search, MapPin, IndianRupee, CalendarDays, PhoneCall, BedDouble, ChevronLeft, Building, CheckCircle2, ExternalLink } from 'lucide-react';
import { projectsData } from '../data/projects';

const RealEstate = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Filters state
  const [bhkFilter, setBhkFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('');
  const [possessionFilter, setPossessionFilter] = useState('');

  // Filter logic
  const filteredProjects = projectsData.filter((project) => {
    if (!project.isActive) return false;
    
    if (bhkFilter !== 'all' && !project.bhkOptions.includes(parseInt(bhkFilter))) {
      return false;
    }

    if (priceFilter) {
      if (priceFilter === 'under-50' && project.startingPrice >= 50) return false;
      if (priceFilter === '50-75' && (project.startingPrice < 50 || project.startingPrice > 75)) return false;
      if (priceFilter === '75-100' && (project.startingPrice < 75 || project.startingPrice > 100)) return false;
      if (priceFilter === 'above-100' && project.startingPrice <= 100) return false;
    }

    if (possessionFilter) {
      if (possessionFilter === 'ready' && project.possessionDate !== 'Ready to Move') return false;
      if (possessionFilter === '2025' && !project.possessionDate.includes('2025')) return false;
      if (possessionFilter === '2026' && !project.possessionDate.includes('2026')) return false;
      if (possessionFilter === '2027+' && !project.possessionDate.includes('2027') && !project.possessionDate.includes('2028')) return false;
    }

    return true;
  });

  // Render Detail View
  if (selectedProject) {
    const project = selectedProject;
    return (
      <div style={{ paddingBottom: '3rem' }}>
        <button 
          onClick={() => setSelectedProject(null)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: 'bold' }}
        >
          <ChevronLeft size={20} /> Back to Listings
        </button>

        <div style={{ position: 'relative', height: '300px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '2rem' }}>
          <img src={project.images[0]} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: 'white' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {project.isNewLaunch && <span style={{ background: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>New Launch</span>}
              {project.isUnderConstruction ? (
                <span style={{ background: '#f59e0b', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>Under Construction</span>
              ) : (
                <span style={{ background: '#10b981', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>Ready to Move</span>
              )}
            </div>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>{project.name}</h1>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>
              <MapPin size={18} /> {project.fullAddress}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Overview */}
            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', marginBottom: '1rem' }}>
                <Building size={20} color="var(--primary)" /> Project Overview
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Possession</p><p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold' }}>{project.possessionDate}</p></div>
                <div><p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Units</p><p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold' }}>{project.totalUnits}</p></div>
                <div><p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Area</p><p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold' }}>{project.totalAcres} Acres</p></div>
                <div><p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>RERA</p><p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold', fontSize: '0.8rem', wordBreak: 'break-all' }}>{project.reraNumber}</p></div>
              </div>
            </div>

            {/* Configurations */}
            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Configurations</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {project.bhkOptions.includes(1) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <h3 style={{ margin: 0, color: 'var(--primary)' }}>1 BHK</h3>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{project.size1bhkMin} - {project.size1bhkMax} sq.ft.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>₹{project.price1bhkMin} - {project.price1bhkMax} L</p>
                    </div>
                  </div>
                )}
                {project.bhkOptions.includes(2) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <h3 style={{ margin: 0, color: 'var(--primary)' }}>2 BHK</h3>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{project.size2bhkMin} - {project.size2bhkMax} sq.ft.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>₹{project.price2bhkMin} - {project.price2bhkMax} L</p>
                    </div>
                  </div>
                )}
                {project.bhkOptions.includes(3) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <h3 style={{ margin: 0, color: 'var(--primary)' }}>3 BHK</h3>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{project.size3bhkMin} - {project.size3bhkMax} sq.ft.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>₹{project.price3bhkMin} - {project.price3bhkMax} L</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Amenities */}
            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Amenities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {project.amenities.map((amenity, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={18} color="#10b981" />
                    <span style={{ fontSize: '0.9rem' }}>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Contact Card */}
            <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', position: 'sticky', top: '2rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Starting from</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', margin: '0 0 1.5rem 0' }}>₹{project.startingPrice} Lakh*</p>
              
              <a href={`tel:${project.contactPhone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 'bold', marginBottom: '1rem' }}>
                <PhoneCall size={20} /> Call {project.contactPhone}
              </a>
              
              {project.googleMapsLink && (
                <a href={project.googleMapsLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 'bold' }}>
                  <ExternalLink size={20} /> View on Map
                </a>
              )}
              
              <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Marketed by</p>
                <p style={{ fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>{project.builderName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render List View
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--primary-dark)' }}>Real Estate</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-muted)' }}>Find new flats & projects in Moshi</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Search size={18} color="var(--primary)" />
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Filters:</span>
        </div>
        
        <select value={bhkFilter} onChange={(e) => setBhkFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-main)' }}>
          <option value="all">All BHKs</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
        </select>
        
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-main)' }}>
          <option value="">Any Price</option>
          <option value="under-50">Under ₹50 L</option>
          <option value="50-75">₹50 L - ₹75 L</option>
          <option value="75-100">₹75 L - ₹1 Cr</option>
          <option value="above-100">Above ₹1 Cr</option>
        </select>
        
        <select value={possessionFilter} onChange={(e) => setPossessionFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-main)' }}>
          <option value="">Any Possession</option>
          <option value="ready">Ready to Move</option>
          <option value="2025">By 2025</option>
          <option value="2026">By 2026</option>
          <option value="2027+">By 2027+</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredProjects.length > 0 ? filteredProjects.map(project => (
          <div key={project.id} onClick={() => setSelectedProject(project)} style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, boxShadow 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ position: 'relative', height: '200px' }}>
              <img src={project.images[0]} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {project.isNewLaunch && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#2563eb', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  New Launch
                </div>
              )}
            </div>
            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--text-main)' }}>{project.name}</h3>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <MapPin size={14} /> {project.locality}
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><BedDouble size={16} color="var(--primary)" /> {project.bhkOptions.join(', ')} BHK</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CalendarDays size={16} color="var(--primary)" /> {project.possessionDate}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Starting from</p>
                  <p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}><IndianRupee size={16} /> {project.startingPrice} L</p>
                </div>
                <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: 'bold', cursor: 'pointer' }}>Details</button>
              </div>
            </div>
          </div>
        )) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <Search size={40} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ margin: '0 0 0.5rem 0' }}>No projects found</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealEstate;
