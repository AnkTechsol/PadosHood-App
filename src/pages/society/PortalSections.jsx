import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../lib/api.js';
import { useResource } from '../../lib/useResource.js';
import {
  ArrowDownToLine, ArrowLeft, ArrowRight, Bell, ChevronRight,
  CircleHelp, FileText, MessageSquareText, Pencil, Plus, ShieldCheck,
  Trash2, Users, Wrench, X,
} from 'lucide-react';

const PAGE_SIZE = 20;
const CATEGORIES = ['Plumbing', 'Electrical', 'Cleaning', 'Security', 'Common areas', 'Other'];
const STATUSES = ['Raised', 'InProgress', 'Resolved', 'Closed'];
const textOf = error => error?.message || 'Something went wrong. Please try again.';
const dateOf = value => value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '';

export function ErrorState({ error, retry }) {
  return <div className="error-box" role="alert"><strong>Could not load this information.</strong> {textOf(error)} <button className="text-action" onClick={retry}>Try again</button></div>;
}
export function LoadingState() { return <div className="list-stack" aria-label="Loading"><div className="loading-skeleton"/><div className="loading-skeleton"/></div>; }
export function EmptyState({ title, children, action }) {
  return <div className="state-card"><h2>{title}</h2><div className="state-description">{children}</div>{action}</div>;
}
export function PageHeading({ eyebrow, title, subtitle, action }) {
  return <header className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</header>;
}
export function Pagination({ offset, setOffset, hasMore, itemCount }) {
  return <div className="pagination"><span>{itemCount ? `Showing ${offset + 1}–${offset + itemCount}` : 'No items on this page'}</span><div><button className="soft-button small-button" disabled={offset === 0} onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}><ArrowLeft size={14}/> Previous</button><button className="soft-button small-button" disabled={!hasMore} onClick={() => setOffset(offset + PAGE_SIZE)}>Next <ArrowRight size={14}/></button></div></div>;
}
function Dialog({ title, subtitle, onClose, children }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement;
    const node = dialogRef.current;
    const selectors = 'button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),a[href]';
    node?.querySelector(selectors)?.focus();
    const keyboard = event => {
      if (event.key === 'Escape') onCloseRef.current();
      if (event.key !== 'Tab') return;
      const focusable = [...node.querySelectorAll(selectors)];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    node?.addEventListener('keydown', keyboard);
    return () => { node?.removeEventListener('keydown', keyboard); previous?.focus(); };
  }, []);
  return <div className="dialog-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><section ref={dialogRef} className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><header className="dialog-head"><div><h2 id="dialog-title">{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={18}/></button></header>{children}</section></div>;
}
function NoticeForm({ initial, onSubmit, busy, error, onClose }) {
  const [form, setForm] = useState(initial || { title: '', content: '', priority: 'General' });
  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  return <form onSubmit={e => { e.preventDefault(); onSubmit({ title: form.title.trim(), content: form.content.trim(), priority: form.priority }); }}>
    {error && <div className="inline-error" role="alert">{error}</div>}
    <div className="field"><label htmlFor="notice-title">Notice title</label><input id="notice-title" name="title" required minLength="3" maxLength="160" value={form.title} onChange={change}/></div>
    <div className="field"><label htmlFor="notice-priority">Priority</label><select id="notice-priority" name="priority" value={form.priority} onChange={change}><option>General</option><option>Urgent</option></select></div>
    <div className="field"><label htmlFor="notice-content">Official update</label><textarea id="notice-content" name="content" required minLength="5" maxLength="5000" value={form.content} onChange={change}/></div>
    <div className="form-footer"><button type="button" className="soft-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={busy}>{busy ? 'Saving…' : initial ? 'Save changes' : 'Publish notice'}</button></div>
  </form>;
}

