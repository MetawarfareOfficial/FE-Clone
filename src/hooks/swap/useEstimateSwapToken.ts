import BigNumber from 'bignumber.js';
import { useAppSelector } from 'stores/hooks';
import { SwapTokenId } from './useSwapToken';

interface Params {
  tokenIn: SwapTokenId;
  amountIn: number;
  pairAddress: string;
}

export const useEstimateSwapToken = (addressLoading: boolean) => {
  const pairsData = useAppSelector((state) => state.swap.pairsData);
  const tokenAddresses = useAppSelector((state) => state.swap.tokenAddress);

  const handleEstimateTokens = ({ tokenIn, amountIn, pairAddress }: Params) => {
    const tokensPair = pairsData.filter((item: any) => item.id === pairAddress?.toLocaleLowerCase())[0] as any;
    if (tokensPair && !addressLoading) {
      const tokenInAddress = tokenAddresses[tokenIn].toLocaleLowerCase();
      let tokenInReserve;
      let tokenOutReserve;
      if (tokensPair.token0.id == tokenInAddress) {
        tokenInReserve = new BigNumber(tokensPair.reserve0);
        tokenOutReserve = new BigNumber(tokensPair.reserve1);
      } else {
        tokenInReserve = new BigNumber(tokensPair.reserve1);
        tokenOutReserve = new BigNumber(tokensPair.reserve0);
      }
      const total = tokenInReserve.multipliedBy(tokenOutReserve);
      const result = tokenOutReserve.minus(total.div(tokenInReserve.plus(new BigNumber(amountIn))));
      const traderJoeSwapFee = result.multipliedBy(0.3).div(100);
      return result.minus(traderJoeSwapFee).toNumber();
    }
    return 0;
  };
  return {
    handleEstimateTokens,
  };
};
