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

const getFilteredNotifications = (notifications, filters) => {
  const typeFilters = filters
    .filter(({ type }) => type === 'type')
    .map(({ value }) => notification => notification.subject.type === value);
  const repositoryFilters = filters
    .filter(({ type }) => type === 'repository')
    .map(({ value }) => notification => notification.repository.name === value);
  return notifications.filter(notification => {
    const passesFilters = pathMatchFilters =>
      !pathMatchFilters.length
      || pathMatchFilters.some(filter => filter(notification));
    return passesFilters(typeFilters) && passesFilters(repositoryFilters);
  });
};

export default () => {
  const { filters, notifications } = useContext(Context);
  const filteredNotifications = getFilteredNotifications(notifications, filters);
  return (
    <div style={styles.container}>
      {filteredNotifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
};