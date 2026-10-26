import { useSyncExternalStore } from 'react';
import { historyStore } from '../services/historyStore.js';

export function useHistory() {
  const records = useSyncExternalStore(historyStore.subscribe, historyStore.getSnapshot);
  return { records, add: historyStore.add, clear: historyStore.clear };
}
