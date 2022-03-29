import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChainId, Token } from '@traderjoe-xyz/sdk';
import OxImg from 'assets/images/0x-token.png';
import AvaxImg from 'assets/images/avax-token.png';
import USDCImg from 'assets/images/coin-usd.svg';
import { SwapTokenId } from 'hooks/swap';
import { TokenItem } from 'pages/Swap';

const initialState = {
  tokenAddress: {
    ['0xb' as SwapTokenId.OXB]: process.env.REACT_APP_CONTRACT_ADDRESS!,
    ['avax' as SwapTokenId.AVAX]: process.env.REACT_APP_NATIVE_TOKEN_ADDRESS!,
    ['usdc' as SwapTokenId.USDC]: process.env.REACT_APP_USDC_TOKEN_ADDRESS!,
    ['usdt' as SwapTokenId.USDT]: process.env.REACT_APP_USDT_TOKEN_ADDRESS!,
  },
  pairsData: {
    ['0xb' as SwapTokenId]: null,
    ['avax' as SwapTokenId]: null,
    ['usdc' as SwapTokenId]: null,
    ['usdt' as SwapTokenId]: null,
  },
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
  selectedName: 'from' as string | null,
  isInsufficientError: false,
  isLoadEstimateToken: false,
  isInsufficientLiquidityError: false,
  swapTokenRates: {
    current: 0,
    afterSwap: 0,
  },
  ['0xb' as SwapTokenId.OXB]: new Token(
    Number(process.env.REACT_APP_CHAIN_ID) as ChainId,
    String(process.env.REACT_APP_CONTRACT_ADDRESS),
    Number(process.env.REACT_APP_CONTRACT_DECIMAL),
    String(process.env.REACT_APP_CONTRACT_SYMBOL),
  ),
  ['avax' as SwapTokenId.AVAX]: new Token(
    Number(process.env.REACT_APP_CHAIN_ID) as ChainId,
    String(process.env.REACT_APP_NATIVE_TOKEN_ADDRESS),
    Number(process.env.REACT_APP_NATIVE_CURRENCY_DECIMALS),
    String(process.env.REACT_APP_NATIVE_CURRENCY_SYMBOL),
  ),
  ['usdc' as SwapTokenId.USDC]: new Token(
    Number(process.env.REACT_APP_CHAIN_ID) as ChainId,
    String(process.env.REACT_APP_USDC_TOKEN_ADDRESS),
    Number(process.env.REACT_APP_USDC_DECIMALS),
    String(process.env.REACT_APP_USDC_SYMBOL),
  ),
  ['usdt' as SwapTokenId.USDT]: new Token(
    Number(process.env.REACT_APP_CHAIN_ID) as ChainId,
    String(process.env.REACT_APP_USDT_TOKEN_ADDRESS),
    Number(process.env.REACT_APP_USDT_DECIMALS),
    String(process.env.REACT_APP_USDT_SYMBOL),
  ),
  pairInfoLoaded: false,
};

export const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setTokenAddress: (state, action: PayloadAction<any>) => {
      state.tokenAddress = action.payload;
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
    setPairInfoLoaded: (state, action: PayloadAction<any>) => {
      state.pairInfoLoaded = action.payload;
    },
  },
});

export const {
  setTokenAddress,
  setPairData,
  handleDisableToken,
  handleSetTokenBalances,
  setRecentTransactions,
  setSelectedName,
  setIsInsufficientError,
  setIsLoadEstimateToken,
  setIsInsufficientLiquidityError,
  setSwapTokenRates,
  setPairInfoLoaded,
} = swapSlice.actions;

const { reducer: swapReducer } = swapSlice;

export default swapReducer;
