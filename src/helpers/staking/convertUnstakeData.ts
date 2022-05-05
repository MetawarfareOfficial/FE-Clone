import moment from 'moment';
import { StakeItem } from 'services/staking';
import { calculateEarlyUnstakingFee } from './calculateEarlyUnstakingFee';

interface Params {
  data: StakeItem[];
  selectedIndexes: string[];
}

export const convertUnstakeData = ({ data, selectedIndexes }: Params) => {
  const selectedStakedEntities = data.filter((item) => {
    return selectedIndexes.includes(item.id);
  });

  return selectedStakedEntities.map((item) => {
    const accureDays = moment().diff(moment(Number(item.stakeDate) * 1000, 'day'));
    return {
      stakeAmount: item.stakedAmount,
      accureDays,
      reward: item.reward,
      unstakeFee: calculateEarlyUnstakingFee(Number(item.stakedAmount), accureDays),
    };
  });
};
