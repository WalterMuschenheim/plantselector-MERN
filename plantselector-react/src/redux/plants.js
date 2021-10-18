import * as ActionTypes from "./ActionTypes";

export const Plants = (
  state = { isLoading: true, errMess: null, plants: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.PLANTS_LOADING:
      return { ...state, isLoading: true, errMess: null, plants: [] };
    case ActionTypes.ADD_PLANTS:
      action.payload.explainers.forEach(function (explainer, index) {
        action.payload.plants.splice(
          Math.floor(Math.random() * action.payload.plants.length) + index * 3,
          0,
          explainer
        );
      });
      return { ...state, isLoading: false, plants: action.payload.plants };
    default:
      return state;
  }
};
