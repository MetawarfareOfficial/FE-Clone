import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const COINGECKO_URL = 'https://api.coingecko.com/api/v3';

export const coinsDetail = async (id: string) => {
  try {
    const rs = await axios.get(`${COINGECKO_URL}/coins/${id}`);
    return rs?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const coinsHistory = async (id: string, params: object) => {
  try {
    const rs = await axios.get(`${COINGECKO_URL}/coins/${id}/market_chart`, { params });
    return rs?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const coingekoSlice = createSlice({
  name: 'coingeko',
  initialState: {
    detail: [],
    history: [],
  },
  // Todo
  reducers: {
    // getDetail: (state, action) => {
    //   // Todo
    //   state.detail = [action.payload];
    // },
    // getHistory: (state, action) => {
    //   // Todo
    //   state.history = [action.payload];
    // },
  },
});

// export const { getDetail, getHistory } = coingekoSlice.actions;

const { reducer: coingekoReducer } = coingekoSlice;
export default coingekoReducer;
