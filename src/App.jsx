import React, { useState } from 'react';
import { useClerk, useUser } from '@clerk/react';
import { api } from './lib/api.js';
import { useResource } from './lib/useResource.js';
import {
  Account, Community, Complaints, ErrorState, LoadingState,
  Members, NavIcon, Notices, Overview,
} from './pages/society/PortalSections.jsx';
import './society.css';
import { LogOut, RefreshCw } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'notices', label: 'Notices' },
  { id: 'complaints', label: 'Maintenance' },
  { id: 'community', label: 'Community' },
  { id: 'members', label: 'Members', adminOnly: true },
  { id: 'account', label: 'Account' },
];

function MembershipForm({ initial, onSubmit, busy, error }) {
  const [form, setForm] = useState(initial || { name: '', block: '', flat: '', residentType: 'Owner' });
  const change = event => setForm(value => ({ ...value, [event.target.name]: event.target.value }));
  return <form onSubmit={event => { event.preventDefault(); onSubmit({ name: form.name.trim(), block: form.block.trim(), flat: form.flat.trim(), residentType: form.residentType }); }}>
    {error && <div className="inline-error" role="alert">{error}</div>}
    <div className="field"><label htmlFor="join-name">Your name</label><input id="join-name" name="name" autoComplete="name" required minLength="2" maxLength="100" value={form.name} onChange={change}/></div>
    <div className="form-grid"><div className="field"><label htmlFor="join-block">Block or tower</label><input id="join-block" name="block" required maxLength="40" value={form.block} onChange={change}/></div><div className="field"><label htmlFor="join-flat">Flat</label><input id="join-flat" name="flat" required maxLength="40" value={form.flat} onChange={change}/></div></div>
    <div className="field"><label htmlFor="join-type">Resident type</label><select id="join-type" name="residentType" value={form.residentType} onChange={change}><option>Owner</option><option>Tenant</option></select></div>
    <p className="field-help">Your request goes to the society committee for review. No identity documents or uploads are required.</p>
    <div className="form-footer"><button className="primary-button" disabled={busy}>{busy ? 'Sending request…' : initial ? 'Reapply for membership' : 'Request membership'}</button></div>
  </form>;
}

