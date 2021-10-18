import { combineReducers, createStore, applyMiddleware } from "redux";
import { Filters } from "./filters";
import { Header } from "./header";
import { Plants } from "./plants";
import { Rooms } from "./rooms";
import { User } from "./user";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      filters: Filters,
      header: Header,
      plants: Plants,
      user: User,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
