import BigNumber from 'bignumber.js';
import { defaultSettingData, localStorageSwapSettingKey } from 'consts/swap';
import { getSwapSettingData } from 'helpers';
import { errorMessage } from 'messages/errorMessages';
import moment from 'moment';
import { TokenItem } from 'pages/Swap';
import get from 'lodash/get';
import { Token } from '@traderjoe-xyz/sdk';
import { formatPercent } from 'helpers/formatPrice';
interface RecentTransaction {
  amountIn: string;
  amountOut: string;
  date: string;
  sender: string;
  tokenIn: { id: string; symbol: string };
  tokenOut: { id: string; symbol: string };
}

export const useSwapHelpers = () => {
  const validateSlippageInput = (value: string): string => {
    if (!value || (value && value.trim()) === '') {
      return errorMessage.SWAP_SLIPPAGE_INVALID.message;
    } else if (Number(value) < 0.1) {
      return errorMessage.SWAP_SLIPPAGE_TOO_SMALL.message;
    } else if (Number(value) >= 50) {
      return errorMessage.SWAP_SLIPPAGE_TOO_HIGH.message;
    } else if (Number(value) >= 5) {
      return errorMessage.SWAP_SLIPPAGE_HIGH.message;
    }
    return '';
  };
  const validateDeadlineInput = (value: string) => {
    if (!value || (value && value.trim() === '') || Number(value) > 9999999999 || Number(value) <= 0) {
      return errorMessage.SWAP_SLIPPAGE_INVALID.message;
    }
    return '';
  };
  const handleConvertRecentTransactionData = (data: RecentTransaction[], tokens: TokenItem[]) => {
    return data.map((item) => {
      const tokenIn = tokens.filter(
        (tokenItem) => tokenItem.id === (get(item, 'tokenIn.symbol') || 'null').toLocaleLowerCase(),
      );
      const tokenOut = tokens.filter(
        (tokenItem) => tokenItem.id === (get(item, 'tokenOut.symbol') || 'null').toLocaleLowerCase(),
      );
      return {
        from: tokenIn.length > 0 ? tokenIn[0].logo : null,
        to: tokenOut.length > 0 ? tokenOut[0].logo : null,
        title: `Swap ${item.amountIn} 0xB for ${item.amountOut} AVAX`,
        date: moment.unix(Number(item.date)).format('MM/DD/YYYY'),
        time: moment.unix(Number(item.date)).format('hh:mm'),
      };
    });
  };
  const checkSwapSetting = () => {
    const settings = getSwapSettingData();
    if (settings) {
      const deadLineError = validateDeadlineInput(settings.deadline);
      const slippageError = validateSlippageInput(settings.slippage);
      const inValidSlippage =
        slippageError === errorMessage.SWAP_SLIPPAGE_INVALID.message ||
        slippageError === errorMessage.SWAP_SLIPPAGE_TOO_HIGH.message;

      const invalidDeadline = deadLineError === errorMessage.SWAP_SLIPPAGE_INVALID.message;
      const newSetting = {
        slippage: inValidSlippage ? defaultSettingData.slippage : settings.slippage,
        deadline: invalidDeadline ? defaultSettingData.deadline : settings.deadline,
      };
      localStorage.setItem(localStorageSwapSettingKey, JSON.stringify(newSetting));
      return newSetting;
    } else {
      localStorage.setItem(localStorageSwapSettingKey, JSON.stringify(defaultSettingData));
      return defaultSettingData;
    }
  };
  const calculateSwapTokenRate = (tokenInAmount: number, tokenOutAmount: number) => {
    return formatPercent(new BigNumber(tokenInAmount).div(new BigNumber(tokenOutAmount)).toNumber(), 6);
  };

  const calculateTradingFee = (amount: number, token: Token) => {
    const result = formatPercent(
      new BigNumber(amount).div(`1e${token.decimals}`).multipliedBy(25).div(10000).toNumber(),
      2,
    );
    return Number(result) > 0.000001 ? result : '<0.000001';
  };
  const calculatePriceImpact = (currentRate: number, afterSwapRate: number) => {
    return currentRate === Infinity || !Boolean(currentRate)
      ? new BigNumber(1).div(1e10).toString()
      : new BigNumber(100)
          .minus(new BigNumber(currentRate).div(new BigNumber(afterSwapRate)).multipliedBy(100))
          .abs()
          .toFixed(2);
  };
  return {
    validateSlippageInput,
    validateDeadlineInput,
    handleConvertRecentTransactionData,
    checkSwapSetting,
    calculateSwapTokenRate,
    calculateTradingFee,
    calculatePriceImpact,
  };
};
