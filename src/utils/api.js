let accessToken = '';

const buildQuery = (query = {}) => Object.entries(query)
  .filter(([key, value]) => value !== undefined)
  .map(([key, value]) => ([key, encodeURIComponent(value)]))
  .reduce(
    (result, [key, value]) => ([...result,`${key}=${value}` ]),
    [],
  )
  .join('&');

const fetchData = async (path = '', params = {}) => {
  if (!path) {
    throw new Error('invalid path');
  }
  if (!accessToken) {
    throw new Error('missing access token');
  }
  const base = 'https://api.github.com';
  const query = {
    access_token: accessToken,
    ...params,
  };
  try {
    const response = await fetch(`${base}/${path}?${buildQuery(query)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    try {
      const text = await response.text();
      throw new Error(text);
    } catch (error2) {
      throw new Error('bad response');
    }
  }
};

const makeFetchData = path => (...args) => fetchData(path, ...args);

export const getNotifications = makeFetchData('notifications');

export const setToken = token => {
  accessToken = token || '';
};