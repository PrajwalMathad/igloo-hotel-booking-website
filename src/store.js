import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./Home/homeReducer";
import hotelListReducer from "./HotelList/hotelListReducer";


const store = configureStore({
  reducer: {
    homeReducer,
    hotelListReducer
  }
});


export default store;