import { getNow, makeFetchData } from './utils';

export default makeFetchData(
  'notifications',
  () => ({
    method: 'PUT',
    query: { last_read_at: getNow(), id: '460661577' },
  }),
);