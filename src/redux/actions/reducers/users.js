import { LOGIN_SUCCESS, SHOW_NOTIFICATION } from "../usersActions";

const initialState = {
  accounts: [],
  notification: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, accounts: action.account };
    case "LOGOUT":
      return {
        ...initialState,
      };
    case SHOW_NOTIFICATION:
      return { ...state, notification: action.message };
    default:
      return state;
  }
};

export default usersReducer;