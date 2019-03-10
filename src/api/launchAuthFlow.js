import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from 'src/config';

const exchangeCodeForToken = async code => {
  const base = 'https://github.com/login/oauth/access_token';
  const redirect = chrome.identity.getRedirectURL();
  const url = `${base}?code=${code}&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&redirect_url=${redirect}`;
  const options = { method: 'POST' };
  try {
    const response = await fetch(url, options);
    const data = await response.text();
    return extractParam(data, 'access_token');
  } catch (error) {
    throw new Error('could not exchange code for token');
  }
};

const extractCodeFromAuthResponse = data => {
  try {
    return extractParam(data, 'code');
  } catch (error) {
    throw new Error('could not get extract code from auth response');
  }
};

const extractParam = (data, param) => {
  try {
    return data.split(`${param}=`)[1].split('&')[0] || '';
  } catch (error) {
    throw new Error(`could not extract param "${param}"`);
  }
};

const getAuthResponse = () => new Promise((resolve, reject) => {
  const redirect = chrome.identity.getRedirectURL();
  const base = 'https://github.com/login/oauth/authorize';
  const authUrl = `${base}?client_id=${GITHUB_CLIENT_ID}&scope=notifications&redirect_uri=${redirect}`;
  const options = { interactive: true, url: authUrl };
  const onResponse = responseUrl => {
    if (responseUrl) {
      resolve(responseUrl);
    } else {
      reject(new Error('user cancelled auth flow'));
    }
  };
  chrome.identity.launchWebAuthFlow(options, onResponse);
});

export default async () => {
  const response = await getAuthResponse();
  const code = await extractCodeFromAuthResponse(response);
  const token = await exchangeCodeForToken(code);
  if (!token) {
    throw new Error('no token returned');
  }
  return token;
};
