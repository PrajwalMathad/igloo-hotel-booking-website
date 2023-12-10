import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    currentUser: null,
    userList: [],
    userBookings: null
};

const userSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },

        setUserList: (state, action) => {
            state.userList = action.payload;
        },

        setUserBookings: (state, action) => {
            state.userBookings = action.payload;
        },

        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    },
});


export const { setCurrentUser, setUserBookings, setUserList, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;