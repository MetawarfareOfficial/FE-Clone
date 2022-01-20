import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import accountReducer from 'services/account';
import coingekoReducer from 'services/coingeko';
import dataContractReducer from 'services/contract';

const store = configureStore({
  reducer: {
    user: accountReducer,
    coingeko: coingekoReducer,
    contract: dataContractReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;
export default store;
