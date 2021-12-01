import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { Filters } from "./filters";
import { Header } from "./header";
import { Plants } from "./plants";
import { User } from "./user";
import { UserForm } from "./userForm";
import thunk from "redux-thunk";
import logger from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      filters: Filters,
      header: Header,
      plants: Plants,
      user: User,
      userForm: UserForm,
    }),
    composeEnhancers(applyMiddleware(thunk, logger))
  );
  return store;
};
