import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import accountReducer from 'services/account';

const store = configureStore({
  reducer: {
    user: accountReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;
export default store;
