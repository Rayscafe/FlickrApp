import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import sagas from "./sagas";

const initialState = {
  auth: {
    username: '',
    expiresIn: '',
    token: '',
    SIGNUP_SUCCEEDED: false,
    email: null,
    user: '',
    activate:'',
    LOGIN_FAILED: false,
    apiKey: '',
    registered: 'unregistered' // "unregistered | pending | registered"
  }
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  collapsed: true
});

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(logger, sagaMiddleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// // then run the saga
sagaMiddleware.run(sagas);

export default store;
