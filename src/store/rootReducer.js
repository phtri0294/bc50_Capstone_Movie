import { combineReducers } from "redux";
import listMovieReducer from "pages/HomeTemplate/ListMoviePage/duck/reducer";
import detailMovieReducer from "pages/HomeTemplate/DetailMoviePage/duck/reducer";
// import addUserReducer from "pages/AdminTemplate/AddUser/duck/reducer";
import listLichChieuReducer from "pages/HomeTemplate/_components/GetLich/duck/reducer";
import listPhongVeReducer from "pages/HomeTemplate/PhongVe/duck/reducer";
import listBannerReducer from "pages/HomeTemplate/_components/Banner/duck/reducer";

// import authReducer from "pages/AdminTemplate/AuthPage/duck/reducer";
import loginReducer from "../pages/AdminTemplate/LoginPage/duck/reducer";
import registerReducer from "../pages/AdminTemplate/RegisterPage/duck/reducer";

import {
  manageUserReducer,
  deleteUserReducer,
} from './../pages/AdminTemplate/Dashboard/duck/reducer';
import addNewUserReducer from './../pages/AdminTemplate/Dashboard/AddUser/duck/reducer';
import {
  updateUserReducer,
  detailUserReducer,
} from "./../pages/AdminTemplate/Dashboard/EditUser/duck/reducer";

import {
  manageFilmReducer,
  deleteFilmReducer,
} from "./../pages/AdminTemplate/Film/duck/reducer";
import addNewFilmReducer from "./../pages/AdminTemplate/Film/AddFilm/duck/reducer";
import {
  updateFilmReducer,
  detailFilmReducer
} from "./../pages/AdminTemplate/Film/EditFilm/duck/reducer";

import {
  infoShowTimeReducer,
  addNewCalendarReducer
} from "../pages/AdminTemplate/Film/Showtime/duck/reducer";

const rootReducer = combineReducers({
  //child reducer
  listMovieReducer,
  detailMovieReducer,
  // addUserReducer,
  listLichChieuReducer,
  listPhongVeReducer,
  listBannerReducer,

  // authReducer,
  loginReducer,
  registerReducer,

  manageUserReducer,
  deleteUserReducer,
  addNewUserReducer,
  detailUserReducer,
  updateUserReducer,

  manageFilmReducer,
  deleteFilmReducer,
  addNewFilmReducer,
  detailFilmReducer,
  updateFilmReducer,

  infoShowTimeReducer,
  addNewCalendarReducer
});

export default rootReducer;
