import {
    ADD_NEW_USER_REQUEST,
    ADD_NEW_USER_SUCCESS,
    ADD_NEW_USER_FAIL,
  } from './constants';

const initailState = {
    loading: false,
    data: null,
    error: null,
};

const addNewUserReducer = (state = initailState, action) => {
    switch (action.type) {
        case ADD_NEW_USER_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        };
        case ADD_NEW_USER_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        };
        case ADD_NEW_USER_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        };
        default:
            return { ...state };
    };
};

export default addNewUserReducer;