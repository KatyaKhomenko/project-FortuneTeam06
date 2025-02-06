import { createAsyncThunk } from '@reduxjs/toolkit';
import { authInstance } from '../auth/operations';

const handleError = (error, rejectWithValue) => {
  if (error.response) {
    const status = error.response.status;
    const axiosCode = error.code || 'UNKNOWN_ERROR';

    const serverMessage =
      error.response.data?.data?.message || error.response.data?.message;

    if (serverMessage) {
      return rejectWithValue(serverMessage);
    }

    return rejectWithValue(`Error ${status} (${axiosCode}): Server error`);
  }

  return rejectWithValue(
    `Network error (${error.code || 'NO_CODE'}): ${error.message}`
  );
};

export const fetchMonthWater = createAsyncThunk(
  'monthWater/fetchMonthWater',
  async (yearMonth, { rejectWithValue }) => {
    try {
      const { data } = await authInstance.get(`/water/month/${yearMonth}`);
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const fetchDayWater = createAsyncThunk(
  'dayWater/fetchDayWater',
  async (date, { rejectWithValue }) => {
    try {
      const { data } = await authInstance.get(`/water/day/${date}`);
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
