import {
  LIST_BANNER_REQUEST,
  LIST_BANNER_SUCCESS,
  LIST_BANNER_FAIL,
} from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const listBannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_BANNER_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case LIST_BANNER_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case LIST_BANNER_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default listBannerReducer;
