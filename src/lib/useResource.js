import { useCallback, useEffect, useState } from 'react';
import { api } from './api.js';

export function useResource(path) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [version, setVersion] = useState(0);
  const refresh = useCallback(() => setVersion(v => v + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });
    api(path, { signal: controller.signal }).then(data => {
      setState({ data, loading: false, error: null });
    }).catch(error => {
      if (error.name !== 'AbortError') setState({ data: null, loading: false, error });
    });
    return () => controller.abort();
  }, [path, version]);
  return { ...state, refresh };
}