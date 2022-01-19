import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IAccount = {
  address: string;
};

const initialState = {
  account: <IAccount | undefined>{},
  isLogin: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<IAccount | undefined>) => {
      state.account = action.payload;
    },
    unSetAccount: (state) => {
      state.account = undefined;
    },
    setLogin: (state) => {
      state.isLogin = true;
    },
    unSetLogin: (state) => {
      state.isLogin = false;
    },
  },
});

export const { setAccount, unSetAccount, setLogin, unSetLogin } = accountSlice.actions;

const { reducer: accountReducer } = accountSlice;

export default accountReducer;
