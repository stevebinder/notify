import React from 'react';
import { component } from 'reactdux';
import { getNotifications, launchAuthFlow } from 'src/actions';
import { selectNotifications, selectToken } from 'src/selectors';

export default component({
  container: {
    notifications: selectNotifications,
    token: selectToken,
  },
  mount() {
    if (this.props.token) {
      getNotifications();
    }
  },
  render() {
    if (!this.props.token) {
      return <button onClick={launchAuthFlow}>Auth!</button>;
    }
    return `You have ${this.props.notifications.length} notifications!`;
  },
});