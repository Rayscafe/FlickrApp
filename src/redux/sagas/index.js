import { call, put, takeLatest, fork } from "redux-saga/effects";
import {
  LOGIN,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  SIGNUP,
  SIGNUP_SUCCEEDED,
  SIGNUP_FAILED,
  REGISTER,
  REGISTER_SUCCEEDED,
  REGISTER_FAILED,
  FORGOT,
  FORGOT_SUCCEEDED,
  FORGOT_FAILED,
  RESET,
  RESET_SUCCEEDED,
  RESET_FAILED,
  ACTIVATE,
  ACTIVATE_SUCCEEDED,
  ACTIVATE_FAILED,
  GETUSERS,
  GETUSERS_FAILED,
  GETUSERS_SUCCEEDED,
  BASE_URL,
  Login_Endpoint,
  Signup_Endpoint,
  Forgot_Endpoint,
  Reset_Endpoint,
  Register_Endpoint,
  Activate_Endpoint,
  UsersApi,
} from "../actions/constants";

export function fetchApi(user) {
  return fetch(BASE_URL + Login_Endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(response => response.json());
}

//users fetching api
export function fetchUserApi() {
  return fetch(UsersApi).then(response => response.json());
}

// worker Saga: will be fired on LOGIN action
function* fetchUser(action) {
  console.log("login user api call in saga: ", action.user_information);
  try {
    const user = yield call(fetchApi, action.user_information);
    if (user.token)
      yield put({ type: LOGIN_SUCCEEDED, user: user });
    else
      yield put({ type: LOGIN_FAILED, message: true });
  } catch (e) {
    yield put({ type: LOGIN_FAILED, message: true });
  }
}

function* fetchUsers() {

  try {
    const users = yield call(fetchUserApi);
    yield put({ type: GETUSERS_SUCCEEDED, users: users });
  } catch (e) {
    yield put({ type: GETUSERS_FAILED, message: e.message });
  }
}

function* users() {
  yield takeLatest(GETUSERS, fetchUsers);
}

function* login() {
  yield takeLatest(LOGIN, fetchUser);
}

function* signup() {
  yield takeLatest(SIGNUP, signupUser);
}

function* signupUser(action) {
  console.log("signup user api call in saga: ", action.user_information);
  try {
    const user = yield call(signupApi, action.user_information);
    yield put({ type: SIGNUP_SUCCEEDED, user: user });
  } catch (e) {
    yield put({ type: SIGNUP_FAILED, message: e.message });
  }
}

export function signupApi(user) {
  return fetch(BASE_URL + Signup_Endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(response => response.json());
}

function* register() {
  yield takeLatest(REGISTER, registerUser);
}

function* registerUser(action) {
  try {
    const user = yield call(registerApi, action.user_information);
    yield put({ type: REGISTER_SUCCEEDED, user: user });
  } catch (e) {
    yield put({ type: REGISTER_FAILED, message: e.message });
  }
}

export function registerApi(user) {
  return fetch(BASE_URL + Register_Endpoint, {
    method: "POST",
    headers: {
      'x-access-token': localStorage.getItem(`navOpenKeys`),
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(user)  
    body: JSON.stringify(user)
  }).then(response => response.json());
}

function* forgot() {
  yield takeLatest(FORGOT, forgotPassword);
}

function* forgotPassword(action) {
  console.log("forgot password api call in saga: ", action.user_information.email);

  try {
    const user = yield call(forgotApi, action.user_information);
    if (user)
      yield put({ type: FORGOT_SUCCEEDED, user: action.user_information.email });
    else
      yield put({ type: FORGOT_SUCCEEDED, user: null });
  } catch (e) {
    yield put({ type: FORGOT_FAILED, message: e.message });
  }
}

export function forgotApi(user) {
  return fetch(BASE_URL + Forgot_Endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(response => response.json());
}

function* reset() {
  yield takeLatest(RESET, resetPassword);
}

function* resetPassword(action) {
  try {
    const user = yield call(resetApi, action.user_information);
    yield put({ type: RESET_SUCCEEDED, user: user });
  } catch (e) {
    yield put({ type: RESET_FAILED, message: e.message });
  }
}

export function resetApi(user) {
  return fetch(BASE_URL + Reset_Endpoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  }).then(response => response.json());
  
}

function* activate() {
  yield takeLatest(ACTIVATE, activateUser);
}

function* activateUser(action) {
  try {
    const user = yield call(activateApi, action.user_information);
    yield put({ type: ACTIVATE_SUCCEEDED, user: user });
  } catch (e) {
    yield put({ type: ACTIVATE_FAILED, message: e.message });
  }
}

export function activateApi(user) {
  return fetch(BASE_URL + Activate_Endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(response => response.json());
}
export default function* root() {
  yield fork(login);
  yield fork(signup);
  yield fork(register);
  yield fork(forgot);
  yield fork(reset);
  yield fork(activate);
  yield fork(users);
  // add other sagas here...
}
