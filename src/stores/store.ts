import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import accountReducer from 'services/account';
import coingekoReducer from 'services/coingeko';
import dataContractReducer from 'services/contract';
import investmentsReducer from 'services/investments';
import traderJoeReducer from 'services/traderJoe';
import swapReducer from 'services/swap';

const store = configureStore({
  reducer: {
    user: accountReducer,
    coingeko: coingekoReducer,
    contract: dataContractReducer,
    investments: investmentsReducer,
    traderJoe: traderJoeReducer,
    swap: swapReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;
export default store;
