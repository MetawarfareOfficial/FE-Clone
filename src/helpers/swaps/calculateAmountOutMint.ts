import BigNumber from 'bignumber.js';

export const calculateAmountOutMin = (estimatedAmount: string, slippage: string) => {
  return new BigNumber(estimatedAmount)
    .multipliedBy(new BigNumber(100).minus(new BigNumber(slippage)))
    .div(100)
    .toString();
};
