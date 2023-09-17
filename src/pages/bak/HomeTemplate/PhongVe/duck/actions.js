import {
  LIST_PHONGVE_REQUEST,
  LIST_PHONGVE_SUCCESS,
  LIST_PHONGVE_FAIL,
  GET_SEAT,
  REMOVE_SEAT,
} from "./constants";
import api from "utils/apiUtil";

//call API
export const actFetchPhongVe = (id) => {
  return (dispatch) => {
    dispatch(actPhongVeRequest());

    api
      .get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actPhongVeSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actPhongVeFail(error));
      });
  };
};

const actPhongVeRequest = () => {
  return {
    type: LIST_PHONGVE_REQUEST,
  };
};

const actPhongVeSuccess = (data) => {
  return {
    type: LIST_PHONGVE_SUCCESS,
    payload: data,
  };
};

const actPhongVeFail = (error) => {
  return {
    type: LIST_PHONGVE_FAIL,
    payload: error,
  };
};

const actGetSeat = (value) => {
  return {
    type: GET_SEAT,
    payload: value,
  };
};

const actRemoveSeat = (value) => {
  return {
    type: REMOVE_SEAT,
    payload: value,
  };
};

export { actGetSeat, actRemoveSeat };
