import {
    MANAGE_CINEMA_REQUEST,
    MANAGE_CINEMA_SUCCESS,
    MANAGE_CINEMA_FAIL,
    DETAIL_CINEMA_REQUEST,
    DETAIL_CINEMA_SUCCESS,
    DETAIL_CINEMA_FAIL,
    ADD_NEW_CALENDAR_REQUEST,
    ADD_NEW_CALENDAR_SUCCESS,
    ADD_NEW_CALENDAR_FAIL
} from './constants';

const initailState = {
    loading: false,
    cinema: [],
    detailCinema: [],
    error: null
};

const initailStateAddCalendar = {
    loading: false,
    data: null,
    error: null
};

const infoShowTimeReducer = (state = initailState, action) => {
    switch (action.type) {
        case MANAGE_CINEMA_REQUEST: {
            state.loading = true;
            state.cinema = [];
            state.error = null;
            return { ...state };
        };
        case MANAGE_CINEMA_SUCCESS: {
            state.loading = false;
            state.cinema = action.payload;
            state.error = null;
            return { ...state };
        };
        case MANAGE_CINEMA_FAIL: {
            state.loading = false;
            state.cinema = [];
            state.error = action.payload;
            return { ...state };
        };
        case DETAIL_CINEMA_REQUEST: {
            state.loading = true;
            state.detailCinema = null;
            state.error = null;
            return { ...state };
        };
        case DETAIL_CINEMA_SUCCESS: {
            state.loading = false;
            state.detailCinema = action.payload;
            state.error = null;
            return { ...state };
        };
        case DETAIL_CINEMA_FAIL: {
            state.loading = false;
            state.detailCinema = [];
            state.error = action.payload;
            return { ...state };
        };
        default:
            return { ...state };
    };
};

const addNewCalendarReducer = (state = initailStateAddCalendar, action) => {
    switch (action.type) {
        case ADD_NEW_CALENDAR_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return {
                ...state,
                // loading: true,
                // data: null,
                // error: null,
            };
        };
        case ADD_NEW_CALENDAR_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return {
                ...state,
                // loading: false,
                // data: action.payload,
                // error: null,
            };
        };
        case ADD_NEW_CALENDAR_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return {
                ...state,
                // loading: false,
                // data: null,
                // error: action.payload,
            };
        };
        default:
            return { ...state };
    };
};

export { infoShowTimeReducer, addNewCalendarReducer };