export function Overview({ member, setTab }) {
  const noticeResource = useResource('/api/notices?limit=20&offset=0');
  const complaintResource = useResource('/api/complaints?limit=20&offset=0');
  const notices = noticeResource.data?.items || [];
  const complaints = complaintResource.data?.items || [];
  const urgent = notices.filter(n => n.priority === 'Urgent').length;
  const open = complaints.filter(c => c.status === 'Raised' || c.status === 'InProgress').length;
  return <>
    <section className="welcome-panel"><div className="welcome-copy"><div className="eyebrow">Woodsville Phase 2 · Residents’ portal</div><h1>A good place starts<br/>with being heard.</h1><p>Official society updates and a clear way to raise maintenance concerns. Built for this community, by this community.</p></div></section>
    <div className="home-grid">
      <section className="panel panel-pad"><div className="section-title"><h2>Latest official notices</h2><button className="text-action" onClick={() => setTab('notices')}>All notices <ChevronRight size={14}/></button></div>
        {noticeResource.loading ? <LoadingState/> : noticeResource.error ? <ErrorState error={noticeResource.error} retry={noticeResource.refresh}/> : notices.length ? notices.slice(0, 3).map(n => <article className="notice-row" key={n.id}><div className="meta-line"><span className={`priority-tag ${n.priority === 'Urgent' ? 'urgent' : ''}`}>{n.priority}</span><time>{dateOf(n.createdAt)}</time></div><h3>{n.title}</h3><p>{n.content}</p></article>) : <EmptyState title="No notices yet">Committee updates will appear here when published.</EmptyState>}
      </section>
      <aside className="panel panel-pad"><div className="section-title"><h2>Your shortcuts</h2><span className="eyebrow" style={{margin:0}}>Private to members</span></div>
        <div className="quick-list">
          <button className="quick-link" onClick={() => setTab('complaints')}><span className="quick-link-icon"><Wrench size={18}/></span><span><strong>Maintenance requests</strong><small>{complaintResource.loading ? 'Checking your requests' : complaintResource.error ? 'Refresh to see your requests' : `${open} open on this page`}</small></span></button>
          <button className="quick-link" onClick={() => setTab('community')}><span className="quick-link-icon"><MessageSquareText size={18}/></span><span><strong>Neighbourhood conversation</strong><small>Read and share with members</small></span></button>
          {member.role === 'Admin' && <button className="quick-link" onClick={() => setTab('members')}><span className="quick-link-icon"><Users size={18}/></span><span><strong>Membership desk</strong><small>Review resident access</small></span></button>}
        </div>
        {!complaintResource.loading && !complaintResource.error && <p className="field-help" style={{marginTop:14}}>{complaints.length ? `Showing the latest ${complaints.length} items on your first page.` : 'You have not submitted a maintenance request.'}</p>}
        {urgent > 0 && <p className="field-help" style={{marginTop:12}}>{urgent} urgent {urgent === 1 ? 'notice' : 'notices'} on the latest notice page.</p>}
      </aside>
    </div>
    <div className="society-footer">Society-owned space · No civic advertisements · Private member access</div>
  </>;
}

