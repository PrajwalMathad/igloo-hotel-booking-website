import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchDetails: {
        city: "",
        from: "",
        to: "",
        rooms: 0
    }
};

const homeSlice = createSlice({
    name: "searchDetails",
    initialState,
    reducers: {
        setSearchDetails: (state, action) => {
            state.searchDetails = action.payload;
        },
    },
});


export const { setSearchDetails } = homeSlice.actions;
export default homeSlice.reducer;