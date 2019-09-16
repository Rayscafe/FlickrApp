import { LOGIN_SUCCEEDED, LOGIN_FAILED, SIGNUP, SIGNUP_SUCCEEDED, FORGOT_SUCCEEDED, RESET_SUCCEEDED, ACTIVATE_SUCCEEDED, REGISTER_SUCCEEDED } from "../actions/constants";

const initialState = {};

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        expiresIn: action.user.expiresIn,
        token: action.user.token
      };
    case LOGIN_FAILED:
      return {
        ...state,
        LOGIN_FAILED: true
      };
    case SIGNUP:
      return {
        username: action.user_information.name
      };
    case SIGNUP_SUCCEEDED:
      console.log("aaaaaaaaaaaaa", action.user_information)
      return {
        ...state,
        SIGNUP_SUCCEEDED: true,
        stoken: action.user.token,
        // username: 
      };
    case REGISTER_SUCCEEDED:
      return {
        ...state,
        REGISTER_SUCCEEDED: true,
        apiKey: action.user.apiKey
      };
    case FORGOT_SUCCEEDED:
      return {
        ...state,
        email: action.user
      };
    case RESET_SUCCEEDED:
      return {
        ...state,
        user: action.user
      };
    case ACTIVATE_SUCCEEDED:
      return {
        ...state,
        activate: true
      };
    default:
      return state;
  }
}

export { auth };
