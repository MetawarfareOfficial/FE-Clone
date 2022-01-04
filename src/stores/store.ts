import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;
export default store;
