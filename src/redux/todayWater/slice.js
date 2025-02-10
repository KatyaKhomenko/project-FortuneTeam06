import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { deleteWater, getAllTodayWater, addWater } from './operations';

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
      })

      .addCase(addWater.pending, state => {
        state.isLoading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todayWaterData.push(action.payload.data);
        toast.success('Water added successfully!');
      })
      .addCase(addWater.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        toast.error('Failed to add water. Please try again.');
      }),
});

export const todayWaterReducer = todayWaterSlice.reducer;
