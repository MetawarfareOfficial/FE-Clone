import BigNumber from 'bignumber.js';
import { BigNumber as BN } from 'ethers';

export const bigNumber2Number = (number: BN, base = 1e18): string => {
  return new BigNumber(Number(number._hex)).div(base).toString();
};
