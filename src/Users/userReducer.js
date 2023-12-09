import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {}
};

const userSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});


export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;