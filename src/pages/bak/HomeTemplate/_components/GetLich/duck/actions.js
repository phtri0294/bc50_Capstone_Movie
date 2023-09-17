import {
  LIST_LICH_REQUEST,
  LIST_LICH_SUCCESS,
  LIST_LICH_FAIL,
} from "./constants";
import api from "utils/apiUtil";

//call API
export const actFetchLichChieu = () => {
  return (dispatch) => {
    dispatch(actLichChieuRequest());

    api
      .get("QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP11")
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actLichChieuSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actLichChieuFail(error));
      });
  };
};

export const actFetchHeThongRap = () => {
  return (dispatch) => {
    dispatch(actLichChieuRequest());

    api
      .get("QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP11")
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actLichChieuSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actLichChieuFail(error));
      });
  };
};

const actLichChieuRequest = () => {
  return {
    type: LIST_LICH_REQUEST,
  };
};

const actLichChieuSuccess = (data) => {
  return {
    type: LIST_LICH_SUCCESS,
    payload: data,
  };
};

const actLichChieuFail = (error) => {
  return {
    type: LIST_LICH_FAIL,
    payload: error,
  };
};