export function Notices({ member }) {
  const [offset, setOffset] = useState(0);
  const [dialog, setDialog] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const resource = useResource(`/api/notices?limit=${PAGE_SIZE}&offset=${offset}`);
  const items = resource.data?.items || [];
  const save = async payload => {
    setBusy(true); setError('');
    try { await api(dialog.notice ? `/api/notices/${dialog.notice.id}` : '/api/notices', { method: dialog.notice ? 'PATCH' : 'POST', body: payload }); setDialog(null); resource.refresh(); }
    catch (e) { setError(textOf(e)); } finally { setBusy(false); }
  };
  const remove = async notice => {
    if (!window.confirm(`Delete “${notice.title}”? This cannot be undone.`)) return;
    setError(''); setBusy(true);
    try { await api(`/api/notices/${notice.id}`, { method: 'DELETE' }); resource.refresh(); }
    catch (e) { setError(textOf(e)); } finally { setBusy(false); }
  };
  return <>
    <PageHeading eyebrow="Society bulletin" title="Official notices" subtitle="Updates published by the Woodsville Phase 2 committee." action={member.role === 'Admin' && <button className="primary-button" onClick={() => {setError('');setDialog({});}}><Plus size={17}/> Publish notice</button>}/>
    {error && <div className="error-box" role="alert">{error}</div>}
    {resource.loading ? <LoadingState/> : resource.error ? <ErrorState error={resource.error} retry={resource.refresh}/> : items.length ? <><div className="list-stack">{items.map(n => <article className="panel item-card" key={n.id}><div className="item-top"><div><div className="meta-line"><span className={`priority-tag ${n.priority === 'Urgent' ? 'urgent' : ''}`}>{n.priority}</span><time>{dateOf(n.createdAt)}</time>{n.updatedAt !== n.createdAt && <span>Updated {dateOf(n.updatedAt)}</span>}</div><h3 style={{marginTop:10}}>{n.title}</h3></div>{member.role === 'Admin' && <div className="row-actions"><button className="icon-button" aria-label={`Edit ${n.title}`} onClick={() => {setError('');setDialog({notice:n});}}><Pencil size={16}/></button><button className="icon-button" aria-label={`Delete ${n.title}`} disabled={busy} onClick={() => remove(n)}><Trash2 size={16}/></button></div>}</div><p>{n.content}</p></article>)}</div><Pagination offset={offset} setOffset={setOffset} hasMore={resource.data.hasMore} itemCount={items.length}/></> : <EmptyState title="The notice board is clear">Official society announcements will be shared here.</EmptyState>}
    {dialog && <Dialog title={dialog.notice ? 'Edit notice' : 'Publish an official notice'} subtitle="This update will be visible to approved residents." onClose={() => setDialog(null)}><NoticeForm initial={dialog.notice} onSubmit={save} busy={busy} error={error} onClose={() => setDialog(null)}/></Dialog>}
  </>;
}

