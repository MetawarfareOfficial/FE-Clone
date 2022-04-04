import { Token } from '@traderjoe-xyz/sdk';
import { BigNumber } from 'bignumber.js';
import { formatPercent } from 'helpers/formatPrice';

export const calculateTradingFee = (amount: number, token: Token) => {
  const result = formatPercent(
    new BigNumber(amount).div(`1e${token.decimals}`).multipliedBy(0.4).div(100).toString(),
    6,
    0,
  );
  return Number(result) > 0.000001 ? result : '<0.000001';
};
