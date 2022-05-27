import { MyContract } from './myContract';

export interface MineContract {
  mintDate: string;
  name: string;
  type: string;
  initial: string;
  current: string;
  rewards: string;
  claimedRewards: string;
  expireIn: string;
  reduceMonthlyFeePercent: number;
  index: number;
}

export interface ContractResponse {
  contractData: MyContract[];
  currentZeroXBlockPerDays: Array<string>;
}
