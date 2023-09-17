import {
  ADD_NEW_FILM_REQUEST,
  ADD_NEW_FILM_SUCCESS,
  ADD_NEW_FILM_FAIL,
} from './constants';

const initailState = {
  loading: false,
  data: null,
  error: null
};

const addNewFilmReducer = (state = initailState, action) => {
  switch (action.type) {
    case ADD_NEW_FILM_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    };
    case ADD_NEW_FILM_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    };
    case ADD_NEW_FILM_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    };
    default:
      return { ...state };
  };
};

export default addNewFilmReducer;