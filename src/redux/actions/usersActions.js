export const LOGIN = (username, password) => ({
  type: "LOGIN",
  username,
  password,
});

export const LOGIN_SUCCESS = (account) => ({
  type: LOGIN_SUCCESS,
  account,
});

export const LOGOUT = () => ({
  type: "LOGOUT",
});

export const SHOW_NOTIFICATION = (message) => ({
  type: "SHOW_NOTIFICATION",
  message,
});