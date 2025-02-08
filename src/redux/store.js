import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/slice';
import { todayWaterReducer } from './todayWater/slice';
import { monthWaterReducer } from './monthWater/slice';
import { userReduser } from './userDataSettings/slice';

const authConfig = {
  key: 'auth',
  storage,
  // whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    userData: userReduser,
    auth: persistReducer(authConfig, authReducer),
    todayWater: todayWaterReducer,
    monthWater: monthWaterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
