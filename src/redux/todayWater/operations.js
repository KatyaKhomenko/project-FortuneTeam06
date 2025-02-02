import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authInstance = axios.create({
  baseURL: 'https://673b0ea4339a4ce4451a6048.mockapi.io/',
});

export const getAllTodayWater = createAsyncThunk(
  'todayWater/getTodayWater',
  async (_, thunkApi) => {
    try {
      const { data } = await authInstance.get('/todayWater');
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'todayWater/deleteWater',
  async (id, thunkApi) => {
    try {
      const response = await authInstance.delete(`/todayWater/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
