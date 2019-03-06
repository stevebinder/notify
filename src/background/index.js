import createChecker from './createChecker';
import {
  addLocalStorageListener,
  getLocalStorage,
  setLocalStorage
} from 'src/utils/storage';

let checker = null;

const onCheckerData = data => {
  setLocalStorage({ notifications: data.all });
  updateBadge(data.new.length);
};

const onStorage = ({ token }) => {
  if (token && !checker) {
    checker = createChecker(token, onCheckerData);
  } else if (!token && checker) {
    checker();
    checker = null;
  }
};

const updateBadge = increase => chrome.browserAction.getBadgeText(
  {},
  label => {
    const current = +label || 0;
    const count = Math.min(99, current + increase);
    const text = count ? `${current + count}` : '';
    chrome.browserAction.setBadgeText({ text });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#ff0000' });
  },
);

(async () => {
  chrome.browserAction.setBadgeText({ text: '' });
  const storage = await getLocalStorage();
  onStorage(storage);
  addLocalStorageListener(onStorage);
})();