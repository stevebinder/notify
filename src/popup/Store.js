import { context } from 'reactdux';
import * as github from 'src/utils/api';
import launchGithubAuthFlow from 'src/utils/auth';
import { getLocalStorage } from 'src/utils/storage';

export default context(
  {
    notifications: [],
    token: '',
  },
  (state, setState, afterState) => {

    const clearToken = () => setState({ token: '' });

    const getNotifications = async () => {
      github.setToken(state.token);
      const notifications = await github.getNotifications();
      setState({ notifications });
    };

    const launchAuth = async () => {
      const token = await launchGithubAuthFlow();
      chrome.storage.local.set({ token });
      setState({ token });
      if (token) {
        afterState(getNotifications);
      }
    };

    const syncStorage = async () => {
      const { notifications = [], token = '' } = await getLocalStorage();
      setState({ notifications, token });
      if (token) {
        afterState(getNotifications);
      }
    };

    return {
      clearToken,
      getNotifications,
      launchAuth,
      syncStorage,
    }
  },
);