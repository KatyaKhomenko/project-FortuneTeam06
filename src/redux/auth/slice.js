import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from './operations';

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  isLoading: false, //?
  error: null,
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.user = null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, handleRejected)
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, INITIAL_STATE)
      .addCase(logout.rejected, handleRejected),
});
export const authReducer = authSlice.reducer;

