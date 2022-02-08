import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axios from 'axios';
import { getJsonDataFromString } from 'helpers';

interface Investment {
  name: string;
  amount: number;
  '$ value': string;
}

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface InitState {
  investments: Investment[] | null;
  status: Status;
  error: string | undefined;
}

const initialState: InitState = {
  investments: null,
  status: 'idle',
  error: undefined,
};

export const fetchInvestments = createAsyncThunk('get/investment', async () => {
  const response = await axios.get(`${process.env.REACT_APP_GIST_URL}`);
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
        (state.status = 'failed'), (state.error = action.error.message);
      });
  },
});

const { reducer: investmentsReducer } = investmentsSlice;

export default investmentsReducer;
