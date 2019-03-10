import React, { useContext } from 'react';
import { Context } from '../../../Store';
import Notification from './Notification';

const styles = {
  container: {
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    flex: '1',
    height: '100%',
    overflow: 'auto',
    padding: '10px',
    paddingBottom: '50px',
  },
};

const getFilteredNotifications = (notifications, filters) => {
  const typeFilters = filters
    .filter(({ type }) => type === 'type')
    .map(({ value }) => notification => notification.subject.type === value);
  const repositoryFilters = filters
    .filter(({ type }) => type === 'repository')
    .map(({ value }) => notification => notification.repository.name === value);
  return notifications
    .slice(0, 50)
    .filter(notification => {
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
      {filteredNotifications.map((notification, index) => (
        <Notification
          key={notification.id}
          notification={notification}
          space={!!index}
        />
      ))}
    </div>
  );
};