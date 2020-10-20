/* eslint-disable prettier/prettier */
const { UI_START_LOADING, UI_STOP_LOADING } = require('../actions/actionTypes');

// UI_START_LOADING, UI_STOP_LOADING
const initialState = {
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
