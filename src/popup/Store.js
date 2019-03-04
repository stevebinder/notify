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
    github.setToken(token);
    const notifications = await github.getNotifications();
    setState({ ...state, notifications, token });
  };
  const setFilter = (type, value) => {
    const isExactFilter = filter => filter.type === type && filter.value === value;
    const containsExactFilter = state.filters.some(isExactFilter);
    if (containsExactFilter) {
      setState({
        ...state,
        filters: state.filters.filter(filter => !isExactFilter(filter)),
      });
    } else {
      setState({
        ...state,
        filters: [
          ...state.filters,
          { type, value },
        ],
      });
    }
  };
  const syncStorage = async () => {
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
  };
  return (
    <Context.Provider
      value={{
        ...state,
        launchAuth,
        setFilter,
        syncStorage,
      }}
    >
      {children}
    </Context.Provider>
  );
};