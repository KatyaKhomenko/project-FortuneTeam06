import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authInstance = axios.create({
  baseURL: 'https://water-tracker-x26o.onrender.com/',
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
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export const refresh = createAsyncThunk('auth/refresh', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.accessToken;
  if (!token) {
    return thunkApi.rejectWithValue('No valid token');
  }

  try {
    setToken(token);

    const response = await authInstance.get('/auth/refresh');
    return response.data; // Зберегти тільки дані відповіді
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    await authInstance.post('/auth/logout');
    clearToken();
    return; // Не потрібно повертати нічого
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
