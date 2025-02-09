import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//import { authInstance } from "../../redux/auth/operations";

const token = '9ufcNkWZbJwNL2re2ZCZ+xflsZEBZrXyFp8sBQFn';

export const authInstance = axios.create({
  baseURL: 'https://water-tracker-x26o.onrender.com/',
});

export const setToken = (token) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

setToken(token);

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (_, thunkApi) => {
      try {
          console.log('Making request to fetch user info...');
          const { data } = await authInstance.get('/user');
          return data;
      } catch (error) {
          console.error('Error fetching user info:', error);
          return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userData, thunkApi) => {
      try {
          console.log(userData);
          console.log('Making request to upgrade user info...');
          const { data } = await authInstance.patch('/user', userData);
          return data.data.user;
      } catch (error) {
          console.error('Error fetching user info:', error);
          return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    'auth/change-password',
    async (userPassword, thunkApi) => {
      try {
          console.log(userPassword);
          console.log('Making request to update password...');
          const { data } = await authInstance.post('/auth/change-password', userPassword);
          console.log('Received Updated data from server:', data);
          return data;
      } catch (error) {
          console.error('Error update password:', error);
          return thunkApi.rejectWithValue(error.message);
        }
    }
);
