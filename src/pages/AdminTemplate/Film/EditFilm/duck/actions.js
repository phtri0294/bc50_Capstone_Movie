import {
  DETAIL_FILM_REQUEST,
  DETAIL_FILM_SUCCESS,
  DETAIL_FILM_FAIL,
  UPDATE_FILM_REQUEST,
  UPDATE_FILM_SUCCESS,
  UPDATE_FILM_FAIL,
} from './constants';
import api from 'utils/apiUtil';

const actDetailFilm = (id) => {
  return (dispatch) => {
    dispatch(actDetailFilmRequest());
    api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)

      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actDetailFilmSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actDetailFilmFail(error));
        alert(error.message);
      })
  };
};

const actDetailFilmRequest = () => {
  return {
    type: DETAIL_FILM_REQUEST,
  };
};

const actDetailFilmSuccess = (data) => {
  return {
    type: DETAIL_FILM_SUCCESS,
    payload: data
  };
};

const actDetailFilmFail = (error) => {
  return {
    type: DETAIL_FILM_FAIL,
    payload: error
  };
};

const actUpdateFilm = (formData, navigate) => {
  return (dispatch) => {
    dispatch(actUpdateFilmRequest());
    api.post('/QuanLyPhim/CapNhatPhimUpload', formData)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actUpdateFilmSuccess(result.data.content));
          alert('Cập nhật thông tin phim thành công')
          navigate('/admin/film', { replace: true })
        }
      })
      .catch((error) => {
        dispatch(actUpdateFilmFail(error));
        alert(error.message);
      });
  };
};

const actUpdateFilmRequest = () => {
  return {
    type: UPDATE_FILM_REQUEST,
  };
};

const actUpdateFilmSuccess = (data) => {
  return {
    type: UPDATE_FILM_SUCCESS,
    payload: data,
  };
};

const actUpdateFilmFail = (error) => {
  return {
    type: UPDATE_FILM_FAIL,
    payload: error,
  };
};

export { actDetailFilm, actUpdateFilm };

