import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./Home/homeReducer";
import hotelListReducer from "./HotelList/hotelListReducer";
import userReducer from "./Users/userReducer";

const store = configureStore({
  reducer: {
    homeReducer,
    hotelListReducer,
    userReducer
  }
});


export default store;