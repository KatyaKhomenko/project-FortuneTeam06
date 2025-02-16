import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authInstance = axios.create({
  baseURL: 'https://water-tracker-x26o.onrender.com/',
  withCredentials: true,
});

export const setToken = token => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  authInstance.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstance.post('/auth/register', formData);
      return data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await authInstance.post('/auth/login', formData);
      setToken(data.data.accessToken);
      localStorage.setItem('sessionId', data.data.sessionId);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (sessionId, thunkApi) => {
    try {
      await authInstance.post('/auth/logout', { sessionId });
      localStorage.removeItem('sessionId');
      clearToken();
      return {};
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
