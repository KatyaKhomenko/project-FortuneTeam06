import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refresh, register } from './operations';

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  isLoading: false,
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
  state.user = null;
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
      .addCase(refresh.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logout.rejected, handleRejected),
});

export const authReducer = authSlice.reducer;
