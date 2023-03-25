import { GET_ACCOUNTS_SUCCESS, SHOW_NOTIFICATION } from "../usersActions";

const initialState = {
  accounts: [],
  notification: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.payload };
    case SHOW_NOTIFICATION:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
