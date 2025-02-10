import { createAsyncThunk } from '@reduxjs/toolkit';
import { authInstance } from '../auth/operations';

export const getAllTodayWater = createAsyncThunk(
  'todayWater/getTodayWater',
  async (date, thunkApi) => {
    try {
      const { data } = await authInstance.get(`/water/day/${date}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addWater = createAsyncThunk(
  'todayWater/addTodayWater',
  async (waterData, thunkApi) => {
    try {
      const { data } = await authInstance.post('/water', waterData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  'todayWater/updateTodayWater',
  async ({ id, newWaterData }, thunkApi) => {
    try {
      const { data } = await authInstance.patch(`/water/${id}`, newWaterData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'todayWater/deleteWater',
  async (waterId, thunkApi) => {
    try {
      await authInstance.delete(`water/${waterId}`);
      return waterId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
