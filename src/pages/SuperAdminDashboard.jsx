import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { Building2, ShieldAlert, CheckCircle, CreditCard, PlusCircle, X } from 'lucide-react';

export default function SuperAdminDashboard() {
  const { societies, pricingPlans, addSociety, toggleSocietyStatus } = useSociety();
  
  const [activeTab, setActiveTab] = useState('Societies');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSoc, setNewSoc] = useState({ name: '', plan: 'Premium' });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addSociety(newSoc.name, newSoc.plan);
    setShowAddModal(false);
    setNewSoc({ name: '', plan: 'Premium' });
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
            SuperAdmin Command Center
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
            Manage SaaS tenants, active plans, and global settings.
          </p>
        </div>
        
        {activeTab === 'Societies' && (
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <PlusCircle size={18} /> Onboard New Society
          </button>
        )}
      </div>

      <div className="no-scrollbar" style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <button
          style={{
            background: 'none', border: 'none', padding: '0.5rem 1rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
            borderBottom: activeTab === 'Societies' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'Societies' ? 'var(--primary)' : 'var(--text-muted)'
          }}
          onClick={() => setActiveTab('Societies')}
        >
          <Building2 size={16} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'text-bottom' }}/> 
          Registered Societies
        </button>
        <button
          style={{
            background: 'none', border: 'none', padding: '0.5rem 1rem', fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
            borderBottom: activeTab === 'Pricing' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'Pricing' ? 'var(--primary)' : 'var(--text-muted)'
          }}
          onClick={() => setActiveTab('Pricing')}
        >
          <CreditCard size={16} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'text-bottom' }}/> 
          SaaS Pricing Plans
        </button>
      </div>

      {activeTab === 'Societies' && (
        <div style={{ overflowX: 'auto', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Society Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Join Code</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Plan Tier</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {societies.map(soc => (
                <tr key={soc.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--primary-dark)' }}>{soc.name}</td>
                  <td style={{ padding: '1rem' }}><span className="badge badge-assigned" style={{ letterSpacing: '1px' }}>{soc.code}</span></td>
                  <td style={{ padding: '1rem' }}>{soc.plan}</td>
                  <td style={{ padding: '1rem' }}>
                    {soc.planStatus === 'Active' ? (
                      <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '600' }}><CheckCircle size={16}/> Active</span>
                    ) : (
                      <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '600' }}><ShieldAlert size={16}/> Revoked</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button 
                      className={`btn ${soc.planStatus === 'Active' ? 'btn-secondary' : 'btn-primary'}`} 
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      onClick={() => toggleSocietyStatus(soc.id)}
                    >
                      {soc.planStatus === 'Active' ? 'Revoke Access' : 'Restore Access'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Pricing' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {pricingPlans.map(plan => (
            <div key={plan.name} className="card glass-panel" style={{ textAlign: 'center', borderTop: '4px solid var(--primary)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>{plan.name}</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1.5rem' }}>{plan.price}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {plan.features.map(f => (
                  <li key={f} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <CheckCircle size={14} color="var(--success)" /> {f}
                  </li>
                ))}
              </ul>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Edit Plan</button>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>Onboard New Society</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label className="form-label">Society Name</label>
                <input type="text" className="form-input" value={newSoc.name} onChange={e => setNewSoc({...newSoc, name: e.target.value})} required placeholder="e.g. Angaan Heights" />
              </div>
              <div className="form-group">
                <label className="form-label">Pricing Tier</label>
                <select className="form-select" value={newSoc.plan} onChange={e => setNewSoc({...newSoc, plan: e.target.value})}>
                  {pricingPlans.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>Create & Generate Code</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
