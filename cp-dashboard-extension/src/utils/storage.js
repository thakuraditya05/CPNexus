// Safe Storage Wrapper
export const storage = {
  // Data save karne ke liye
  set: (data) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      // Extension mode: chrome.storage use karo
      chrome.storage.local.set(data);
    } else {
      // Dev mode: localStorage use karo
      Object.keys(data).forEach(key => {
        localStorage.setItem(key, JSON.stringify(data[key]));
      });
    }
  },

  // Data nikalne ke liye
  get: (keys, callback) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      // Extension mode
      chrome.storage.local.get(keys, callback);
    } else {
      // Dev mode
      const result = {};
      keys.forEach(key => {
        const val = localStorage.getItem(key);
        result[key] = val ? JSON.parse(val) : null;
      });
      callback(result);
    }
  }
};