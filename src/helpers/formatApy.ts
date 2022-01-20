import BigNumber from 'bignumber.js';
import { BigNumber as BN } from 'ethers';
import { bigNumber2Number } from 'helpers/formatNumber';
import { formatPrice } from 'helpers/formatPrice';

export const formatApy = (data: BN): string => {
  const data2BN = bigNumber2Number(data, 1e9);
  const bn2Percent = new BigNumber(data2BN).div(100).toString();
  return formatPrice(bn2Percent);
};
