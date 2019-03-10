import { getNotifications } from 'src/api';

export default (token, onSuccess, onError) => {

  let interval = null;
  let lastNotifications = [];

  const onInterval = async () => {
    try {
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
      onSuccess({
        all: fetchedNotifications,
        new: newUnreadNotifications,
      });
    } catch (error) {
      if (error.status === 401) {
        onError(error);
      }
      throw error;
    }
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