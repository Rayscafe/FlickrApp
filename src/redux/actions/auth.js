import { LOGIN, SIGNUP, FORGOT, RESET, ACTIVATE, REGISTER } from "./constants";

export const login = user_information => ({
  type: LOGIN,
  user_information
});

export const signup = user_information => ({
  type: SIGNUP,
  user_information
});

export const register = user_information => ({
  type: REGISTER,
  user_information
});

export const forgot = user_information => ({
  type: FORGOT,
  user_information
});

export const reset = user_information => ({
  type: RESET,
  user_information
});

export const activate = user_information => ({
  type: ACTIVATE,
  user_information
});