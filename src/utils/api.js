let accessToken = '';

const fetchData = async (path = '') => {
  if (!path) {
    throw new Error('invalid path');
  }
  if (!accessToken) {
    throw new Error('missing access token');
  }
  const base = 'https://api.github.com';
  try {
    const response = await fetch(`${base}/${path}?access_token=${accessToken}`);
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

export const getNotifications = () => fetchData('notifications');

export const setToken = token => {
  accessToken = token || '';
};