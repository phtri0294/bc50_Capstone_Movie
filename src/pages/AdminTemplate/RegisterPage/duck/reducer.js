import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "./constants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state }
        }
        case REGISTER_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state }
        }
        case REGISTER_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state }
        }
        default:
            return { ...state }
    };
};

export default registerReducer;