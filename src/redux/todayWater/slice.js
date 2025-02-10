import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { deleteWater, getAllTodayWater } from './operations';

const INITIAL_STATE = {
  todayWaterData: [],
  isLoading: false,
  isError: null,
};

const todayWaterSlice = createSlice({
  name: 'todayWater',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(getAllTodayWater.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllTodayWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.todayWaterData = action.payload.data;
      })
      .addCase(getAllTodayWater.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      .addCase(deleteWater.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.todayWaterData = state.todayWaterData.filter(
          item => item._id !== action.payload
        );
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        toast.error('Delete failed. Please try again.');
      }),
});

export const todayWaterReducer = todayWaterSlice.reducer;
