import { GETUSERS_SUCCEEDED } from "../actions/constants";

const initialState = [];

function users(state = initialState, action) {
  switch (action.type) {
    case GETUSERS_SUCCEEDED:
      return action.users;
    default:
      return state;
  }
}

export { users };
