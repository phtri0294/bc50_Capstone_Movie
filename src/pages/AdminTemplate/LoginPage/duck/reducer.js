import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAIL,
    LOG_IN_CLEAR,
} from "./constants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state }
        }
        case LOG_IN_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state }
        }
        case LOG_IN_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state }
        }
        case LOG_IN_CLEAR: {
            state.loading = false;
            state.data = null;
            state.error = null;
            return { ...state }
        }
        default:
            return { ...state }
    }
};

export default loginReducer;