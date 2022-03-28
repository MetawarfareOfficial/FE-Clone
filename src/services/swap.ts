import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import OxImg from 'assets/images/0x-token.png';
import AvaxImg from 'assets/images/avax-token.png';
import USDCImg from 'assets/images/coin-usd.svg';
import { SwapTokenId } from 'hooks/swap';
import { Exchange, TokenItem } from 'pages/Swap';

const initialState = {
  tokenAddress: {
    ['0xb' as SwapTokenId.OXB]: '',
    ['avax' as SwapTokenId.AVAX]: '',
    ['usdc' as SwapTokenId.USDC]: '',
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
      decimal: process.env.REACT_APP_NATIVE_CURRENCY_DECIMALS || 18,
      address: process.env.REACT_APP_NATIVE_TOKEN_ADDRESS || '',
    },
    {
      id: '0xb' as SwapTokenId.OXB,
      logo: OxImg,
      name: '0xB',
      balance: 0,
      disabled: false,
      isNative: false,
      decimal: process.env.REACT_APP_CONTRACT_DECIMAL || 18,
      address: process.env.REACT_APP_CONTRACT_ADDRESS || '',
    },
    {
      id: 'usdc' as SwapTokenId.USDC,
      logo: USDCImg,
      name: 'USDC',
      balance: 0,
      disabled: false,
      isNative: false,
      decimal: process.env.REACT_APP_USDC_DECIMALS || 6,
      address: process.env.REACT_APP_USDC_TOKEN_ADDRESS || '',
    },
  ],
  cloneExchange: {
    fromId: 'avax' as SwapTokenId,
    fromValue: null,
    fromRawValue: null,
    toId: '0xb' as SwapTokenId,
    toValue: null,
    toRawValue: null,
  } as Exchange,
  exchange: {
    fromId: 'avax' as SwapTokenId,
    fromValue: null,
    fromRawValue: null,
    toId: '0xb' as SwapTokenId,
    toValue: null,
    toRawValue: null,
  },
  selectedName: 'from' as string | null,
  isInsufficientError: false,
  isLoadEstimateToken: false,
  isInsufficientLiquidityError: false,
  isEstimateFrom: false,
  swapTokenRates: {
    current: 0,
    afterSwap: 0,
  },
  subGraphCurrentRate: 0,
};

export const swapSlice = createSlice({
  name: 'swap',
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
    handleSetIsEstimateFrom: (state, action: PayloadAction<any>) => {
      state.isEstimateFrom = action.payload;
    },
    handleSetCloneExchange: (state, action: PayloadAction<any>) => {
      state.cloneExchange = action.payload;
    },
    handleSetExchange: (state, action: PayloadAction<any>) => {
      state.exchange = action.payload;
    },
    setSelectedName: (state, action: PayloadAction<string | null>) => {
      state.selectedName = action.payload;
    },
    setIsInsufficientError: (state, action: PayloadAction<boolean>) => {
      state.isInsufficientError = action.payload;
    },
    setIsInsufficientLiquidityError: (state, action: PayloadAction<boolean>) => {
      state.isInsufficientLiquidityError = action.payload;
    },
    setIsLoadEstimateToken: (state, action: PayloadAction<boolean>) => {
      state.isLoadEstimateToken = action.payload;
    },
    setSwapTokenRates: (state, action: PayloadAction<any>) => {
      state.swapTokenRates = action.payload;
    },
    setSubGraphCurrentRate: (state, action: PayloadAction<any>) => {
      state.subGraphCurrentRate = action.payload;
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
  setSelectedName,
  setIsInsufficientError,
  setIsLoadEstimateToken,
  setIsInsufficientLiquidityError,
  handleSetIsEstimateFrom,
  handleSetCloneExchange,
  handleSetExchange,
  setSwapTokenRates,
  setSubGraphCurrentRate,
} = swapSlice.actions;

const { reducer: swapReducer } = swapSlice;

export default swapReducer;
