import BigNumber from 'bignumber.js';

export const calculateEarlyUnstakingFee = (totalStakedValue: number, days: number) => {
  const before30DaysFee = 5;
  const before60DaysFee = 2.5;
  let fee = '0';
  if (days < 30) {
    fee = new BigNumber(totalStakedValue).multipliedBy(before30DaysFee).div(100).toString();
  } else if (days >= 30 && days < 60) {
    fee = new BigNumber(totalStakedValue).multipliedBy(before60DaysFee).div(100).toString();
  }
  return fee;
};