function ComplaintForm({ initial, onSubmit, busy, error, onClose }) {
  const [form,setForm]=useState(initial ? {title:initial.title,description:initial.description,category:initial.category,priority:initial.priority} : {title:'',description:'',category:'Other',priority:'Normal'});
  const change=e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
  return <form onSubmit={e=>{e.preventDefault();onSubmit({...form,title:form.title.trim(),description:form.description.trim()});}}>
    {error && <div className="inline-error" role="alert">{error}</div>}
    <div className="field"><label htmlFor="complaint-title">What needs attention?</label><input id="complaint-title" name="title" required minLength="3" maxLength="160" value={form.title} onChange={change} placeholder="For example, water leak near the stairwell"/></div>
    <div className="form-grid"><div className="field"><label htmlFor="complaint-category">Category</label><select id="complaint-category" name="category" value={form.category} onChange={change}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div><div className="field"><label htmlFor="complaint-priority">Priority</label><select id="complaint-priority" name="priority" value={form.priority} onChange={change}><option>Normal</option><option>High</option></select></div></div>
    <div className="field"><label htmlFor="complaint-description">Details and location</label><textarea id="complaint-description" name="description" required minLength="5" maxLength="5000" value={form.description} onChange={change} placeholder="Describe the concern and where it is happening."/></div>
    <p className="field-help">No photos or attachments are accepted in this portal.</p>
    <div className="form-footer"><button type="button" className="soft-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={busy}>{busy?'Saving…':initial?'Save changes':'Send request'}</button></div>
  </form>;
}
function ComplaintAdminForm({ complaint, onSubmit, busy, error, onClose }) {
  const [status,setStatus]=useState(complaint.status); const [note,setNote]=useState('');
  return <form onSubmit={e=>{e.preventDefault();onSubmit({status,note:note.trim()});}}>
    {error && <div className="inline-error" role="alert">{error}</div>}
    <div className="field"><label htmlFor="admin-status">Request status</label><select id="admin-status" value={status} onChange={e=>setStatus(e.target.value)}>{STATUSES.map(s=><option key={s} value={s}>{s==='InProgress'?'In progress':s}</option>)}</select></div>
    <div className="field"><label htmlFor="status-note">Timeline note (optional)</label><textarea id="status-note" maxLength="1000" value={note} onChange={e=>setNote(e.target.value)} placeholder="Share an update for the resident."/></div>
    <div className="form-footer"><button type="button" className="soft-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={busy}>{busy?'Updating…':'Update status'}</button></div>
  </form>;
}
export function Complaints({ member }) {
  const [offset,setOffset]=useState(0);const [dialog,setDialog]=useState(null);const [busy,setBusy]=useState(false);const [error,setError]=useState('');
  const resource=useResource(`/api/complaints?limit=${PAGE_SIZE}&offset=${offset}`);const items=resource.data?.items||[];
  const mutate=async (method, complaint, body) => {
    setBusy(true);setError('');
    try { await api(complaint?`/api/complaints/${complaint.id}`:'/api/complaints',{method,body});setDialog(null);resource.refresh(); }
    catch(e){setError(textOf(e));}finally{setBusy(false);}
  };
  const remove=async c=>{if(!window.confirm(`Delete “${c.title}”? This cannot be undone.`))return;mutate('DELETE',c);};
  return <>
    <PageHeading eyebrow="Maintenance desk" title={member.role==='Admin'?'Maintenance concerns':'Your maintenance concerns'} subtitle={member.role==='Admin'?'Review resident requests and share progress in their timeline.':'Raise an issue for the committee and follow its status.'} action={member.role!=='Admin'&&<button className="primary-button" onClick={()=>{setError('');setDialog({});}}><Plus size={17}/> New request</button>}/>
    {error && <div className="error-box" role="alert">{error}</div>}
    {resource.loading?<LoadingState/>:resource.error?<ErrorState error={resource.error} retry={resource.refresh}/>:items.length?<><div className="list-stack">{items.map(c=>{const own=c.memberId===member.id;return <article className="panel item-card" key={c.id}><div className="item-top"><div><div className="meta-line"><span className={`status-tag ${c.status.toLowerCase()}`}>{c.status==='InProgress'?'In progress':c.status}</span><span className={`status-tag ${c.priority.toLowerCase()}`}>{c.priority} priority</span><span>{c.category}</span></div><h3 style={{marginTop:10}}>{c.title}</h3></div>{((member.role==='Admin')|| (own&&c.status==='Raised'))&&<div className="row-actions">{member.role==='Admin'?<button className="soft-button small-button" onClick={()=>{setError('');setDialog({adminComplaint:c});}}>Update status</button>:<><button className="icon-button" aria-label={`Edit ${c.title}`} onClick={()=>{setError('');setDialog({complaint:c});}}><Pencil size={16}/></button><button className="icon-button" aria-label={`Delete ${c.title}`} disabled={busy} onClick={()=>remove(c)}><Trash2 size={16}/></button></>}</div>}</div><p>{c.description}</p><div className="meta-line" style={{marginTop:11}}><span>{c.location || 'Location not specified'}</span><time>{dateOf(c.createdAt)}</time>{member.role==='Admin'&&<span>Raised by {c.residentName}</span>}</div>{c.timeline?.length>0&&<div className="timeline">{c.timeline.map((t,i)=><div className="timeline-entry" key={`${t.createdAt}-${i}`}><strong>{t.status==='InProgress'?'In progress':t.status}</strong> · {dateOf(t.createdAt)}{t.note&&<div>{t.note}</div>}</div>)}</div>}</article>;})}</div><Pagination offset={offset} setOffset={setOffset} hasMore={resource.data.hasMore} itemCount={items.length}/></>:<EmptyState title={member.role==='Admin'?'No concerns on this page':'Nothing raised yet'} action={member.role!=='Admin'&&<button className="primary-button" onClick={()=>setDialog({})}><Plus size={16}/> Raise a concern</button>}>{member.role==='Admin'?'Resident maintenance requests will appear here.':'Start with a clear description of what needs attention.'}</EmptyState>}
    {dialog?.complaint&&<Dialog title="Edit your request" subtitle="Residents can edit or remove a request while its status is Raised." onClose={()=>setDialog(null)}><ComplaintForm initial={dialog.complaint} onSubmit={body=>mutate('PATCH',dialog.complaint,body)} busy={busy} error={error} onClose={()=>setDialog(null)}/></Dialog>}
    {dialog?.adminComplaint&&<Dialog title="Update request" subtitle={`${dialog.adminComplaint.title} · ${dialog.adminComplaint.residentName}`} onClose={()=>setDialog(null)}><ComplaintAdminForm complaint={dialog.adminComplaint} onSubmit={body=>mutate('PATCH',dialog.adminComplaint,body)} busy={busy} error={error} onClose={()=>setDialog(null)}/></Dialog>}
    {dialog&&!dialog.complaint&&!dialog.adminComplaint&&<Dialog title="Raise a maintenance concern" subtitle="Only you and the committee can see your request." onClose={()=>setDialog(null)}><ComplaintForm onSubmit={body=>mutate('POST',null,body)} busy={busy} error={error} onClose={()=>setDialog(null)}/></Dialog>}
  </>;
}

