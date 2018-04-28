const AUTH_TOKEN = "auth";

/**
 * Extract a value from the storage.
 * @param {String} key - The key of the value to extract.
 * @return {Any} The value of the item in the storage.
 */
const getFromStorage = (key: string): ?string => {
  return window ? window.localStorage.getItem(key) : undefined;
};

/**
 * Save a value in the storage.
 * @param {String} key - The key of the value to extract.
 * @param {String} value - The value to save.
 */
const setInStorage = (key: string, value: string) => {
  window && window.localStorage.setItem(key, value);
};

/**
 * Remove a value from the storage.
 * @param {String} key - The key of the value to remove.
 */
const deleteFromStorage = (key: string) => {
  window.localStorage.removeItem(key);
};

/* Auth */

export const setAuthToken = (token: string): void => {
  console.log("token: ", token);
  setInStorage(AUTH_TOKEN, token);
};

export const getAuthToken = (): ?string => {
  let token = getFromStorage(AUTH_TOKEN);
  return token;
};

export default {
  setAuthToken,
  getAuthToken
};
