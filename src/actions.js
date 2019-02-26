import { action } from 'reactdux';
import * as github from 'src/utils/api';
import launchGithubAuthFlow from 'src/utils/auth';

export const getNotifications = action(async (state, token = '') => {
  github.setToken(token || state.token);
  // try {
    const notifications = await github.getNotifications();
    state({ notifications });
  // } catch (error) {}
});

export const launchAuthFlow = action(async state => {
  const token = await launchGithubAuthFlow();
  state({ token });
  getNotifications(token);
});