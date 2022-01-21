import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apy: { square: '', cube: '', tesseract: '' },
  price: { square: 0, cube: 0, tesseract: 0 },
  nodes: 0,
  dataMyContracts: [],
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
  },
});

export const { setApy, setPrice, setNodes, unSetNodes, setDataMyContracts } = dataContractSlice.actions;
const { reducer: dataContractReducer } = dataContractSlice;
export default dataContractReducer;
