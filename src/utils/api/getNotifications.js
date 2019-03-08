import { makeFetchData } from './utils';

export default makeFetchData(
  'notifications',
  { query: { all: true } },
);