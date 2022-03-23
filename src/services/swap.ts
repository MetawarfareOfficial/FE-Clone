import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SwapTokenId } from 'hooks/swap';
import AvaxImg from 'assets/images/avax-token.png';
import OxImg from 'assets/images/0x-token.png';
import USDCImg from 'assets/images/coin-usd.svg';
import { TokenItem } from 'pages/Swap';

const initialState = {
  tokenAddress: {
    ['0xb' as SwapTokenId]: '',
    ['avax' as SwapTokenId]: '',
    ['usdc' as SwapTokenId]: '',
  },
  pairAddress: '',
  pairsData: [],
  recentTransactions: [],
  tokenList: [
    {
      id: 'avax' as SwapTokenId.AVAX,
      logo: AvaxImg,
      name: 'AVAX',
      balance: 0,
      disabled: false,
      isNative: true,
    },
    {
      id: '0xb' as SwapTokenId.OXB,
      logo: OxImg,
      name: '0xB',
      balance: 0,
      disabled: false,
      isNative: false,
    },
    {
      id: 'usdc' as SwapTokenId.USDC,
      logo: USDCImg,
      name: 'USDC',
      balance: 0,
      disabled: false,
      isNative: false,
    },
  ],
};

export const swapSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setTokenAddress: (state, action: PayloadAction<any>) => {
      state.tokenAddress = action.payload;
    },
    setPairAddress: (state, action: PayloadAction<string>) => {
      state.pairAddress = action.payload;
    },
    setPairData: (state, action: PayloadAction<any>) => {
      state.pairsData = action.payload;
    },
    handleDisableToken: (state, action: PayloadAction<any>) => {
      const newTokenList = state.tokenList.map((tokenItem) => {
        const foundedToken = action.payload.find((item: TokenItem) => item.id === tokenItem.id);
        if (foundedToken) {
          return {
            ...tokenItem,
            disabled: foundedToken.disabled,
          };
        }
        return tokenItem;
      });
      state.tokenList = newTokenList;
    },
    handleSetTokenBalances: (state, action: PayloadAction<any>) => {
      const newTokenList = state.tokenList.map((tokenItem) => {
        const foundedToken = action.payload.find((item: TokenItem) => item.id === tokenItem.id);
        if (foundedToken) {
          return {
            ...tokenItem,
            balance: foundedToken.balance,
          };
        }
        return tokenItem;
      });
      state.tokenList = newTokenList;
    },
    setRecentTransactions: (state, action: PayloadAction<any>) => {
      state.recentTransactions = action.payload;
    },
  },
});

export const {
  setTokenAddress,
  setPairAddress,
  setPairData,
  handleDisableToken,
  handleSetTokenBalances,
  setRecentTransactions,
} = swapSlice.actions;

const { reducer: swapReducer } = swapSlice;

export default swapReducer;
