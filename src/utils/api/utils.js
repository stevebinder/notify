export const buildQuery = (query = {}) => Object.entries(query)
  .filter(([key, value]) => value !== undefined)
  .map(([key, value]) => ([key, encodeURIComponent(value)]))
  .reduce(
    (result, [key, value]) => ([...result,`${key}=${value}` ]),
    [],
  )
  .join('&');

export const fetchData = async (path = '', options = {}) => {
  if (!path) {
    throw new Error('invalid path');
  }
  const base = 'https://api.github.com';
  const query = {
    ...options.query,
    _r: Date.now(),
  };
  const url = `${base}/${path}?${buildQuery(query)}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('bad response');
  }
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    try {
      const text = await response.text();
      return text;
    } catch (error) {
      return '';
    }
  }
};

export const getNow = () => {
  const zero = value => value < 10 ? `0${value}` : value;
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = zero(date.getUTCMonth() + 1);
  const day = zero(date.getUTCDate())
  const hour = zero(date.getUTCHours());
  const minute = zero(date.getUTCMinutes());
  const second = zero(date.getUTCSeconds());
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
};

export const makeFetchData = (path, optionsOrOptionsCreator) => (query = {}) => {
  if (typeof optionsOrOptionsCreator === 'function') {
    const options = optionsOrOptionsCreator(query);
    return fetchData(
      path,
      {
        ...options,
        query: {
          ...options.query,
          ...query,
        },
      },
    );
  }
  const options = optionsOrOptionsCreator;
  return fetchData(
    path,
    {
      ...options,
      query: {
        ...options.query,
        ...query,
      },
    },
  );
};