function PortalForUser({ user }) {
  const { signOut } = useClerk();
  const [tab, setTab] = useState('overview');
  const [submitBusy, setSubmitBusy] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [signingOut, setSigningOut] = useState(false);
  const me = useResource('/api/me');
  const health = useResource('/api/health');
  const member = me.data?.member || null;
  const identity = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || user?.fullName || '';
  const monogram = (user?.fullName || identity || 'M').trim().slice(0, 1).toUpperCase();

  const requestMembership = async body => {
    setSubmitBusy(true); setSubmitError('');
    try { await api('/api/membership', { method: 'POST', body }); me.refresh(); }
    catch (error) { setSubmitError(error?.message || 'Your request could not be sent. Please try again.'); }
    finally { setSubmitBusy(false); }
  };
  const leave = async () => {
    setSigningOut(true);
    try { await signOut({ redirectUrl: '/' }); }
    finally { setSigningOut(false); }
  };
  const title = me.data?.society?.name || 'Woodsville Phase 2';

  if (me.loading) return <div className="angaan"><div className="membership-wrap"><div className="membership-card panel"><LoadingState/></div></div></div>;
  if (me.error) return <div className="angaan"><div className="membership-wrap"><section className="membership-card panel"><div className="membership-mark"><img src="/logo.svg" alt=""/></div><div className="eyebrow">Member access</div><h1>We couldn’t check your membership.</h1><p>Society access is verified by the server. Please retry before continuing.</p><ErrorState error={me.error} retry={me.refresh}/><button className="quiet-button" onClick={me.refresh}><RefreshCw size={16}/> Retry check</button></section></div></div>;
  if (!member || member.status !== 'Approved') {
    const pending = member?.status === 'Pending';
    const rejected = member?.status === 'Rejected';
    const suspended = member?.status === 'Suspended';
    return <div className="angaan">
      <header className="society-topbar"><div className="society-brand"><img src="/logo.svg" alt=""/><div><strong>Angaan</strong><span>{title}</span></div></div><div className="top-actions"><div className="identity-chip"><span className="identity-monogram">{monogram}</span><span className="identity-name">{identity}</span></div><button className="quiet-button" disabled={signingOut} onClick={leave}><LogOut size={16}/>{signingOut?'Signing out…':'Log out'}</button></div></header>
      <main className="membership-wrap"><section className="membership-card panel">
        <div className="membership-mark"><img src="/logo.svg" alt=""/></div>
        <div className="eyebrow">Woodsville Phase 2 · Membership</div>
        {pending ? <><h1>Your request is with the committee.</h1><p>Your application is pending review. Private society notices and member features will become available after approval.</p><div className="meta-line" style={{marginBottom:20}}><span className="status-tag pending">Pending review</span>{member.name} · {member.block} · {member.flat}</div><button className="soft-button" onClick={me.refresh}><RefreshCw size={15}/> Check status</button></>
          : suspended ? <><h1>Membership access is paused.</h1><p>Your account is currently suspended from private society features. Please contact your committee through the channels you already use for society matters.</p><span className="status-tag suspended">Suspended</span><div style={{marginTop:20}}><button className="soft-button" onClick={me.refresh}><RefreshCw size={15}/> Refresh status</button></div></>
          : <><h1>{rejected ? 'Reapply for resident access.' : 'A private space for your society.'}</h1><p>{rejected ? 'Your previous request was not approved. You can submit an updated membership request for committee review.' : 'Request membership to Woodsville Phase 2. The committee reviews every request before society information becomes available.'}</p><MembershipForm key={member?.id || 'new'} initial={member ? { name: member.name, block: member.block, flat: member.flat, residentType: member.residentType } : undefined} onSubmit={requestMembership} busy={submitBusy} error={submitError}/></>}
        <p className="field-help" style={{marginTop:20}}>Read the <a href="/privacy" style={{color:'var(--forest)',fontWeight:700}}>operational privacy draft</a> before joining.</p>
        <p className="field-help" style={{ overflowWrap: 'anywhere' }}>Account reference: <code>{user.id}</code>. If you are the committee’s designated first administrator, share this reference with the portal operator. It is not a password and does not grant access by itself.</p>
      </section>
      {member && <details className="panel" style={{ padding: 24, marginTop: 24, width: '100%', maxWidth: 680 }}>
        <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Manage or remove my application data</summary>
        <div style={{ marginTop: 24 }}><Account member={member} identity={identity} onDeleted={me.refresh} /></div>
      </details>}
      </main>
    </div>;
  }

  const visibleItems = NAV_ITEMS.filter(item => !item.adminOnly || member.role === 'Admin');
  const currentTab = visibleItems.some(item => item.id === tab) ? tab : 'overview';
  let content;
  switch (currentTab) {
    case 'notices': content = <Notices member={member}/>; break;
    case 'complaints': content = <Complaints member={member}/>; break;
    case 'community': content = <Community member={member}/>; break;
    case 'members': content = <Members member={member} refreshMe={me.refresh}/>; break;
    case 'account': content = <Account member={member} identity={identity} onDeleted={me.refresh}/>; break;
    default: content = <Overview member={member} setTab={setTab}/>;
  }
  return <div className="angaan society-shell">
    <header className="society-topbar">
      <div className="society-brand"><img src="/logo.svg" alt=""/><div><strong>Angaan</strong><span>{title}</span></div></div>
      <div className="top-actions"><span className="meta-line" title={health.error ? 'Society service is unavailable' : 'Connection to society service'}><i style={{display:'inline-block',width:7,height:7,borderRadius:'50%',background:health.error?'#b7594f':health.loading?'#c4a353':'#6e9a70'}}/>{health.error?'Service issue':health.loading?'Connecting':'Connected'}</span>{health.error&&<button className="icon-button" aria-label="Retry service connection" onClick={health.refresh}><RefreshCw size={15}/></button>}<div className="identity-chip"><span className="identity-monogram">{monogram}</span><span className="identity-name">{identity}</span></div><button className="quiet-button" disabled={signingOut} onClick={leave}><LogOut size={16}/>{signingOut?'Signing out…':'Log out'}</button></div>
    </header>
    <div className="society-frame">
      <aside className="society-sidebar"><div className="side-label">Your society</div><nav className="nav-stack" aria-label="Portal navigation">{visibleItems.map(item=><button key={item.id} className={`society-nav ${currentTab===item.id?'active':''}`} aria-current={currentTab===item.id?'page':undefined} onClick={()=>setTab(item.id)}><NavIcon name={item.id}/>{item.label}</button>)}</nav><div className="sidebar-note"><strong>Neighbour-led, member-only.</strong>Only updates from this society’s committee appear here. No civic advertisements or sample resident identities.</div></aside>
      <main className="society-main">{content}</main>
    </div>
  </div>;
}

export default function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) return <div className="angaan"><div className="membership-wrap"><div className="membership-card panel"><LoadingState/></div></div></div>;
  if (!isSignedIn || !user) return <div className="angaan"><div className="membership-wrap"><section className="membership-card panel"><div className="membership-mark"><img src="/logo.svg" alt=""/></div><div className="eyebrow">Woodsville Phase 2</div><h1>Sign in to continue.</h1><p>This is the signed-in resident portal. Sign in through the site’s account flow to check your membership.</p><a href="/" className="primary-button" style={{textDecoration:'none'}}>Back to Angaan</a></section></div></div>;
  return <PortalForUser key={user.id} user={user}/>;
}
