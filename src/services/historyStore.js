// Tiny external store for verification history, persisted on the device.
// Later this can be swapped for Supabase (per-user history) without touching the components.
import { buildSeedHistory } from '../data/mockHistory.js';

const KEY = 'scana.history.v1';
const MAX = 50;
const listeners = new Set();
let cache = null;

function persist(list) {
  cache = list;
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage may be full or blocked; the in-memory list still works */
  }
  listeners.forEach((l) => l());
}

function read() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      cache = JSON.parse(raw);
    } else {
      persist(buildSeedHistory());
    }
  } catch {
    cache = buildSeedHistory();
  }
  return cache;
}

export const historyStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: read,
  add(record) {
    persist([record, ...read().filter((r) => r.id !== record.id)].slice(0, MAX));
  },
  clear() {
    persist([]);
  },
};
