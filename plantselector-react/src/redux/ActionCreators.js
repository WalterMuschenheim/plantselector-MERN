import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addCriteria = (type, criterium) => {
  return { type: ActionTypes.ADD_CRITERIUM, payload: [type, criterium] };
};

export const removeCriteria = (criterium) => {
  return { type: ActionTypes.REMOVE_CRITERIUM, payload: criterium };
};

export const clearCriteria = (type) => {
  return { type: ActionTypes.CLEAR_CRITERIA, payload: type };
};

export const updateSearch = (searchTerms) => {
  return { type: ActionTypes.UPDATE_SEARCH, payload: searchTerms };
};

export const collapseHandler = () => {
  return { type: ActionTypes.COLLAPSE };
};

export const updateGuideHeight = (rectHeight) => {
  return { type: ActionTypes.UPDATE_GUIDE_HEIGHT, payload: rectHeight };
};

export const updateNavHeight = (rectHeight) => {
  return { type: ActionTypes.UPDATE_NAV_HEIGHT, payload: rectHeight };
};

export const updateSticky = (isSticky) => {
  return { type: ActionTypes.UPDATE_STICKY, payload: isSticky };
};

export const plantsLoading = () => {
  return { type: ActionTypes.PLANTS_LOADING };
};

export const addPlants = ({ plants, explainers }) => {
  return {
    type: ActionTypes.ADD_PLANTS,
    payload: {
      plants: plants,
      explainers: explainers,
    },
  };
};

export const fetchPlants = () => (dispatch) => {
  dispatch(plantsLoading());

  fetch(baseUrl + "plants")
    .then((plants) => plants.json())
    .then((plants) => {
      console.log(plants);
      return fetch(baseUrl + "explainers")
        .then((explainers) => explainers.json())
        .then((explainers) => {
          console.log({ plants, explainers });
          return { plants, explainers };
        });
    })
    .then((result) => dispatch(addPlants(result)));
};

export const saveRoom = (criteria, room, rooms) => {
  const roomNames = Object.keys(rooms);
  if (roomNames.includes(room)) {
    return {
      type: ActionTypes.ROOM_FAILED,
      payload: "a room with this name already exists",
    };
  } else {
    return { type: ActionTypes.ADD_ROOM, payload: { room, criteria } };
  }
};

export const removeRoom = (room) => {
  return { type: ActionTypes.REMOVE_ROOM, payload: room };
};

export const userLoading = () => {
  return { type: ActionTypes.USER_LOADING };
};

export const loginUser = (userName, password, favorites = [], rooms = {}) => {
  return {
    type: ActionTypes.LOGIN_USER,
    payload: { userName, password, favorites, rooms },
  };
};

export const fetchUser = (userName, password) => (dispatch) => {
  dispatch(userLoading());

  setTimeout(() => {
    dispatch(loginUser(userName, password));
  }, 2000);
};

export const userLoggingOut = () => {
  return { type: ActionTypes.LOGGING_OUT };
};

export const userLoggedOut = () => {
  return { type: ActionTypes.LOGGED_OUT };
};

export const logOutFailed = (errMess) => {
  return { type: ActionTypes.LOGOUT_FAILED, payload: errMess };
};

export const logoutUser = () => (dispatch) => {
  dispatch(userLoggingOut());

  setTimeout(() => {
    dispatch(userLoggedOut());
  }, 2000);
};

export const updateFavorites = (plantName, favorites) => (dispatch) => {
  dispatch(updatingFavorites());

  let newFavorites = [...favorites];
  if (favorites.includes(`${plantName}`)) {
    newFavorites.splice(favorites.indexOf(`${plantName}`), 1);
  } else {
    newFavorites.push(plantName);
  }
  console.log("favorites from updated favorites: ", newFavorites);
  setTimeout(() => {
    dispatch(sendFavorites(newFavorites));
  }, 2000);
};

export const updatingFavorites = () => {
  return { type: ActionTypes.UPDATING_FAVORITES };
};

export const sendFavorites = (newFavorites) => {
  return { type: ActionTypes.UPDATE_FAVORITES, payload: newFavorites };
};
