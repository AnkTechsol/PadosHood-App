import { Link } from 'wouter';
import { ArrowRight, Building2, ClipboardList, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Landing() {
  return <div className="entry-page">
    <header className="entry-header">
      <Link href="/" className="entry-brand"><img src="/logo.svg" alt="Angaan" /><span>WOODSVILLE PHASE 2</span></Link>
      <Link href="/sign-in" className="entry-signin">Resident sign in <ArrowRight size={16} /></Link>
    </header>
    <main className="entry-main">
      <div className="entry-eyebrow"><Building2 size={16} /> Woodsville Phase 2</div>
      <h1>A place for<br />our community.</h1>
      <p className="entry-intro">Official updates, everyday concerns, and conversations with neighbours. Angaan brings your society together in one resident portal.</p>
      <div className="entry-actions">
        <Link href="/sign-up" className="entry-primary">Request resident access <ArrowRight size={18} /></Link>
        <Link href="/sign-in" className="entry-secondary">I already have an account</Link>
      </div>
      <p className="entry-note"><ShieldCheck size={16} /> Society content is available only after committee approval.</p>
      <section className="entry-features" aria-label="Resident services">
        <article><ClipboardList size={24} /><h2>Stay informed</h2><p>Read notices published by your society committee.</p></article>
        <article><Building2 size={24} /><h2>Get concerns addressed</h2><p>Raise a maintenance complaint and follow its status.</p></article>
        <article><MessageSquare size={24} /><h2>Connect with neighbours</h2><p>Share updates and discussions within your community.</p></article>
      </section>
      <section className="entry-launch">
        <h2>Preparing for resident launch</h2>
        <p>The committee must appoint an administrator and approve the privacy, support, and operating arrangements before inviting residents. Please don’t submit sensitive documents, health details, or financial information.</p>
      </section>
    </main>
    <footer className="entry-footer"><span>Angaan · Woodsville Phase 2</span><Link href="/privacy">Data use &amp; launch information</Link></footer>
  </div>;
}