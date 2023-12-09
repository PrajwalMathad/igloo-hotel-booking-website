import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hotelList: [],
    hotel: {}
};

const hotelListSlice = createSlice({
    name: "hotelList",
    initialState,
    reducers: {
        setHotelList: (state, action) => {
            state.hotelList = action.payload;
        },
        setHotel: (state, action) => {
            state.hotel = action.payload;
        }
    },
});


export const { setHotelList, setHotel } = hotelListSlice.actions;
export default hotelListSlice.reducer;