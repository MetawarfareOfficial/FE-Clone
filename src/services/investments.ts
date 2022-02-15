import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axios from 'axios';
import { getJsonDataFromString } from 'helpers';
import { BaseInvest } from 'interfaces/Invest';
import { sleep } from '../helpers/delayTime';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface InitState {
  investments: BaseInvest[] | [];
  status: Status;
  error: string | undefined;
}

const initialState: InitState = {
  investments: [],
  status: 'idle',
  error: undefined,
};

export const fetchInvestments = createAsyncThunk('get/investment', async () => {
  await sleep(5000);
  const response = await axios.get(`${process.env.REACT_APP_GIST_URL}${process.env.REACT_APP_GIST_TOKEN_ID}`);
  return response.data;
});

export const investmentsSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchInvestments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvestments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const payload = get(action, `payload.files['${process.env.REACT_APP_INVESTMENT_DATA_FILE_NAME}'].content`, []);
        state.investments = getJsonDataFromString(payload);
      })
      .addCase(fetchInvestments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const { reducer: investmentsReducer } = investmentsSlice;

export default investmentsReducer;
