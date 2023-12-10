import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    userBookings: null
};

const userSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },

        setUserBookings: (state, action) => {
            state.userBookings = action.payload;
        }
    },
});


export const { setCurrentUser, setUserBookings } = userSlice.actions;
export default userSlice.reducer;