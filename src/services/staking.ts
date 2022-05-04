import { createSlice } from '@reduxjs/toolkit';

export interface stakeItem {
  reward: string;
  stakeDate: string;
  stakedAmount: string;
  stakingTime: string;
  unstakedAmount: string;
}

export interface PoolItem {
  id: string;
  liquidity: string;
  apr: string;
  totalStaked: string;
  yourShare: string;
  yourTotalRewardAmount: string;
  yourTotalRewardValue: string;
  yourTotalStakedAmount: string;
  yourAllStakes: stakeItem[];
  lpAddress: string;
  title: string;
  account: string;
}

interface States {
  pools: PoolItem[];
  lpToken: {
    balance: string;
    allowance: string;
  };
  lpBalanceLoaded: boolean;
}

const initialState: States = {
  pools: [],
  lpToken: {
    balance: '0',
    allowance: '0',
  },
  lpBalanceLoaded: false,
};

export const stakeSlice = createSlice({
  name: 'stake',
  initialState,
  reducers: {
    setPools: (state, action) => {
      state.pools = action.payload;
    },
    setLpToken: (state, action) => {
      state.lpToken = action.payload;
    },
    setLpBalanceLoaded: (state, action) => {
      state.lpToken = action.payload;
    },
  },
});

export const { setPools, setLpToken } = stakeSlice.actions;

const { reducer: stakeReducer } = stakeSlice;

export default stakeReducer;
