import * as ActionTypes from "./ActionTypes";

/* export */ const Rooms = (
  state = {
    rooms: {},
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_ROOM:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.room]: action.payload.criteria,
        },
      };
    case ActionTypes.ROOM_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.REMOVE_ROOM:
      const rValue = action.payload;
      const newRooms = state.rooms;
      delete newRooms[rValue];
      return { ...state, rooms: newRooms };
    default:
      return state;
  }
};
