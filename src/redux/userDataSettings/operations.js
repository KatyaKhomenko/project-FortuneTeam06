import { createAsyncThunk } from "@reduxjs/toolkit";

import { authInstance } from "redux/auth/operations";
import toast from "react-hot-toast";

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (_, thunkApi) => {
        try {
            const  { data }  = await authInstance.get('/user');

            return data.data.user;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userData, thunkApi) => {
        try {
            const { data } = await authInstance.patch(`/user`, userData);

            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
