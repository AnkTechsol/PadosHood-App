import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function ComplaintStepper({ complaint }) {
  const steps = ['Raised', 'Assigned', 'Resolved', 'Closed'];
  
  const currentStepIndex = steps.indexOf(complaint.status);
  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

  const progressPercent = (activeIndex / (steps.length - 1)) * 100;

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', marginTop: '1rem', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        <span>Status: <strong style={{ color: 'var(--primary-dark)' }}>{complaint.status}</strong></span>
      </div>

      {/* Progress Bar Track */}
      <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '99px', position: 'relative', marginBottom: '1rem' }}>
        <div style={{ 
          width: `${progressPercent}%`, 
          height: '100%', 
          backgroundColor: complaint.status === 'Closed' ? 'var(--success)' : 'var(--primary)', 
          borderRadius: '99px',
          transition: 'width 0.4s ease-in-out' 
        }} />
      </div>

      {/* Stepper Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600' }}>
        {steps.map((step, idx) => {
          const isCompleted = idx <= activeIndex;
          const isCurrent = idx === activeIndex;
          return (
            <div key={step} style={{ 
              color: isCurrent ? 'var(--primary-dark)' : (isCompleted ? 'var(--primary)' : 'var(--text-muted)'),
              flex: 1,
              position: 'relative',
              textAlign: idx === 0 ? 'left' : idx === steps.length - 1 ? 'right' : 'center'
            }}>
              {step}
            </div>
          );
        })}
      </div>

      {/* Timeline Logs */}
      <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Update History
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {complaint.timeline.map((log, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem' }}>
              <CheckCircle size={14} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} />
              <div>
                <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{log.status}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  {new Date(log.timestamp).toLocaleString()}
                </span>
                {log.note && <div style={{ color: 'var(--text-muted)', marginTop: '0.1rem' }}>Note: {log.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
