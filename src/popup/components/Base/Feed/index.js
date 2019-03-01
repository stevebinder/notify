import React, { useContext } from 'react';
import { Context } from 'src/popup/Store';
import Notification from './Notification';

const styles = {
  container: {
    boxSizing: 'border-box',
    flex: '1',
    height: '100%',
    overflow: 'auto',
    padding: '30px',
  },
};

export default () => {
  const { notifications } = useContext(Context);
  return (
    <div style={styles.container}>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
};