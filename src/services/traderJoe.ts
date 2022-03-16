import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'utils/AxiosInstance';
import { get, slice } from 'lodash';

const initialState = {
  tokenData: [],
  bars: [],
};

export const getBars = createAsyncThunk('get/bars', async () => {
  return await axiosInstance.get(`${process.env.REACT_APP_GIST_URL}${process.env.REACT_APP_BARS_TOKEN_ID}`);
});

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
  extraReducers: {
    [getBars.fulfilled.toString()]: (state, action) => {
      const payload = get(action, `payload.data.files['${process.env.REACT_APP_BARS_FILE_NAME}'].content`, []);
      const parseData = JSON.parse(payload.toString().replace(/'/g, '"'));
      state.bars = slice(parseData.bars.reverse(), 0, 30);
    },
    [getBars.rejected.toString()]: (state) => {
      state.bars = [];
    },
  },
});

export const { setTokenData } = traderJoeSlide.actions;
const { reducer: traderJoeReducer } = traderJoeSlide;
export default traderJoeReducer;
