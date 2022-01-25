import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apy: { square: '', cube: '', tesseract: '' },
  price: { square: 0, cube: 0, tesseract: 0 },
  total: { square: 0, cube: 0, tesseract: 0 },
  nodes: 0,
  dataMyContracts: [],
  dataRewardAmount: 0,
  isCreatingNodes: false,
};

const dataContractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setApy: (state, action) => {
      state.apy = action.payload;
    },
    unSetApy: (state) => {
      state.apy = { square: '', cube: '', tesseract: '' };
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    unSetPrice: (state) => {
      state.price = { square: 0, cube: 0, tesseract: 0 };
    },
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    unSetTotal: (state) => {
      state.total = { square: 0, cube: 0, tesseract: 0 };
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
    setIsCreatingNodes: (state) => {
      state.isCreatingNodes = true;
    },
    unSetIsCreatingNodes: (state) => {
      state.isCreatingNodes = false;
    },
  },
});

export const {
  setApy,
  unSetApy,
  setPrice,
  unSetPrice,
  setNodes,
  setTotal,
  unSetTotal,
  unSetNodes,
  setDataMyContracts,
  unSetDataMyContracts,
  setRewardAmount,
  unSetRewardAmount,
  setIsCreatingNodes,
  unSetIsCreatingNodes,
} = dataContractSlice.actions;
const { reducer: dataContractReducer } = dataContractSlice;
export default dataContractReducer;
