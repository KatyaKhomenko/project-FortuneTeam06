import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//import { authInstance } from "../../redux/auth/operations";

const token = '9WK4LdFNN5Q/QSYN4kM9ntZpU2UGiFih4SarIAf5';

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
            console.log('Received data from server:', data);
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
          const { data } = await authInstance.patch(`/user`, userData);
          console.log('Received Updated data from server:', data);
          return data.data.user;
      } catch (error) {
          console.error('Error fetching user info:', error);
          return thunkApi.rejectWithValue(error.message);
        }
    }
);
