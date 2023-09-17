import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_CLEAR_DATA,
} from "./constants";
import api from "utils/apiUtil";

//Giả sử BE trả time exp 60 * 60 * 1000
const TIME_EXP = 60 * 60 * 1000;

export const actAuth = (user, navigate) => {
  return (dispatch) => {
    dispatch(actAuthRequest());

    api
      .post("QuanLyNguoiDung/DangNhap", user)
      .then((result) => {
        if (result.data.statusCode === 200) {
          console.log(result.data);
          const user = result.data.content;

          // if (!(user.maLoaiNguoiDung === "QuanTri")) {
          //   //show error
          //   const error = {
          //     response: {
          //       data: {
          //         content: "Bạn không có quyền truy cập!",
          //       },
          //     },
          //   };
          //   return Promise.reject(error);
          // }

          //tính thời gian hết hạn (tương lai = time now + exp)
          const date = new Date().getTime();
          const exp = date + TIME_EXP;
          //setLocalStorage exp
          localStorage.setItem("exp", exp);
          //dispatch tới action timoutLogout;
          dispatch(actTimeoutLogout(navigate, TIME_EXP));

          //QuanTri => lưu thông tin user
          dispatch(actAuthSuccess(user));

          const userType = user.maLoaiNguoiDung;

          switch (userType) {
            case "QuanTri":
              //QuanTri => lưu trang thái login
              localStorage.setItem("UserAdmin", JSON.stringify(user));

              //QuanTri => redirect admin/dashboard
              navigate("/admin/dashboard", { replace: true });
              break;

            case "KhachHang":
              //QuanTri => lưu trang thái login
              localStorage.setItem("UserCommon", JSON.stringify(user));

              //QuanTri => redirect admin/dashboard
              navigate("/", { replace: true });
              break;
          }
        }
      })
      .catch((error) => {
        dispatch(actAuthFail(error));
      });
  };
};

export const actLogout = (navigate) => {
  //remove localStorage removeItem()
  localStorage.removeItem("UserAdmin");
  localStorage.removeItem("exp");

  //redirect /auth
  navigate("/auth", { replace: true });

  //clear auth reducer
  return {
    type: AUTH_CLEAR_DATA,
  };
};

const actTimeoutLogout = (navigate, exp) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(actLogout(navigate));
    }, exp);
  };
};

export const actTryLogin = (navigate) => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("UserAdmin"));

    if (!user) return;

    const exp = localStorage.getItem("exp");
    const date = new Date().getTime();

    if (date > exp) {
      //logout
      dispatch(actLogout(navigate));
      return;
    }

    //set timeout
    dispatch(actTimeoutLogout(navigate, exp - date));
    dispatch(actAuthSuccess(user));
  };
};

const actAuthRequest = () => {
  return {
    type: AUTH_REQUEST,
  };
};

const actAuthSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
};

const actAuthFail = (error) => {
  return {
    type: AUTH_FAIL,
    payload: error,
  };
};
