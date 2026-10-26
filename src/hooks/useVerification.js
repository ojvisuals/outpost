import { useEffect, useState } from 'react';
import { verifyProduct } from '../services/verification/index.js';

/** Runs verifyProduct for a raw value and exposes loading / done / error. */
export function useVerification(raw) {
  const [state, setState] = useState({ phase: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ phase: 'loading' });
    verifyProduct(raw)
      .then((result) => {
        if (!cancelled) setState({ phase: 'done', result });
      })
      .catch((err) => {
        if (!cancelled) setState({ phase: 'error', code: err.code ?? 'NETWORK', message: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, [raw, attempt]);

  return { state, retry: () => setAttempt((a) => a + 1) };
}
