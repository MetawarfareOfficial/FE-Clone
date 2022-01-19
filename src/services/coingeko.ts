import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [[]],
  error: false,
  loading: false,
};

export const coinsPrices = createAsyncThunk('get/dataChart', async (params: object) => {
  return await axios.get(`${process.env.REACT_APP_COINGECKO_URL}/coins/${process.env.REACT_APP_NAME_COIN}/ohlc`, {
    params,
  });
});

const coingekoSlice = createSlice({
  name: 'coingeko',
  initialState,
  reducers: {},
  extraReducers: {
    [coinsPrices.pending.type]: (state) => {
      state.loading = true;
    },
    [coinsPrices.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    },
    [coinsPrices.rejected.type]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

const { reducer: coingekoReducer } = coingekoSlice;
export default coingekoReducer;
