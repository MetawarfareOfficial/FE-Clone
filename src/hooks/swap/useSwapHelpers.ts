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
      return 'Please enter a valid amount';
    } else if (Number(value) < 0.1) {
      return `Your transaction may fail`;
    } else if (Number(value) >= 5) {
      return `Your transaction may be frontrun`;
    } else if (Number(value) >= 50) {
      return `Enter a valid slippage percentage`;
    }
    return '';
  };
  const validateDeadlineInput = (value: string) => {
    if (!value || (value && value.trim() === '') || Number(value) > 9999999999) {
      return 'Please enter a valid amount';
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
  return {
    validateSlippageInput,
    validateDeadlineInput,
    handleConvertRecentTransactionData,
  };
};
