import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWaterData = createAsyncThunk(
  'monthWater/fetchData',
  async (month, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');

      const response = await fetch(
        `https://water-tracker-x26o.onrender.com/water/month/${month}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWaterDataByDay = createAsyncThunk(
  'monthWater/fetchDataByDay',
  async (date, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');

      const response = await fetch(
        `https://water-tracker-x26o.onrender.com/water/day/${date}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
