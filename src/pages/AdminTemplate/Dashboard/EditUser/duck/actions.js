import {
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    SET_USER_DETAIL,
} from './constants';
import api from 'utils/apiUtil';

const actUpdateUser = (formData, navigate) => {
    return (dispatch) => {
        dispatch(actUpdateUserRequest());
        api.post('QuanLyNguoiDung/CapNhatThongTinNguoiDung', formData)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actUpdateUserSuccess(result.data.content));
                    alert('Cập nhật thông tin người dùng thành công');
                    navigate('/admin/dashboard', { replace: true })
                }
            })
            .catch((error) => {
                dispatch(actUpdateUserFail(error));
                alert(error.message);
            });
    };
};

const actUpdateUserRequest = () => {
    return {
        type: UPDATE_USER_REQUEST,
    };
};

const actUpdateUserSuccess = (data) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: data,
    };
};

const actUpdateUserFail = (error) => {
    return {
        type: UPDATE_USER_FAIL,
        payload: error,
    };
};

const actDetailUser = (id) => ({
    type: SET_USER_DETAIL,
    payload: id,
});

export { actUpdateUser, actDetailUser };

