import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo, updateUser } from "./operations";


const INITIAL_STATE = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice ({
    name: 'user',
    initialState: INITIAL_STATE,
    extraReducers: builder => builder
    .addCase(getUserInfo.pending, ( state ) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(getUserInfo.fulfilled, ( state, action ) => {
        state.isLoading = false;
        state.user = action.payload;
    })
    .addCase(getUserInfo.rejected, ( state, action ) => {
        state.isLoading = false;
        state.error = action.payload;
    })

    .addCase(updateUser.pending, ( state ) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(updateUser.fulfilled, ( state, action ) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload };
    })
    .addCase(updateUser.rejected, ( state, action ) => {
        state.isLoading = false;
        state.error = action.payload;
    })
})

export const userReduser = userSlice.reducer;
