/*---storage functions with expiry time --------*/

/*---------------------ttl in seconds --------*/

export const setLocalStorageWithExpiry = (key, value, ttl) => {
  const now = new Date();

  // `item` is an object which contains the original value as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl * 1000,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const    getLocalStorageWithExpiry = (key) => {
  if (typeof window === "undefined") return null;

  const itemStr = localStorage.getItem(key);

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = itemStr && JSON.parse(itemStr);
  const now = new Date();

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage and return null
    localStorage.removeItem(key);
    return null;
  }

  return item?.value;
};

export const mergeLocalStorageWithExpiry = (key, newValue, ttl = 86400) => {
  if (typeof window === "undefined") return;

  const now = new Date();
  const itemStr = localStorage.getItem(key);
  let item = itemStr ? JSON.parse(itemStr) : null;

  if (item && now.getTime() < item.expiry) {
    // Not expired, merge existing value
    item.value = { ...item.value, ...newValue };
  } else {
    // Expired or doesn't exist, start fresh
    item = {
      value: newValue,
      expiry: now.getTime() + ttl * 1000,
    };
  }

  localStorage.setItem(key, JSON.stringify(item));
};

export const getValueFromLocalStorage = (key) => {
  if (typeof window === "undefined" || !key) return null;
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
};

export const removeValueFromLocalStorage = (key) => {
  if (typeof window === "undefined" || !key) return null;
  if (localStorage.getItem(key)) localStorage.removeItem(key);
};

export const setValueInLocalStorage = (key, value) => {
  if (typeof window === "undefined" || !key) return null;
  localStorage.setItem(key, JSON.stringify(value));
};
