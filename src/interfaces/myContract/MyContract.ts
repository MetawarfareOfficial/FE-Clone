import { BigNumber } from 'ethers';

export interface GetMyContractResponse {
  buyPrice: BigNumber;
  cType: number;
  creationTime: BigNumber;
  expireIn: BigNumber;
  initialAPR: BigNumber;
  lastUpdateTime: BigNumber;
  lastUpdated: BigNumber;
  name: string;
  reward: BigNumber;
  claimed: BigNumber;
}
export interface MyContract {
  price: string;
  type: number;
  mintDate: string;
  expireIn: string;
  initApy: string;
  name: string;
  claimedReward: string;
  reward: string;
}
