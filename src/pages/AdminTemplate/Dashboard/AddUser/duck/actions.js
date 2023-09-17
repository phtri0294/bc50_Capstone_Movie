import {
    ADD_NEW_USER_REQUEST,
    ADD_NEW_USER_SUCCESS,
    ADD_NEW_USER_FAIL,
} from './constants';
import api from 'utils/apiUtil';

const actAddNewUser = (formData, navigate) => {
    return (dispatch) => {
        dispatch(actAddNewRequest());
        api.post('QuanLyNguoiDung/ThemNguoiDung', formData)
            .then((result) => {
                dispatch(actAddNewSuccess(result.data.content));
                alert('Bạn đã thêm người dùng mới thành công!');
                navigate("/admin/dashboard", { replace: true });
            })
            .catch((error) => {
                dispatch(actAddNewFail(error));
                alert(error.message);
            })
    };
};

const actAddNewRequest = () => {
    return {
        type: ADD_NEW_USER_REQUEST,
    };
};

const actAddNewSuccess = (data) => {
    return {
        type: ADD_NEW_USER_SUCCESS,
        payload: data
    };
};

const actAddNewFail = (error) => {
    return {
        type: ADD_NEW_USER_FAIL,
        payload: error
    };
};

export { actAddNewUser };