function PostForm({ initial, onSubmit, busy, error, onClose }) {
  const [content,setContent]=useState(initial?.content||'');
  return <form onSubmit={e=>{e.preventDefault();onSubmit({content:content.trim()});}}>{error&&<div className="inline-error" role="alert">{error}</div>}<div className="field"><label htmlFor="post-content">Your message</label><textarea id="post-content" required minLength="2" maxLength="3000" value={content} onChange={e=>setContent(e.target.value)} placeholder="Start a useful conversation with your neighbours."/></div><div className="form-footer"><button type="button" className="soft-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={busy}>{busy?'Saving…':initial?'Save post':'Share with members'}</button></div></form>;
}
export function Community({ member }) {
  const [offset,setOffset]=useState(0);const [dialog,setDialog]=useState(null);const [busy,setBusy]=useState(false);const [error,setError]=useState('');
  const resource=useResource(`/api/posts?limit=${PAGE_SIZE}&offset=${offset}`);const posts=resource.data?.items||[];
  const save=async body=>{setBusy(true);setError('');try{await api(dialog.post?`/api/posts/${dialog.post.id}`:'/api/posts',{method:dialog.post?'PATCH':'POST',body});setDialog(null);resource.refresh();}catch(e){setError(textOf(e));}finally{setBusy(false);}};
  const remove=async post=>{if(!window.confirm('Delete this discussion post? This cannot be undone.'))return;setBusy(true);setError('');try{await api(`/api/posts/${post.id}`,{method:'DELETE'});resource.refresh();}catch(e){setError(textOf(e));}finally{setBusy(false);}};
  return <>
    <PageHeading eyebrow="Member conversation" title="Community" subtitle="A place for neighbours to share useful updates and talk with one another." action={<button className="primary-button" onClick={()=>{setError('');setDialog({});}}><Plus size={17}/> Start a discussion</button>}/>
    {error&&<div className="error-box" role="alert">{error}</div>}
    {resource.loading?<LoadingState/>:resource.error?<ErrorState error={resource.error} retry={resource.refresh}/>:posts.length?<><div className="list-stack">{posts.map(p=><article className="panel item-card" key={p.id}><div className="item-top"><div className="member-person"><span className="avatar">{(p.authorName||'?').trim().slice(0,1).toUpperCase()}</span><div><strong>{p.authorName}</strong><small>{dateOf(p.createdAt)}{p.updatedAt!==p.createdAt?' · edited':''}</small></div></div>{(p.memberId===member.id||member.role==='Admin')&&<div className="row-actions">{p.memberId===member.id&&<button className="icon-button" aria-label="Edit your post" onClick={()=>{setError('');setDialog({post:p});}}><Pencil size={16}/></button>}<button className="icon-button" aria-label="Delete post" disabled={busy} onClick={()=>remove(p)}><Trash2 size={16}/></button></div>}</div><p>{p.content}</p></article>)}</div><Pagination offset={offset} setOffset={setOffset} hasMore={resource.data.hasMore} itemCount={posts.length}/></>:<EmptyState title="A quiet conversation so far"><button className="text-action" onClick={()=>setDialog({})}>Share the first post <ChevronRight size={14}/></button></EmptyState>}
    {dialog&&<Dialog title={dialog.post?'Edit your post':'Start a discussion'} subtitle="Posts are visible to approved society members." onClose={()=>setDialog(null)}><PostForm initial={dialog.post} onSubmit={save} busy={busy} error={error} onClose={()=>setDialog(null)}/></Dialog>}
  </>;
}

