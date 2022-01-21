import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apy: { square: '', cube: '', tesseract: '' },
  price: { square: 0, cube: 0, tesseract: 0 },
  nodes: 0,
  dataMyContracts: [],
  dataRewardAmount: 0,
};

const dataContractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setApy: (state, action) => {
      state.apy = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    unSetNodes: (state) => {
      state.nodes = 0;
    },
    setDataMyContracts: (state, action) => {
      state.dataMyContracts = action.payload;
    },
    unSetDataMyContracts: (state) => {
      state.dataMyContracts = [];
    },
    setRewardAmount: (state, action) => {
      state.dataRewardAmount = action.payload;
    },
    unSetRewardAmount: (state) => {
      state.dataRewardAmount = 0;
    },
  },
});

export const {
  setApy,
  setPrice,
  setNodes,
  unSetNodes,
  setDataMyContracts,
  unSetDataMyContracts,
  setRewardAmount,
  unSetRewardAmount,
} = dataContractSlice.actions;
const { reducer: dataContractReducer } = dataContractSlice;
export default dataContractReducer;
