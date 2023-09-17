import {
  LIST_PHONGVE_REQUEST,
  LIST_PHONGVE_SUCCESS,
  LIST_PHONGVE_FAIL,
  GET_SEAT,
  REMOVE_SEAT,
} from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
  orderList: [],
};
const listPhongVeReducer = (state = initialState, action) => {

  switch (action.type) {
    case LIST_PHONGVE_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case LIST_PHONGVE_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;

      return { ...state };
    }

    case LIST_PHONGVE_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    case GET_SEAT: {
      let orderList = [...state.orderList];
      const seat = JSON.parse(action.payload);
      orderList.push(seat);
      state.orderList = orderList;
      console.log(state.orderList);
      return { ...state };
    }
    case REMOVE_SEAT: {
      let orderList = [...state.orderList];
      const seat = JSON.parse(action.payload);
      const index = orderList.findIndex((order) => order.maGhe === seat.maGhe);
      if (index !== -1) {
        orderList.splice(index, 1);

        //cập nhật lại state
        state.orderList = orderList;
      }
      console.log(state.orderList);
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default listPhongVeReducer;
