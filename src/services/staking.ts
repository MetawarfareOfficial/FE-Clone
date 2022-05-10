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
  isOxbPool: boolean;
}

interface States {
  pools: PoolItem[];
  lpToken: {
    balance: string;
    allowance: string;
  };
  oxbToken: {
    balance: string;
    allowance: string;
  };
  lpBalanceLoaded: boolean;
  totalPools: number[] | null;
  selectedPoolData: StakeItem[];
  stakingRecordsLimit: number;
}

const initialState: States = {
  pools: [],
  lpToken: {
    balance: '0',
    allowance: '0',
  },
  oxbToken: {
    balance: '0',
    allowance: '0',
  },
  lpBalanceLoaded: false,
  totalPools: null,
  selectedPoolData: [],
  stakingRecordsLimit: 100,
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
    setOxbToken: (state, action) => {
      state.oxbToken = action.payload;
    },
    setTotalPools: (state, action) => {
      state.totalPools = action.payload;
    },
    setSelectedPoolData: (state, action) => {
      state.selectedPoolData = action.payload;
    },
    setStakingRecordsLimit: (state, action) => {
      state.stakingRecordsLimit = action.payload;
    },
  },
});

export const { setPools, setLpToken, setTotalPools, setSelectedPoolData, setOxbToken, setStakingRecordsLimit } =
  stakeSlice.actions;

const { reducer: stakeReducer } = stakeSlice;

export default stakeReducer;
