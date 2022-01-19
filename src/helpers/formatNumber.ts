import BigNumber from 'bignumber.js';
import { BigNumber as BN } from 'ethers';

export const bigNumber2Number = (number: BN): string => {
  return new BigNumber(Number(number._hex)).div(1e18).toString();
};
