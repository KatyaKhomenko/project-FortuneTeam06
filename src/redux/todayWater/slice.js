import { createSlice } from '@reduxjs/toolkit';

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
        state.todayWaterData = action.payload;
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
        state.todayWaterData = state.todayWaterData.filter(
          item => item.id !== action.payload.id
        );
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      }),
});

export const todayWaterReducer = todayWaterSlice.reducer;
