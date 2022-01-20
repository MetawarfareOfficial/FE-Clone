import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apy: { square: '', cube: '', tesseract: '' },
  price: { square: 0, cube: 0, tesseract: 0 },
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
  },
});

export const { setApy, setPrice } = dataContractSlice.actions;
const { reducer: dataContractReducer } = dataContractSlice;
export default dataContractReducer;
