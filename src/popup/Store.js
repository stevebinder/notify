import React, { Component, createContext } from 'react';
import { markNotificationsRead } from 'src/utils/api';
import launchGithubAuthFlow from 'src/utils/auth';
import { getLocalStorage } from 'src/utils/storage';

export const Context = createContext();

export class Provider extends Component {

  state = {
    filters: [],
    notifications: [],
    token: '',
    launchAuth: async () => {
      let token = '';
      try {
        token = await launchGithubAuthFlow();
      } catch (e) {}
      if (!token) {
        return;
      }
      chrome.storage.local.set({ token });
      this.setState({ token });
    },
    markAllRead: () => {
      markNotificationsRead({ access_token: this.state.token });
    },
    setFilter: (type, value) => {
      const isExactFilter = filter =>
        filter.type === type && filter.value === value;
      const containsExactFilter = this.state.filters.some(isExactFilter);
      const filters = containsExactFilter
        ? this.state.filters.filter(filter => !isExactFilter(filter))
        : [...this.state.filters, { type, value }];
      this.setState({ filters });
    },
    syncStorage: async () => {
      const { notifications = [], token = '' } = await getLocalStorage();
      this.setState({ notifications, token });
    },
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}