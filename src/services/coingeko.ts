import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COINGECKO_URL } from './config';

export type Detail = {
  detail: object;
};
export type History = {
  history: object;
};

const initialState = {
  detail: <Detail | undefined>{},
  history: <History | undefined>{},
};

const coingekoSlice = createSlice({
  name: 'coingeko',
  initialState,
  reducers: {
    getDetail: (state, action: PayloadAction<any>) => {
      state.detail = action.payload;
    },
    getHistory: (state, action: PayloadAction<any>) => {
      state.history = action.payload;
    },
  },
});

export const { getDetail, getHistory } = coingekoSlice.actions;

export const coinsDetail = (id: string) => async (dispatch: any) => {
  try {
    const rs = await axios.get(`${COINGECKO_URL}/coins/${id}`);
    dispatch(getDetail(rs?.data));
  } catch (error: any) {
    throw new Error(error);
  }
};

export const coinsHistory = (id: string, params: object) => async (dispatch: any) => {
  try {
    const rs = await axios.get(`${COINGECKO_URL}/coins/${id}/market_chart`, { params });
    dispatch(getHistory(rs?.data));
  } catch (error: any) {
    throw new Error(error);
  }
};

const { reducer: coingekoReducer } = coingekoSlice;
export default coingekoReducer;
