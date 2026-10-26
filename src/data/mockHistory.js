// DEMO DATA: sample history so the History screen has something to show on first launch.
import { buildResult } from '../services/verification/providers/mockProvider.js';

const HOUR = 3600 * 1000;

export function buildSeedHistory() {
  const seeds = [
    { identifier: { type: 'gtin', value: '6154000234560' }, hoursAgo: 3 },
    { identifier: { type: 'gtin', value: '6154000456788' }, hoursAgo: 27 },
    { identifier: { type: 'nafdac', value: 'A1-123456' }, hoursAgo: 80 },
    { identifier: { type: 'gtin', value: '6154000789015' }, hoursAgo: 150 },
  ];
  return seeds.map(({ identifier, hoursAgo }) => ({
    ...buildResult(identifier),
    checkedAt: new Date(Date.now() - hoursAgo * HOUR).toISOString(),
  }));
}
