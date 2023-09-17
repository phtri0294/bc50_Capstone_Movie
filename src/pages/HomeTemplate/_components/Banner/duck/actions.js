import {
  LIST_BANNER_REQUEST,
  LIST_BANNER_SUCCESS,
  LIST_BANNER_FAIL,
} from "./constants";
import api from "utils/apiUtil";

//call API
export const actFetchBanner = () => {
  return (dispatch) => {
    dispatch(actBannerRequest());

    api
      .get("QuanLyPhim/LayDanhSachBanner")
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actBannerSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actBannerFail(error));
      });
  };
};

const actBannerRequest = () => {
  return {
    type: LIST_BANNER_REQUEST,
  };
};

const actBannerSuccess = (data) => {
  return {
    type: LIST_BANNER_SUCCESS,
    payload: data,
  };
};

const actBannerFail = (error) => {
  return {
    type: LIST_BANNER_FAIL,
    payload: error,
  };
};
