import React, { Component, createContext } from 'react';
import { launchAuthFlow, markNotificationsRead } from 'src/api';
import { getLocalStorage } from 'src/utils';

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
        token = await launchAuthFlow();
      } catch (e) {}
      if (!token) {
        return;
      }
      chrome.storage.local.set({ token });
      // TODO: add logic to listen for the background script to fetch
      // the first round of notifications so the screen isn't blank
      // and we don't have to do window.close here for a better
      // user experience.
      window.close();
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