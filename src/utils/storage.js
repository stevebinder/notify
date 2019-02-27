export const addLocalStorageListener = callback => chrome.storage.onChanged
  .addListener((details, area) => {
    if (area !== 'local') {
      return;
    }
    const changes = Object.entries(details).reduce(
      (result, [key, { newValue }]) => ({
        ...result,
        [key]: newValue,
      }),
      {},
    );
    callback(changes);
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