import createChecker from './createChecker';
import {
  addLocalStorageListener,
  getLocalStorage,
  setLocalStorage
} from 'src/utils/storage';

let checker = null;

const onNotifications = notifications => {
  setBadge(notifications.length);
  setLocalStorage({ notifications });
};

const onStorage = ({ token }) => {
  if (token && !checker) {
    checker = createChecker(token, onNotifications);
  } else if (!token && checker) {
    checker();
    checker = null;
  }
};

const setBadge = count => {
  const color = inc ? '#ff0000' : '';
  const current = +chrome.browserAction.getBadgeText() || 0;
  const text = `${current + count}`;
  chrome.browserAction.setBadgeText({ text });
  chrome.browserAction.setBadgeBackgroundColor({ color });
}

(async () => {
  const storage = await getLocalStorage();
  onStorage(storage);
  addLocalStorageListener(onStorage);
})();