import * as ActionTypes from "./ActionTypes";

export const Header = (
  state = {
    collapse: true,
    guideHeight: "",
    navHeight: 0,
    sticky: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.COLLAPSE:
      return { ...state, collapse: !state.collapse };
    case ActionTypes.UPDATE_GUIDE_HEIGHT:
      return { ...state, guideHeight: action.payload };
    case ActionTypes.UPDATE_NAV_HEIGHT:
      return { ...state, navHeight: action.payload };
    case ActionTypes.UPDATE_STICKY:
      return { ...state, sticky: action.payload };
    default:
      return state;
  }
};
