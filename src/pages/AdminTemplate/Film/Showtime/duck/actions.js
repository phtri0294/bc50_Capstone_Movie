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
import api from 'utils/apiUtil';

const actManageCinema = () => {
    return (dispatch) => {
        dispatch(actManageCinemaRequest());
        api.get('QuanLyRap/LayThongTinHeThongRap')
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actManageCinemaSucess(result.data.content));
                }
            })
            .catch((error) => {
                dispatch(actManageCinemaFail(error));
            })
    };
};

const actManageCinemaRequest = () => {
    return {
        type: MANAGE_CINEMA_REQUEST,
    };
};

const actManageCinemaSucess = (data) => {
    return {
        type: MANAGE_CINEMA_SUCCESS,
        payload: data
    };
};

const actManageCinemaFail = (error) => {
    return {
        type: MANAGE_CINEMA_FAIL,
        payload: error
    };
};

const actDetailCinema = (id) => {
    return (dispatch) => {
        dispatch(actDetailCinemaRequest());
        api.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actDetailCinemaSucess(result.data.content));
                }
            })
            .catch((error) => {
                dispatch(actDetailCinemaFail(error));
            })
    };
};

const actDetailCinemaRequest = () => {
    return {
        type: DETAIL_CINEMA_REQUEST,
    };
};

const actDetailCinemaSucess = (data) => {
    return {
        type: DETAIL_CINEMA_SUCCESS,
        payload: data
    };
};

const actDetailCinemaFail = (error) => {
    return {
        type: DETAIL_CINEMA_FAIL,
        payload: error
    };
};

const actAddNewCalendar = (formData, navigate) => {
    return (dispatch) => {
        dispatch(actAddNewCalendarRequest());
        api.post('QuanLyDatVe/TaoLichChieu', formData)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actAddNewCalendarSucess(result.data.content));
                    alert('Bạn đã tạo lịch chiếu thành công');
                    navigate('/admin/film', { replace: true })
                }
            })
            .catch((error) => {
                dispatch(actAddNewCalendarFail(error));
                alert(error.message);
            })
    };
};

const actAddNewCalendarRequest = () => {
    return {
        type: ADD_NEW_CALENDAR_REQUEST,
    };
};

const actAddNewCalendarSucess = (data) => {
    return {
        type: ADD_NEW_CALENDAR_SUCCESS,
        payload: data
    };
};

const actAddNewCalendarFail = (error) => {
    return {
        type: ADD_NEW_CALENDAR_FAIL,
        payload: error
    };
};

export { actManageCinema, actDetailCinema, actAddNewCalendar };