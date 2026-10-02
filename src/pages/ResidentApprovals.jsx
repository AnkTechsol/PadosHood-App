import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { UserCheck, Trash2, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function ResidentApprovals() {
  const { pendingApprovals, approveResident, rejectResident } = useSociety();

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
          Pending Registrations
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
          Review and approve residents for your society. Documents are auto-deleted after action.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {pendingApprovals.map(req => (
          <div key={req.id} className="card" style={{ borderLeft: '4px solid var(--primary)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'var(--primary-light)', color: 'white', padding: '0.2rem 1rem', fontSize: '0.75rem', fontWeight: 'bold', borderBottomLeftRadius: '8px' }}>
              NEW
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: '0 0 0.2rem 0' }}>{req.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{req.email}</div>
                
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  <span>🏢 {req.block} - {req.flat}</span>
                  <span>👤 {req.residentType}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid var(--border)', display: 'inline-flex' }}>
                  <FileText size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>{req.documentUrl}</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--danger)', marginTop: '0.4rem', fontWeight: '600' }}>
                  <Trash2 size={12} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> Document will be permanently deleted on approval/rejection.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', minWidth: '140px' }}>
                <button className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => approveResident(req.id)}>
                  <CheckCircle size={16} /> Approve
                </button>
                <button className="btn btn-secondary" style={{ justifyContent: 'center', color: 'var(--danger)' }} onClick={() => rejectResident(req.id)}>
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}

        {pendingApprovals.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border)' }}>
            <UserCheck size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <p style={{ margin: 0 }}>No pending registrations.</p>
          </div>
        )}
      </div>
    </div>
  );
}
