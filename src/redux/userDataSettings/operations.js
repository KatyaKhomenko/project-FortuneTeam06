import { createAsyncThunk } from "@reduxjs/toolkit";

import { authInstance } from "../../redux/auth/operations";

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (_, thunkApi) => {
      try {
        console.log('Making request');
          const { data } = await authInstance.get('/user');
          return data;
      } catch (error) {
          return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userData, thunkApi) => {
      try {
          const { data } = await authInstance.patch('/user', userData);
          return data.data.user;
      } catch (error) {
          return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    'auth/change-password',
    async (userPassword, thunkApi) => {
      try {
          const { data } = await authInstance.patch('/auth/change-password', userPassword);
          return data;
      } catch (error) {
          return thunkApi.rejectWithValue(error.message);
        }
    }
);
