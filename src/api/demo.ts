import { api } from './client';

export async function triggerLiveDemo() {
  const res = await api.post('/demo/trigger');
  return res;
}
