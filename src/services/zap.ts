import { createSlice } from '@reduxjs/toolkit';

export interface LiquidityPoolData {
  reserve0: string;
  reserve1: string;
  token0: {
    symbol: string;
  };
  token1: {
    symbol: string;
  };
  totalSupply: string;
}

interface States {
  liquidityPoolData: LiquidityPoolData;
  isLiquidityPoolLoaded: boolean;
}

const initialState: States = {
  liquidityPoolData: {
    reserve0: '0',
    reserve1: '0',
    token0: {
      symbol: '',
    },
    token1: {
      symbol: '',
    },
    totalSupply: '0',
  },
  isLiquidityPoolLoaded: false,
};

export const zapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    handleSetLiquidityPoolData: (state, action) => {
      state.liquidityPoolData = action.payload;
    },
    handleSetIsLiquidityPoolLoaded: (state, action) => {
      state.isLiquidityPoolLoaded = action.payload;
    },
  },
});

export const { handleSetLiquidityPoolData, handleSetIsLiquidityPoolLoaded } = zapSlice.actions;

const { reducer: zapReducer } = zapSlice;

export default zapReducer;
