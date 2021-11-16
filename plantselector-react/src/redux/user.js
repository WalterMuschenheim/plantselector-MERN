import * as ActionTypes from "./ActionTypes";

export const User = (
  state = {
    isLoading: true,
    errMess: null,
    user: null,
    favorites: [],
    rooms: {},
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.USER_LOADING:
      return { ...state, isLoading: true, errMess: null, user: null };
    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        isLoading: false,
        user: {
          name: action.payload.userName,
          token:
            action.payload.token === undefined
              ? state.user.token
              : action.payload.token,
        },
        favorites: action.payload.favorites,
        rooms: action.payload.rooms,
      };
    case ActionTypes.LOGIN_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.UPDATING_FAVORITES:
      return { ...state, isLoading: true };
    case ActionTypes.UPDATE_FAVORITES:
      return { ...state, favorites: action.payload };
    case ActionTypes.LOGGING_OUT:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.LOGGED_OUT:
      return {
        ...state,
        isLoading: false,
        user: null,
        favorites: [],
        rooms: {},
      };
    case ActionTypes.ADD_ROOM:
      return {
        ...state,
        rooms: action.payload,
      };
    case ActionTypes.ROOM_FAILED:
      return { ...state, errMess: action.payload };
    // case ActionTypes.REMOVE_ROOM:
    //   const rValue = action.payload;
    //   const newRooms = state.rooms;
    //   delete newRooms[rValue];
    //   return { ...state, rooms: newRooms };
    default:
      return state;
  }
};
