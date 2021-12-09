import * as ActionTypes from "./ActionTypes";
import baseUrl from "../shared/baseUrl";

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
  console.log(baseUrl);
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

export const saveRoom = (criteria, room, rooms, token) => (dispatch) => {
  const roomNames = Object.keys(rooms);
  if (roomNames.includes(room)) {
    return {
      type: ActionTypes.ROOM_FAILED,
      payload: "a room with this name already exists",
    };
  } else {
    fetch(baseUrl + "profile/rooms", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: room,
        criteria: criteria,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("save room", result);
        dispatch(updateRooms(result));
      });
  }
};

export const updateRooms = (rooms) => {
  return { type: ActionTypes.ADD_ROOM, payload: rooms };
};

export const removeRoom = (room, token) => (dispatch) => {
  fetch(baseUrl + "profile/rooms/" + room, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => result.json())
    .then((result) => {
      console.log("save room", result);
      dispatch(updateRooms(result));
    });
};

export const setUserFormValue = (key, value) => {
  return { type: ActionTypes.UPDATE_FORM, payload: { key, value } };
};

export const userLoading = () => {
  return { type: ActionTypes.USER_LOADING };
};

export const loginUser = (userName, favorites = [], rooms = {}, token) => {
  return {
    type: ActionTypes.LOGIN_USER,
    payload: { userName, favorites, rooms, token },
  };
};

export const fetchUser = (userName, password) => (dispatch) => {
  dispatch(userLoading());
  console.log("fetchUser", userName, password);
  fetch(baseUrl + "profile/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName,
      password: password,
    }),
  })
    .then((result) => result.json())
    .then((result) => {
      if (result.err !== undefined) {
        console.log("200 error", result.err);
        dispatch(loginFailed(result.err));
      } else {
        dispatch(
          loginUser(
            result.user.username,
            result.user.favorites,
            result.user.rooms,
            result.token
          )
        );
      }
    })
    .catch((error) => {
      console.log(error.message);
      dispatch(loginFailed(error.message));
    });
};

export const signUpUser = (userName, password) => (dispatch) => {
  dispatch(userLoading());
  console.log("fetchUser", userName, password);
  fetch(baseUrl + "profile/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName,
      password: password,
    }),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          response.json().then((data) => {
            console.log(data);
          });
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((result) => result.json())
    .then((result) => {
      if (result.err !== undefined) {
        console.log("200 error", result.err);
        dispatch(loginFailed(result.err));
      } else {
        dispatch(
          loginUser(
            result.user.username,
            result.user.favorites,
            result.user.rooms,
            result.token
          )
        );
      }
    })
    .catch((error) => {
      console.log(error.message);
      dispatch(loginFailed(error.message));
    });
};

export const loginFailed = (error) => {
  return { type: ActionTypes.LOGIN_FAILED, payload: error };
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

export const logoutUser = (token) => (dispatch) => {
  dispatch(userLoggingOut());

  fetch(baseUrl + "profile/logout", {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((result) => result.json())
    .then((result) => {
      if (result.logout) {
        dispatch(userLoggedOut());
      }
    });
};

export const updateFavorites = (plantName, favorites, token) => (dispatch) => {
  dispatch(updatingFavorites());
  if (favorites.includes(`${plantName}`)) {
    fetch(baseUrl + "profile/favorites/" + plantName, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("favorites - delete", result);
        dispatch(sendFavorites(result));
      });
  } else {
    fetch(baseUrl + "profile/favorites", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        plantName: plantName,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("favorites - add", result);
        dispatch(sendFavorites(result));
      });
  }
};

export const updatingFavorites = () => {
  return { type: ActionTypes.UPDATING_FAVORITES };
};

export const sendFavorites = (newFavorites) => {
  return { type: ActionTypes.UPDATE_FAVORITES, payload: newFavorites };
};
