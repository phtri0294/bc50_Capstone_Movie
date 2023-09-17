import {
  MANAGE_FILM_REQUEST,
  MANAGE_FILM_SUCCESS,
  MANAGE_FILM_FAIL,
  DELETE_FILM_REQUEST,
  DELETE_FILM_SUCCESS,
  DELETE_FILM_FAIL,
} from './constants';

const initailState = {
  loading: false,
  data: null,
  error: null
};

const manageFilmReducer = (state = initailState, action) => {
  switch (action.type) {
    case MANAGE_FILM_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    };
    case MANAGE_FILM_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    };
    case MANAGE_FILM_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    };
    default:
      return { ...state };
  };
};

const deleteFilmReducer = (state = initailState, action) => {
  switch (action.type) {
    case DELETE_FILM_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    };
    case DELETE_FILM_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    };
    case DELETE_FILM_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    };
    default:
      return { ...state };
  };
};

export { manageFilmReducer, deleteFilmReducer };
