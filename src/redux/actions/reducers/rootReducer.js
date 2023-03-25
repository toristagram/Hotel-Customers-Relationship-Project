import { combineReducers } from "redux";
import usersReducer from "./users";
import roomsReducer from "./rooms";

const rootReducer = combineReducers({
  users: usersReducer,
  rooms: roomsReducer,
});

export default rootReducer;