const clientId = '68a04e29e68d3ceffe16';
const clientSecret = '05a5b55a3b4df855cbcce77d3022d54a99099629';

const exchangeCodeForToken = async code => {
  const base = 'https://github.com/login/oauth/access_token';
  const redirect = chrome.identity.getRedirectURL();
  const url = `${base}?code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_url=${redirect}`;
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
  const authUrl = `${base}?client_id=${clientId}&scope=notifications&redirect_uri=${redirect}`;
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
  return token;
};
