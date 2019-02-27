import React from 'react';
import { component } from 'reactdux';
import {
  getNotifications,
  launchAuthFlow,
  syncStorage,
} from 'src/popup/actions';
import Notification from './Notification';

export default component({
  connect: (props, state) => ({
    notifications: state.notifications,
    token: state.token,
  }),
  mount() {
    syncStorage();
  },
  render({ notifications, token }) {
    if (!token) {
      return <button onClick={launchAuthFlow}>Auth!</button>;
    }
    return notifications.map(notification => (
      <Notification
        key={notification.id}
        notification={notification}
      />
    ));
  },
});