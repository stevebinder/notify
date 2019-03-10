import { makeFetchData } from './utils';

export default async (...args) => {
  const fetcher = makeFetchData(
    'notifications',
    { query: { all: true } },
  );
  const notifications = await fetcher(...args);
  return notifications.sort((a, b) => {
    const timeA = new Date(a.updated_at);
    const timeB = new Date(b.updated_at);
    return Math.max(-1, Math.min(1, timeB - timeA));
  });
};
