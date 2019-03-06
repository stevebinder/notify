export const addLocalStorageListener = callback =>
  chrome.storage.onChanged.addListener(async (details, area) => {
    if (area !== 'local') {
      return;
    }
    const storage = await getLocalStorage();
    callback(storage);
  });

export const getLocalStorage = () => new Promise(resolve =>
  chrome.storage.local.get(null, resolve));

export const setLocalStorage = (changes = {}) =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(changes, resolve);
    } catch (error) {
      reject(error);
    }
  });