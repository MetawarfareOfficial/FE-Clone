import BigNumber from 'bignumber.js';
import { formatPrice } from 'helpers/formatPrice';

const FACTOR = 36500;
export const computeEarnedTokenPerDay = (price: number, apy: string) => {
  if (price && apy) {
    const earnedToken = new BigNumber(price).times(apy).div(FACTOR).toString();
    return formatPrice(earnedToken);
  }
  return '0.00';
};
