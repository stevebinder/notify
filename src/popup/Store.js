import React, { createContext, useState } from 'react';
import * as github from 'src/utils/api';
import launchGithubAuthFlow from 'src/utils/auth';
import { getLocalStorage } from 'src/utils/storage';

export const Context = createContext();

export const Provider = ({ children }) => {

  const [state, setState] = useState({
    filters: [],
    notifications: [],
    token: '',
  });

  const launchAuth = async () => {
    let token = '';
    try {
      token = await launchGithubAuthFlow();
    } catch (e) {}
    if (!token) {
      return;
    }
    chrome.storage.local.set({ token });
    setState({ ...state, token });
  };

  const markNotificationsRead = () => {
    github.setToken(state.token);
    github.markNotificationsRead();
  };

  const setFilter = (type, value, additiveMode = false) => {
    const isExactFilter = filter =>
      filter.type === type && filter.value === value;
    const containsExactFilter = state.filters.some(isExactFilter);
    const withoutExactFilter = state.filters.filter(filter =>
      !isExactFilter(filter));
    if (containsExactFilter) {
      setState({
        ...state,
        filters: withoutExactFilter,
      });
    } else if (additiveMode) {
      setState({
        ...state,
        filters: [
          ...withoutExactFilter,
          { type, value },
        ],
      });
    } else {
      setState({
        ...state,
        filters: [
          ...withoutExactFilter.filter(filter => filter.type !== type),
          { type, value },
        ],
      });
    }
  };

  const syncStorage = async () => {
    const { notifications = [], token = '' } = await getLocalStorage();
    setState({
      ...state,
      notifications,
      token,
    });
  };

  return (
    <Context.Provider
      value={{
        ...state,
        launchAuth,
        markNotificationsRead,
        setFilter,
        syncStorage,
      }}
    >
      {children}
    </Context.Provider>
  );
};