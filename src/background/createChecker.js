import { getNotifications, setToken } from 'src/utils/api';

const getSince = () => {
  const zero = num => num < 10 ? `0${num}` : num;
  const date = new Date(Date.now() - (86400000 * 7));
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
  let notifications = [];

  const onInterval = async () => {
    setToken(token);
    const fetchedNotifications = await getNotifications({
      all: false,
      participating: false,
      per_page: 10,
      since: getSince(),
    });
    const oldNotifications = [...notifications];
    notifications = fetchedNotifications;
    if (oldNotifications.length) {
      const [{ id: firstId }] = oldNotifications;
      const newNotifications = [];
      for (let i = 0; i < fetchedNotifications.length; i += 1) {
        if (fetchedNotifications[i].id === firstId) {
          break;
        }
        newNotifications.push(fetchedNotifications[i]);
      }
      if (newNotifications.length) {
        callback(newNotifications);
      }
    }
  };

  interval = setInterval(onInterval, 15000);
  onInterval();

  return () => {
    clearInterval(interval);
    return null;
  };
};