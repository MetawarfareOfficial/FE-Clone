import BigNumber from 'bignumber.js';
import { RewardRatioChart } from '../interfaces/RewardRatioChart';

const descPercentPerYear = 0.3;
export const calcRewardRatio = (earn: string, year: number): number => {
  const ratioPerYear = 1 - descPercentPerYear * year;
  return new BigNumber(earn).times(ratioPerYear).toNumber();
};

export const computedRewardRatioPerYear = (earn: string): Array<RewardRatioChart> => {
  const years = [1, 2, 3];
  return years.map((item, index) => {
    return {
      year: item,
      rewardRatio: calcRewardRatio(earn, index),
    } as RewardRatioChart;
  });
};
