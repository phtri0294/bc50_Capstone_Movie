import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_CLEAR,
} from "./constants";
import api from "utils/apiUtil";

const actLogin = (user, navigate) => {
  return (dispatch) => {
    dispatch(actLoginRequest());
    api
      .post("QuanLyNguoiDung/DangNhap", user)
      .then((result) => {
        if (result.data.statusCode === 200) {
          const previousRoute = localStorage.getItem("previousRoute");
          const user = result.data.content;
          if (user.maLoaiNguoiDung === "QuanTri") {
            if (previousRoute) {
              dispatch(actLoginSuccess(user));
              localStorage.setItem("UserAdmin", JSON.stringify(user));
              localStorage.removeItem("previousRoute"); // Remove the saved route
              navigate(previousRoute, { replace: true });
            } else {
              dispatch(actLoginSuccess(user));
              localStorage.setItem("UserAdmin", JSON.stringify(user));
              navigate("/admin/dashboard", { replace: true });
            }
          } else {
            if (previousRoute) {
              dispatch(actLoginSuccess(user));
              localStorage.setItem("Customer", JSON.stringify(user));
              localStorage.removeItem("previousRoute"); // Remove the saved route
              navigate(previousRoute, { replace: true });
            } else {
              dispatch(actLoginSuccess(user));
              localStorage.setItem("Customer", JSON.stringify(user));
              navigate("/", { replace: true });
            }
          }
        }
      })
      .catch((error) => {
        dispatch(actLoginFail(error.response.data.content));
      });
  };
};

const actLogout = (navigate) => {
  if (localStorage.getItem("UserAdmin")) {
    localStorage.removeItem("UserAdmin");
    navigate("/LOG_IN", { replace: true });
  } else if (localStorage.getItem("Customer")) {
    localStorage.removeItem("Customer");
    navigate("/", { replace: true });
  }
  return {
    type: LOG_IN_CLEAR,
  };
};

const actLoginRequest = () => {
  return {
    type: LOG_IN_REQUEST,
  };
};

const actLoginSuccess = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    payload: data,
  };
};

const actLoginFail = (error) => {
  return {
    type: LOG_IN_FAIL,
    payload: error,
  };
};

export { actLogin, actLogout };
