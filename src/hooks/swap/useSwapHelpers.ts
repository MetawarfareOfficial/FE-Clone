import { defaultSettingData, localStorageSwapSettingKey } from 'consts/swap';
import { getSwapSettingData } from 'helpers';
import { errorMessage } from 'messages/errorMessages';
import moment from 'moment';
import { TokenItem } from 'pages/Swap';
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
    if (!value || (value && value.trim() === '') || Number(value) > 9999999999) {
      return errorMessage.SWAP_SLIPPAGE_INVALID.message;
    }
    return '';
  };
  const handleConvertRecentTransactionData = (data: RecentTransaction[], tokens: TokenItem[]) => {
    return data.map((item) => {
      const tokenIn = tokens.filter((tokenItem) => tokenItem.id === item.tokenIn.symbol.toLocaleLowerCase());
      const tokenOut = tokens.filter((tokenItem) => tokenItem.id === item.tokenOut.symbol.toLocaleLowerCase());
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
    }
  };
  return {
    validateSlippageInput,
    validateDeadlineInput,
    handleConvertRecentTransactionData,
    checkSwapSetting,
  };
};
