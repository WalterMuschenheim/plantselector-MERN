import * as ActionTypes from "./ActionTypes";

export const UserForm = (
  state = {
    name: undefined,
    password: undefined,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_FORM:
      return { ...state, [action.payload.key]: action.payload.value };

    default:
      return state;
  }
};