export function Members({ member, refreshMe }) {
  const [offset, setOffset] = useState(0);
  const [busyId, setBusyId] = useState('');
  const [actionError, setActionError] = useState('');
  const resource = useResource(`/api/members?limit=${PAGE_SIZE}&offset=${offset}`);
  const members = resource.data?.items || [];
  const canManageAdmins = member.isSuperAdmin === true;
  const apply = async (target, patch, description) => {
    if (target.role === 'SuperAdmin') {
      setActionError('The Super Admin account cannot be changed from this page.');
      return;
    }
    if (!canManageAdmins && target.role === 'Admin') {
      setActionError('Only the Super Admin can change an administrator account.');
      return;
    }
    if (target.userId === member.userId && patch.status === 'Approved' && target.status !== 'Approved') {
      setActionError('You cannot approve your own membership.');
      return;
    }
    if (!window.confirm(`${description} ${target.name}?`)) return;
    setBusyId(target.id);
    setActionError('');
    try {
      await api(`/api/members/${target.id}`, { method: 'PATCH', body: patch });
      resource.refresh();
      refreshMe();
    } catch (error) {
      setActionError(textOf(error));
    } finally {
      setBusyId('');
    }
  };
  const renderActions = memberRecord => {
    const isProtected = memberRecord.role === 'SuperAdmin';
    const canReview = !isProtected && (memberRecord.role !== 'Admin' || canManageAdmins);
    return <div className="row-actions">
      {canReview && memberRecord.status === 'Pending' && <>
        <button className="primary-button small-button" disabled={!!busyId} onClick={() => apply(memberRecord, { status: 'Approved' }, 'Approve access for')}>Approve</button>
        <button className="soft-button small-button" disabled={!!busyId} onClick={() => apply(memberRecord, { status: 'Rejected' }, 'Reject request from')}>Reject</button>
      </>}
      {canReview && memberRecord.status === 'Rejected' && <button className="primary-button small-button" disabled={!!busyId} onClick={() => apply(memberRecord, { status: 'Approved' }, 'Approve access for')}>Approve</button>}
      {canReview && memberRecord.status === 'Approved' && <button className="soft-button small-button" disabled={!!busyId} onClick={() => apply(memberRecord, { status: 'Suspended' }, 'Suspend access for')}>Suspend</button>}
      {canReview && memberRecord.status === 'Suspended' && <button className="primary-button small-button" disabled={!!busyId} onClick={() => apply(memberRecord, { status: 'Approved' }, 'Resume access for')}>Resume</button>}
      {canManageAdmins && memberRecord.role === 'Resident' && memberRecord.status === 'Approved' && <button className="soft-button small-button" disabled={!!busyId} onClick={() => apply(memberRecord, { role: 'Admin' }, 'Promote to committee administrator:')}>Make admin</button>}
      {canManageAdmins && memberRecord.role === 'Admin' && <button className="soft-button small-button" disabled={!!busyId} onClick={() => apply(memberRecord, { role: 'Resident' }, 'Remove administrator access for')}>Remove admin</button>}
    </div>;
  };
  return <>
    <PageHeading
      eyebrow={canManageAdmins ? 'Society administration' : 'Committee workspace'}
      title="Membership"
      subtitle={canManageAdmins
        ? 'Review joining requests and appoint or suspend administrator accounts.'
        : 'Review resident joining requests and manage approved access.'}
    />
    {actionError&&<div className="error-box" role="alert">{actionError}</div>}
    {resource.loading ? <LoadingState/> : resource.error ? <ErrorState error={resource.error} retry={resource.refresh}/>
      : members.length ? <>
        <section className="panel" aria-label="Society members">
          {members.map(m => <article className="member-row" key={m.id}>
            <div className="member-person">
              <span className="avatar">{m.name.trim().slice(0, 1).toUpperCase()}</span>
              <div><strong>{m.name}</strong><small>{m.block} · {m.flat} · {m.residentType}</small></div>
            </div>
            <div><span className={`status-tag ${m.status.toLowerCase()}`}>{m.status}</span></div>
            <div><span className="status-tag">{m.role === 'SuperAdmin' ? 'Super Admin' : m.role}</span></div>
            {renderActions(m)}
          </article>)}
        </section>
        <Pagination offset={offset} setOffset={setOffset} hasMore={resource.data.hasMore} itemCount={members.length}/>
      </> : <EmptyState title="No member records on this page">Membership requests from residents will appear here.</EmptyState>}
  </>;
}

