import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenData: [],
};

const traderJoeSlide = createSlice({
  name: 'traderJoe',
  initialState,
  reducers: {
    setTokenData: (state, action) => {
      if (action.payload) {
        state.tokenData = action.payload;
        return;
      }
      state.tokenData = [];
    },
  },
});

export const { setTokenData } = traderJoeSlide.actions;
const { reducer: traderJoeReducer } = traderJoeSlide;
export default traderJoeReducer;
