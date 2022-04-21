import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { intervalTime } from 'consts/swap';
import { loadLiquidityPoolInfo } from 'helpers/zap/loadLiquidityPoolInfo';
import { SwapTokenId } from 'hooks/swap';
import { useLoadSwapData } from 'hooks/swap/useLoadSwapData';
import { useEffect } from 'react';
import { handleSetIsLiquidityPoolLoaded, handleSetLiquidityPoolData, LiquidityPoolData } from 'services/zap';
import { useAppDispatch } from 'stores/hooks';
import min from 'lodash/min';

export const useEstimateLPTokenAmount = () => {
  const { account } = useWeb3React();
  const { loadEstimateToken } = useLoadSwapData();
  const dispatch = useAppDispatch();
  const loadLiquidityPoolData = async () => {
    try {
      const data = await loadLiquidityPoolInfo();
      if (data.length > 0) {
        dispatch(handleSetLiquidityPoolData(data[0]));
      }
      dispatch(handleSetIsLiquidityPoolLoaded(true));
    } catch {}
  };
  const calculateLpToken = (
    avaxReserve: string,
    oxbReserve: string,
    oxbAmount: string,
    avaxAmount: string,
    totalLpSupply: string,
  ) => {
    const estimateLpTokenByOxb = new BigNumber(oxbAmount)
      .multipliedBy(new BigNumber(totalLpSupply))
      .div(new BigNumber(oxbReserve))
      .toNumber();
    const estimateLpTokenByAvax = new BigNumber(avaxAmount)
      .multipliedBy(new BigNumber(totalLpSupply))
      .div(new BigNumber(avaxReserve))
      .toNumber();
    return min([estimateLpTokenByAvax, estimateLpTokenByOxb]);
  };
  const handleEstimateZapInLpTokenAmount = (
    tokenIn: SwapTokenId,
    amount: string,
    liquidityPoolInfo: LiquidityPoolData,
  ) => {
    const oxbInToken0 = liquidityPoolInfo.token0.symbol === '0xB';
    let amountAvax = '0';
    let amountOxb = '0';
    if (tokenIn === SwapTokenId.AVAX) {
      const halfAmount = new BigNumber(amount).div(2).toString();
      const { estimatedAmountToken } = loadEstimateToken({
        tokenIn,
        tokenOut: SwapTokenId.OXB,
        isExactInput: true,
        amount: halfAmount,
      });
      amountAvax = halfAmount;
      amountOxb = estimatedAmountToken !== '' ? estimatedAmountToken : '0';
    } else {
      const halfAmount = new BigNumber(amount).div(2).toString();
      const { estimatedAmountToken: estimateOxb } = loadEstimateToken({
        tokenIn,
        tokenOut: SwapTokenId.OXB,
        isExactInput: true,
        amount: halfAmount,
      });
      const { estimatedAmountToken: estimateAvax } = loadEstimateToken({
        tokenIn,
        tokenOut: SwapTokenId.AVAX,
        isExactInput: true,
        amount: halfAmount,
      });
      amountAvax = estimateAvax !== '' ? estimateAvax : '0';
      amountOxb = estimateOxb !== '' ? estimateOxb : '0';
    }
    return calculateLpToken(
      oxbInToken0 ? liquidityPoolInfo.reserve1 : liquidityPoolInfo.reserve0,
      oxbInToken0 ? liquidityPoolInfo.reserve0 : liquidityPoolInfo.reserve1,
      amountOxb,
      amountAvax,
      liquidityPoolInfo.totalSupply,
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (account) {
      interval = setInterval(async () => {
        await loadLiquidityPoolData();
      }, intervalTime);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [account]);

  return {
    handleEstimateZapInLpTokenAmount,
  };
};
