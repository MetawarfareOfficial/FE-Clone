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
import { truncateNumber } from 'helpers/formatPrice';

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
    const estimateLpTokenByOxb = truncateNumber(
      new BigNumber(oxbAmount).multipliedBy(new BigNumber(totalLpSupply)).div(new BigNumber(oxbReserve)).toNumber(),
      10,
    );
    const estimateLpTokenByAvax = truncateNumber(
      new BigNumber(avaxAmount).multipliedBy(new BigNumber(totalLpSupply)).div(new BigNumber(avaxReserve)).toNumber(),
      10,
    );
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
        isSubtractFee: false,
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
        isSubtractFee: false,
      });
      const { estimatedAmountToken: estimateAvax } = loadEstimateToken({
        tokenIn,
        tokenOut: SwapTokenId.AVAX,
        isExactInput: true,
        amount: halfAmount,
        isSubtractFee: false,
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

  const handleEstimateZapOutLpTokenAmount = (
    tokenOut: SwapTokenId,
    amount: string,
    liquidityPoolInfo: LiquidityPoolData,
  ) => {
    const oxbInToken0 = liquidityPoolInfo.token0.symbol === '0xB';
    const avaxReserve = oxbInToken0 ? liquidityPoolInfo.reserve1 : liquidityPoolInfo.reserve0;
    const oxbReserve = oxbInToken0 ? liquidityPoolInfo.reserve0 : liquidityPoolInfo.reserve1;
    let amountTokenSwapFromAvax = '0';
    let amountTokenSwapFromOxb = '0';
    const lpTokenToAvaxAmount = new BigNumber(amount)
      .div(liquidityPoolInfo.totalSupply)
      .multipliedBy(avaxReserve)
      .toString();
    const lpTokenToOxbAmount = new BigNumber(amount)
      .div(liquidityPoolInfo.totalSupply)
      .multipliedBy(oxbReserve)
      .toString();

    if (tokenOut !== SwapTokenId.AVAX) {
      const { estimatedAmountToken: _amountTokenSwapFromAvax } = loadEstimateToken({
        tokenIn: SwapTokenId.AVAX,
        tokenOut: tokenOut,
        isExactInput: true,
        amount: lpTokenToAvaxAmount,
        isSubtractFee: false,
      });
      amountTokenSwapFromAvax = _amountTokenSwapFromAvax;
    } else {
      amountTokenSwapFromAvax = lpTokenToAvaxAmount;
    }

    if (tokenOut !== SwapTokenId.OXB) {
      const { estimatedAmountToken: _amountTokenSwapFromOxb } = loadEstimateToken({
        tokenIn: SwapTokenId.OXB,
        tokenOut: tokenOut,
        isExactInput: true,
        amount: lpTokenToOxbAmount,
        isSubtractFee: false,
      });
      amountTokenSwapFromOxb = _amountTokenSwapFromOxb;
    } else {
      amountTokenSwapFromOxb = lpTokenToOxbAmount;
    }
    return truncateNumber(
      new BigNumber(amountTokenSwapFromAvax).plus(new BigNumber(amountTokenSwapFromOxb)).toNumber(),
      10,
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    loadLiquidityPoolData();
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
    handleEstimateZapOutLpTokenAmount,
  };
};
