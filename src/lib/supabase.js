// Supabase client helper setup
// Can be linked to real project environment variables when needed
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://mock-applemoshi.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'mock-anon-key';

export const isSupabaseConfigured = Boolean(
  import.meta.env?.VITE_SUPABASE_URL && import.meta.env?.VITE_SUPABASE_ANON_KEY
);

export const supabaseInfo = {
  url: SUPABASE_URL,
  status: isSupabaseConfigured ? 'Connected to Supabase Cloud' : 'Running in Local Fast Mock State (Offline-Ready PWA)'
};
