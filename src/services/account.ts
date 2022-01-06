import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IAccount = {
  address: string;
};

const initialState = {
  account: <IAccount | undefined>{},
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
  },
});

export const { setAccount, unSetAccount } = accountSlice.actions;

const { reducer: accountReducer } = accountSlice;

export default accountReducer;
