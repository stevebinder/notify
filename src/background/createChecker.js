import { getNotifications } from 'src/utils/api';

const getTimeAgo = (ago = 0) => {
  const zero = num => num < 10 ? `0${num}` : num;
  const date = new Date(Date.now() - ago);
  const year = date.getFullYear();
  const month = zero(date.getMonth() + 1);
  const day = zero(date.getDate());
  const hours = zero(date.getHours());
  const minutes = zero(date.getMinutes());
  const seconds = zero(date.getSeconds());
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

export default (token, callback) => {

  let interval = null;
  let lastNotifications = [];

  const onInterval = async () => {
    const fetchedNotifications = await getNotifications({
      access_token: token,
      since: getTimeAgo(86400000),
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