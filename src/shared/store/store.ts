import { configureStore } from '@reduxjs/toolkit';

import { studentsApi } from './api/studentsApi';

export const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([studentsApi.middleware]),
});

export type TypeRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