export function Account({ member, identity, onDeleted }) {
  const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [message,setMessage]=useState('');
  const exportData=async()=>{
    setBusy(true);setError('');setMessage('');
    try{const data=await api('/api/account/export');const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='angaan-account-export.json';document.body.append(link);link.click();link.remove();URL.revokeObjectURL(url);setMessage('Your export has been downloaded.');}
    catch(e){setError(textOf(e));}finally{setBusy(false);}
  };
  const removeAccount=async()=>{
    const confirmed=window.confirm('Delete your Angaan membership and your application data? This removes your membership, complaints and posts from this society service. It does not delete your Clerk sign-in identity. This cannot be undone.');
    if(!confirmed)return;
    setBusy(true);setError('');setMessage('');
    try{await api('/api/account',{method:'DELETE'});onDeleted();}
    catch(e){setError(textOf(e));}finally{setBusy(false);}
  };
  return <>
    <PageHeading eyebrow="Your details" title="Account" subtitle="Review the identity and society information attached to this portal account."/>
    {error&&<div className="error-box" role="alert">{error}</div>}{message&&<div className="inline-error" style={{color:'#426849',background:'#e4efe1',borderColor:'#d4e5d0'}} role="status">{message}</div>}
    <section className="panel panel-pad"><div className="section-title"><h2>Portal profile</h2><span className="status-tag approved">{member.status}</span></div><div className="account-grid"><div className="account-detail"><span>Display name</span><strong>{member.name}</strong></div><div className="account-detail"><span>Sign-in identity</span><strong>{identity||'Provided by Clerk'}</strong></div><div className="account-detail"><span>Residence</span><strong>{member.block} · {member.flat}</strong></div><div className="account-detail"><span>Resident type</span><strong>{member.residentType}</strong></div><div className="account-detail"><span>Society role</span><strong>{member.isSuperAdmin ? 'Super Admin' : member.role}</strong></div></div><button className="soft-button" onClick={exportData} disabled={busy}><ArrowDownToLine size={16}/>{busy?'Preparing…':'Download my data'}</button></section>
    {member.isSuperAdmin
      ? <section className="panel panel-pad" style={{marginTop:18}}>
        <h2>Protected administrator account</h2>
        <p>Super Admin access cannot be removed from this page. Contact the authorized operator to transfer it to another verified account.</p>
      </section>
      : <section className="panel panel-pad account-danger" style={{marginTop:18}}>
        <h2>Delete application account</h2>
        <p>This permanently deletes your Angaan membership and your own complaints and community posts from the application. It does not delete your Clerk identity or sign-in credentials. To request provider-side identity deletion, contact the service operator.</p>
        <button className="danger-button" onClick={removeAccount} disabled={busy}><Trash2 size={16}/>{busy?'Working…':'Delete my Angaan data'}</button>
      </section>}
  </>;
}

export function NavIcon({ name }) {
  const icons={overview:ShieldCheck,notices:Bell,complaints:Wrench,community:MessageSquareText,members:Users,account:CircleHelp};
  const Icon=icons[name]||FileText;
  return <Icon aria-hidden="true"/>;
}