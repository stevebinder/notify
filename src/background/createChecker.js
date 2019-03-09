import { getNotifications } from 'src/utils/api';

export default (token, callback) => {

  let interval = null;
  let lastNotifications = [];

  const onInterval = async () => {
    const fetchedNotifications = await getNotifications({
      all: true,
      access_token: token,
    });
    const oldNotifications = [...lastNotifications];
    lastNotifications = fetchedNotifications;
    const firstOldId = oldNotifications.length ? oldNotifications[0].id : '';
    const lastIdIndex = fetchedNotifications
      .findIndex(({ id }) => id === firstOldId);
    const newNotifications = lastIdIndex === -1
      ? fetchedNotifications
      : fetchedNotifications.slice(0, lastIdIndex);
    const newUnreadNotifications = newNotifications
      .filter(({ unread }) => unread);
    callback({
      all: fetchedNotifications,
      new: newUnreadNotifications,
    });
  };

  // Github returns an "X-Poll-Interval" header that is set to the
  // max number of seconds you should wait before polling again.
  // Usually this value is 60, hardcoding it for now.
  // TODO: Use the value returned from the header to update the timeout
  // on each request.
  interval = setInterval(onInterval, 60000);
  onInterval();

  return () => {
    clearInterval(interval);
    return null;
  };
};