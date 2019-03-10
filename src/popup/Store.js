import React, { Component, createContext } from 'react';
import { markNotificationsRead } from 'src/utils/api';
import launchGithubAuthFlow from 'src/utils/auth';
import { getLocalStorage } from 'src/utils/storage';

export const Context = createContext();

export class Provider extends Component {

  state = {

    filters: [],
    notifications: [],
    syncing: true,
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

    setFilter: (type, value, additive = false) => {
      const isExactFilter = filter =>
        filter.type === type && filter.value === value;
      if (this.state.filters.some(isExactFilter)) {
        this.setState({
          filters: this.state.filters.filter(filter => !isExactFilter(filter)),
        });
      } else if (additive) {
        this.setState({
          filters: [
            ...this.state.filters,
            { type, value },
          ],
        });
      } else {
        this.setState({
          filters: [
            ...this.state.filters.filter(filter => filter.type !== type),
            { type, value },
          ],
        });
      }
    },

    syncStorage: async () => {
      this.setState({
        syncing: true,
      });
      const { notifications = [], token = '' } = await getLocalStorage();
      this.setState({
        notifications,
        syncing: false,
        token,
      });
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