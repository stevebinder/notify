import createChecker from './createChecker';
import {
  addLocalStorageListener,
  getLocalStorage,
  setLocalStorage
} from 'src/utils';

let checker = null;

const onCheckerError = () => {
  chrome.storage.local.set({ token: '' });
  checker();
  checker = null;
};

const onCheckerSuccess = data => {
  setLocalStorage({ notifications: data.all });
  updateBadge(data.new.length);
};

const onStorage = ({ token }) => {
  if (token && !checker) {
    checker = createChecker(token, onCheckerSuccess, onCheckerError);
  } else if (!token && checker) {
    checker();
    checker = null;
  }
};

const updateBadge = increase => chrome.browserAction.getBadgeText(
  {},
  label => {
    const count = Math.min(99, (+label || 0) + increase);
    const text = count ? `${count}` : '';
    chrome.browserAction.setBadgeText({ text });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#2e8bf7' });
  },
);

(async () => {
  chrome.browserAction.setBadgeText({ text: '' });
  const storage = await getLocalStorage();
  onStorage(storage);
  addLocalStorageListener(onStorage);
})();