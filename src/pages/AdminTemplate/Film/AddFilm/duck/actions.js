import {
  ADD_NEW_FILM_REQUEST,
  ADD_NEW_FILM_SUCCESS,
  ADD_NEW_FILM_FAIL,
} from './constants';
import api from 'utils/apiUtil';

const actAddNewFilm = (formData, navigate) => {
  return (dispatch) => {
    dispatch(actAddNewFilmRequest());
    api.post('QuanLyPhim/ThemPhimUploadHinh', formData)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actAddNewFilmSucess(result.data.content));
          alert('Bạn đã thêm bộ phim mới thành công!');
          navigate("/admin/film", { replace: true });
        }
      })
      .catch((error) => {
        dispatch(actAddNewFilmFail(error));
        alert(error.message);
      })
  };
};

const actAddNewFilmRequest = () => {
  return {
    type: ADD_NEW_FILM_REQUEST,
  };
};

const actAddNewFilmSucess = (data) => {
  return {
    type: ADD_NEW_FILM_SUCCESS,
    payload: data
  };
};

const actAddNewFilmFail = (error) => {
  return {
    type: ADD_NEW_FILM_FAIL,
    payload: error
  };
};

export { actAddNewFilm};

