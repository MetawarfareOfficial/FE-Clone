import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenData: [],
};

const traderJoeSlide = createSlice({
  name: 'traderJoe',
  initialState,
  reducers: {
    setTokenData: (state, action) => {
      state.tokenData = action.payload;
    },
  },
});

export const { setTokenData } = traderJoeSlide.actions;
const { reducer: traderJoeReducer } = traderJoeSlide;
export default traderJoeReducer;
