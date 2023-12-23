export const setSessionStorage = ({ value, key }) =>
  sessionStorage.setItem(key, JSON.stringify(value));

export const getSessionStorage = ({ key }) => {
  const data = sessionStorage.getItem(key);
  return data !== null && data !== undefined ? JSON.parse(data) : null;
};

export const removeSessionStorage = ({ key }) => sessionStorage.removeItem(key);
