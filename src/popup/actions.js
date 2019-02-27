import { action } from 'reactdux';
import * as github from 'src/utils/api';
import launchGithubAuthFlow from 'src/utils/auth';
import { getLocalStorage } from 'src/utils/storage';

export const getNotifications = action(async (state, token = '') => {
  github.setToken(token || state.token);
  const notifications = await github.getNotifications();
  return { notifications };
});

export const launchAuthFlow = action(async state => {
  const token = await launchGithubAuthFlow();
  state({ token });
  chrome.storage.local.set({ token });
  getNotifications(token);
});

export const syncStorage = action(async state => {
  const {
    notifications = [],
    token = '',
  } = await getLocalStorage();
  state({ notifications, token });
  if (token) {
    getNotifications(token);
  }
});