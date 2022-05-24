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
  // mintDates: Array<string>;
  // names: Array<string>;
  // types: Array<string>;
  // initZeroXBlockPerDays: Array<string>;
  contractData: MyContract[];
  currentZeroXBlockPerDays: Array<string>;
  rewards: Array<string>;
  claimedRewards: string[];
}
