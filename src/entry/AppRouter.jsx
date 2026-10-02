import { ClerkProvider, SignIn, SignUp, Show, useUser } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { Router as WouterRouter, Route, Switch, Redirect, useLocation, Link } from 'wouter';
import App from '../App.jsx';
import Landing from './Landing.jsx';
import Privacy from './Privacy.jsx';

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
if (!clerkPubKey) throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');

function stripBase(path) {
  return basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;
}

const appearance = {
  theme: 'simple',
  options: {
    logoPlacement: 'inside',
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: '#294a3e',
    colorForeground: '#253b32',
    colorMutedForeground: '#617169',
    colorBackground: '#ffffff',
    colorInput: '#ffffff',
    colorInputForeground: '#253b32',
    colorDanger: '#a03c31',
    colorNeutral: '#617169',
    fontFamily: 'system-ui, sans-serif',
    borderRadius: '0.75rem',
  },
  elements: {
    cardBox: { backgroundColor: '#fff', width: '440px', maxWidth: '100%' },
    headerTitle: { color: '#253b32' },
    headerSubtitle: { color: '#617169' },
    socialButtonsBlockButtonText: { color: '#253b32' },
    formFieldLabel: { color: '#253b32' },
    footerActionLink: { color: '#294a3e' },
    footerActionText: { color: '#617169' },
    dividerText: { color: '#617169' },
    alertText: { color: '#a03c31' },
  },
};

function Home() {
  const { isLoaded } = useUser();
  if (!isLoaded) return <p className="entry-loading" role="status">Loading Angaan…</p>;
  return <><Show when="signed-in"><Redirect to="/user-portal" /></Show><Show when="signed-out"><Landing /></Show></>;
}

function Portal() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <p className="entry-loading" role="status">Loading your account…</p>;
  return <><Show when="signed-in"><App key={user?.id} /></Show><Show when="signed-out"><Redirect to="/" /></Show></>;
}

function AuthPage({ signup = false }) {
  return <main className="entry-auth">
    <Link href="/" className="entry-back">Back to Woodsville Phase 2</Link>
    {signup
      ? <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} forceRedirectUrl={`${basePath}/user-portal`} />
      : <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} forceRedirectUrl={`${basePath}/user-portal`} />}
  </main>;
}

function Routes() {
  const [, setLocation] = useLocation();
  return <ClerkProvider
    publishableKey={clerkPubKey}
    proxyUrl={clerkProxyUrl}
    appearance={appearance}
    signInUrl={`${basePath}/sign-in`}
    signUpUrl={`${basePath}/sign-up`}
    localization={{
      signIn: { start: { title: 'Welcome to Angaan', subtitle: 'Sign in to your Woodsville Phase 2 account' } },
      signUp: { start: { title: 'Join your community', subtitle: 'Create an account, then request resident access' } },
    }}
    routerPush={to => setLocation(stripBase(to))}
    routerReplace={to => setLocation(stripBase(to), { replace: true })}
  >
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sign-in/*?"><AuthPage /></Route>
      <Route path="/sign-up/*?"><AuthPage signup /></Route>
      <Route path="/user-portal" component={Portal} />
      <Route path="/privacy" component={Privacy} />
      <Route><main className="entry-auth"><h1>Page not found</h1><Link href="/">Return home</Link></main></Route>
    </Switch>
  </ClerkProvider>;
}

export default function AppRouter() {
  return <WouterRouter base={basePath}><Routes /></WouterRouter>;
}