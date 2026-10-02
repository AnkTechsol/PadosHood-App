import { Link } from 'wouter';

export default function Privacy() {
  return <main className="entry-policy">
    <Link href="/" className="entry-back">Back to Angaan</Link>
    <p className="entry-eyebrow">WOODSVILLE PHASE 2 · LAUNCH INFORMATION</p>
    <h1>How this portal uses data</h1>
    <div className="entry-launch"><strong>Operational explanation—not an approved privacy policy.</strong><p>The society operator, privacy/support contact, retention rules, and legal terms still need committee approval and qualified legal review before a resident rollout.</p></div>
    <h2>What the application stores</h2>
    <p>Your Clerk account identifier, display name, block/tower, flat number and Owner/Tenant selection; membership status and role; notices, complaint text and status history; and community posts. Authentication details such as email and password are managed by Clerk, not collected in the joining form.</p>
    <h2>Who can see it</h2>
    <p>Approved residents can read society notices and discussions. Residents see only their own complaints; approved administrators can see complaints and membership requests to manage the society. Pending, rejected and suspended accounts cannot access private society content.</p>
    <h2>Where data goes</h2>
    <p>Replit hosts the application and PostgreSQL records. Clerk manages sign-in. The portal does not send your messages to an AI provider or add custom analytics. Hosting region, vendor terms and transfers must be reviewed by the operator.</p>
    <h2>Export and removal</h2>
    <p>The Account section provides an export of your application membership, complaints and discussion posts, and a confirmed deletion action for those records. Official notices and minimal administrative audit records may remain. Application deletion does not delete your Clerk identity; provider-side account deletion needs to be arranged by the operator. The last committee administrator cannot delete their application membership without a replacement.</p>
    <h2>Use only necessary information</h2>
    <p>No identity-document upload, blood group, phone number or payment collection is required. Please keep documents, sensitive personal information, and other residents’ private details out of complaints and discussions. This is not an emergency-response service.</p>
    <h2>Before joining</h2>
    <p>The committee should make the final privacy notice, responsible operator, contact and retention/deletion arrangements available to residents. Until then, this portal is a pre-launch implementation, not a claim of legal compliance or operational readiness.</p>
    <Link href="/sign-up" className="entry-secondary">Return to registration</Link>
  </main>;
}