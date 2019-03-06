import React, { createContext, Component } from 'react';
import * as github from 'src/utils/api';
import launchGithubAuthFlow from 'src/utils/auth';
import { getLocalStorage } from 'src/utils/storage';

export const Context = createContext();

export class Provider extends Component {

  state = {
    filters: [],
    notifications: [],
    token: '',
  }

  launchAuth = async () => {
    let token = '';
    try {
      token = await launchGithubAuthFlow();
    } catch (e) {}
    if (!token) {
      return;
    }
    chrome.storage.local.set({ token });
    this.setState({ token });
  }

  markNotificationsRead = () => {
    github.setToken(this.state.token);
    github.markNotificationsRead();
  }

  setFilter = (type, value, additiveMode = false) => {
    const isExactFilter = filter =>
      filter.type === type && filter.value === value;
    const containsExactFilter = this.state.filters.some(isExactFilter);
    const withoutExactFilter = this.state.filters.filter(filter =>
      !isExactFilter(filter));
    if (containsExactFilter) {
      this.setState({
        filters: withoutExactFilter,
      });
    } else if (additiveMode) {
      this.setState({
        filters: [
          ...withoutExactFilter,
          { type, value },
        ],
      });
    } else {
      this.setState({
        filters: [
          ...withoutExactFilter.filter(filter => filter.type !== type),
          { type, value },
        ],
      });
    }
  }

  syncStorage = async () => {
    const { notifications = [], token = '' } = await getLocalStorage();
    this.setState({ notifications, token });
  }

  render = () => (
    <Context.Provider
      value={{
        ...this.state,
        launchAuth: this.launchAuth,
        markNotificationsRead: this.markNotificationsRead,
        setFilter: this.setFilter,
        syncStorage: this.syncStorage,
      }}
    >
      {this.props.children}
    </Context.Provider>
  )
}