import React, { createContext, useState } from 'react';
import * as github from 'src/utils/api';
import launchGithubAuthFlow from 'src/utils/auth';
import { getLocalStorage } from 'src/utils/storage';

export const Context = createContext();

export const Provider = props => {
  const [state, setState] = useState({
    filters: ['drive-web', 'iris', 'gaia'],
    notifications: [],
    token: '',
  });
  const actions = {
    launchAuth: async () => {
      let token = '';
      try {
        token = await launchGithubAuthFlow();
      } catch (e) {}
      if (!token) {
        return;
      }
      chrome.storage.local.set({ token });
      github.setToken(token);
      const notifications = await github.getNotifications();
      setState({ ...state, notifications, token });
    },
    syncStorage: async () => {
      const { notifications = [], token = '' } = await getLocalStorage();
      if (token) {
        github.setToken(token);
        const newNotifications = await github.getNotifications();
        setState({
          ...state,
          notifications: newNotifications,
          token,
        });
      } else {
        setState({
          ...state,
          notifications,
          token,
        });
      }
    },
  };
  return <Context.Provider {...props} value={{ ...state, ...actions }} />;
};