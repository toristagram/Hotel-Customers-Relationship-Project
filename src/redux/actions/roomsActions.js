export const GET_ROOMS = () => ({
  type: "GET_ROOMS",
});

export const GET_ROOMS_SUCCESS = (rooms) => ({
  type: "GET_ROOMS_SUCCESS",
  rooms,
});

export const SHOW_NOTIFICATION = (message) => ({
  type: "SHOW_NOTIFICATION",
  message,
});
