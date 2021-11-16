import { combineReducers, createStore, applyMiddleware } from "redux";
import { Filters } from "./filters";
import { Header } from "./header";
import { Plants } from "./plants";
import { User } from "./user";
import { UserForm } from "./userForm";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      filters: Filters,
      header: Header,
      plants: Plants,
      user: User,
      userForm: UserForm,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
