import { GET_ROOMS_SUCCESS, SHOW_NOTIFICATION } from "../roomsActions";

const initialState = {
  rooms: {},
  notification: null,
};

const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOMS_SUCCESS:
      const roomsObject = {};
      action.payload.forEach((room) => {
        roomsObject[room.id] = room;
      });
      return { ...state, rooms: roomsObject };
    case SHOW_NOTIFICATION:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};

export default roomsReducer;
