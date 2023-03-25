export const GET_ACCOUNTS = () => ({
  type: "GET_ACCOUNTS",
});

export const GET_ACCOUNTS_SUCCESS = (accounts) => ({
  type: "GET_ACCOUNTS_SUCCESS",
  accounts,
});

export const SHOW_NOTIFICATION = (message) => ({
  type: "SHOW_NOTIFICATION",
  message,
});
