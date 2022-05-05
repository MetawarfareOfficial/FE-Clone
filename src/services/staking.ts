import { createSlice } from '@reduxjs/toolkit';

export interface StakeItem {
  id: string;
  reward: string;
  stakeDate: string;
  stakedAmount: string;
  stakingTime: string;
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
  yourStakingTime: string;
  lpAddress: string;
  title: string;
  account: string;
  endTime: string;
}

interface States {
  pools: PoolItem[];
  lpToken: {
    balance: string;
    allowance: string;
  };
  lpBalanceLoaded: boolean;
  totalPools: number[] | null;
  selectedPoolData: StakeItem[];
}

const initialState: States = {
  pools: [],
  lpToken: {
    balance: '0',
    allowance: '0',
  },
  lpBalanceLoaded: false,
  totalPools: null,
  selectedPoolData: [],
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
    setTotalPools: (state, action) => {
      state.totalPools = action.payload;
    },
    setSelectedPoolData: (state, action) => {
      state.selectedPoolData = action.payload;
    },
  },
});

export const { setPools, setLpToken, setTotalPools, setSelectedPoolData } = stakeSlice.actions;

const { reducer: stakeReducer } = stakeSlice;

export default stakeReducer;
