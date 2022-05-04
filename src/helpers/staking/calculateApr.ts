import BigNumber from 'bignumber.js';

interface Params {
  totalReward: string;
  oxbPrice: string;
  totalStaked: string;
  lpPrice: string;
}

export const calculateApr = ({ totalReward, oxbPrice, totalStaked, lpPrice }: Params) => {
  return new BigNumber(totalReward)
    .multipliedBy(new BigNumber(oxbPrice))
    .div(new BigNumber(totalStaked).multipliedBy(new BigNumber(lpPrice)))
    .toString();
};
