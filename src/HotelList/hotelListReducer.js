import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullHotelList: [],
    hotelList: [],
    hotel: null
};

const hotelListSlice = createSlice({
    name: "hotelList",
    initialState,
    reducers: {
        setFullHotelList: (state, action) => {
            state.fullHotelList = action.payload;
        },
        setHotelList: (state, action) => {
            state.hotelList = action.payload;
        },
        setHotel: (state, action) => {
            state.hotel = action.payload;
        }
    },
});


export const { setHotelList, setHotel, setFullHotelList } = hotelListSlice.actions;
export default hotelListSlice.reducer;