import { BigNumber } from 'bignumber.js';
import zipWith from 'lodash/zipWith';
import moment from 'moment';
import sortBy from 'lodash/sortBy';
interface Params {
  dates: string[];
  stakedAmounts: string[];
  rewards: string[];
}

export const convertStakingData = ({ dates, stakedAmounts, rewards }: Params) => {
  if (dates[0] !== '') {
    return sortBy(
      zipWith(dates, stakedAmounts, rewards, (date, stakedAmount, reward) => {
        return {
          stakeDate: date,
          stakedAmount: new BigNumber(stakedAmount !== '' ? stakedAmount : '0').div(1e18).toString(),
          stakingTime: moment()
            .diff(moment(Number(date) * 1000), 'days')
            .toString(),
          reward: new BigNumber(reward !== '' ? reward : '0').div(1e18).toString(),
        };
      }).map((item, index) => {
        return {
          ...item,
          id: String(index),
        };
      }),
      (item) => Number(item.stakeDate),
    );
  }
  return [];
};
