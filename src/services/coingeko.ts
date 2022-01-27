import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  last30DaysPrice: [[]],
  currentPrice: '',
  error: false,
  loading: false,
  last30DaysMarketData: {},
  currentMarketData: {},
  marketLoading: false,
  marketLoadingError: false,
};

export const getPrice30DaysAgo = createAsyncThunk('get/dataChart', async (params: object) => {
  return await axios.get(`${process.env.REACT_APP_COINGECKO_URL}/coins/${process.env.REACT_APP_NAME_COIN}/ohlc`, {
    params,
  });
});

export const getCurrentPrice = createAsyncThunk('get/currentPrice', async (params: object) => {
  return await axios.get(`${process.env.REACT_APP_COINGECKO_URL}/coins/${process.env.REACT_APP_NAME_COIN}`, {
    params,
  });
});

export const getLast30DaysMarketData = createAsyncThunk('get/marketCapHistoryData', async (params: object) => {
  return await axios.get(
    `${process.env.REACT_APP_COINGECKO_URL}/coins/${process.env.REACT_APP_NAME_COIN}/market_chart`,
    {
      params,
    },
  );
});

const coingekoSlice = createSlice({
  name: 'coingeko',
  initialState,
  reducers: {},
  extraReducers: {
    [getPrice30DaysAgo.pending.type]: (state) => {
      state.loading = true;
    },
    [getPrice30DaysAgo.fulfilled.type]: (state, action) => {
      state.last30DaysPrice = action.payload.data;
      state.loading = false;
    },
    [getPrice30DaysAgo.rejected.type]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [getCurrentPrice.fulfilled.type]: (state, action) => {
      state.currentPrice = action.payload.data.market_data.current_price.usd;
      state.currentMarketData = action.payload.data.market_data;
    },
    [getLast30DaysMarketData.pending.type]: (state) => {
      state.marketLoading = true;
    },
    [getLast30DaysMarketData.rejected.type]: (state) => {
      state.marketLoadingError = true;
      state.marketLoading = false;
    },
    [getLast30DaysMarketData.fulfilled.type]: (state, action) => {
      state.last30DaysMarketData = action.payload.data;
      state.marketLoading = false;
    },
  },
});

const { reducer: coingekoReducer } = coingekoSlice;
export default coingekoReducer;
