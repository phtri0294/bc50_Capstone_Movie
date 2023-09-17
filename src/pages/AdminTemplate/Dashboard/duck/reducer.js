import {
    MANAGE_USER_REQUEST,
    MANAGE_USER_SUCCESS,
    MANAGE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from './constants';

const initailState = {
    loading: false,
    data: null,
    error: null,
};

const manageUserReducer = (state = initailState, action) => {
    switch (action.type) {
        case MANAGE_USER_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        }
        case MANAGE_USER_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        }
        case MANAGE_USER_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        }
        default:
            return { ...state };
    }
};

const deleteUserReducer = (state = initailState, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        }
        case DELETE_USER_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        }
        case DELETE_USER_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        }
        default:
            return { ...state };
    }
};

export { manageUserReducer, deleteUserReducer };