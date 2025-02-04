import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWaterData = createAsyncThunk(
  'monthWater/fetchData',
  async (month, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/water/monthly?month=${month}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
