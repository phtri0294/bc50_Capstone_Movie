import {
  DETAIL_FILM_REQUEST,
  DETAIL_FILM_SUCCESS,
  DETAIL_FILM_FAIL,
  UPDATE_FILM_REQUEST,
  UPDATE_FILM_SUCCESS,
  UPDATE_FILM_FAIL,
} from './constants';

const initailState = {
  loading: false,
  data: null,
  error: null
};

const detailFilmReducer = (state = initailState, action) => {
  switch (action.type) {
    case DETAIL_FILM_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    };
    case DETAIL_FILM_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    };
    case DETAIL_FILM_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    };
    default:
      return { ...state };
  };
};

const updateFilmReducer = (state = initailState, action) => {
  switch (action.type) {
    case UPDATE_FILM_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    };
    case UPDATE_FILM_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    };
    case UPDATE_FILM_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    };
    default:
      return { ...state };
  };
};

export { detailFilmReducer, updateFilmReducer };