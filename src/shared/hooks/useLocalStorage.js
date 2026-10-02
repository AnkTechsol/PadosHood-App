export function useLocalStorage(key, fallback) {
  const get = () => { try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback; } catch { return fallback; } };
  const set = (val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };
  const remove = () => localStorage.removeItem(key);
  return { get, set, remove };
}
