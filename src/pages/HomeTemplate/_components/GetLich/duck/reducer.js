import {
  LIST_LICH_REQUEST,
  LIST_LICH_SUCCESS,
  LIST_LICH_FAIL,
} from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const listLichChieuReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_LICH_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case LIST_LICH_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case LIST_LICH_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default listLichChieuReducer;
