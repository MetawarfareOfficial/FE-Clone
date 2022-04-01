import { InsufficientReservesError, Percent, Route, TokenAmount, Trade, TradeType } from '@traderjoe-xyz/sdk';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { recentTransactionQuery } from 'consts/query';
import { getPairsInfoIntervalTime } from 'consts/swap';
import { getSwapSettingData } from 'helpers';
import { formatForNumberLessThanCondition } from 'helpers/formatForNumberLessThanCondition';
import { formatPercent } from 'helpers/formatPrice';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { useToast } from 'hooks/useToast';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import {
  setIsInsufficientLiquidityError,
  setIsLoadEstimateToken,
  setPairData,
  setPairInfoLoaded,
  setRecentTransactions,
} from 'services/swap';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { useQuery } from 'urql';
import { useSwapHelpers } from './useSwapHelpers';
import { SwapTokenId } from './useSwapToken';

export interface TokenAddresses {
  [SwapTokenId.OXB]: string;
  [SwapTokenId.AVAX]: string;
  [SwapTokenId.USDC]: string;
}

interface loadEstimateTokenParams {
  isExactInput: boolean;
  tokenIn: SwapTokenId;
  tokenOut: SwapTokenId;
  amount: string;
}

export const useLoadSwapData = () => {
  const { getPairsInfo } = useInteractiveContract();
  const { account } = useWeb3React();
  const { calculateTradingFee } = useSwapHelpers();
  const pairsData = useAppSelector((state) => state.swap.pairsData);
  const swap = useAppSelector((state) => state.swap);

  const pairInfoLoaded = useAppSelector((state) => state.swap.pairInfoLoaded);
  const dispatch = useAppDispatch();
  const { createToast } = useToast();

  const [recentTransactionResult, reExecuteLoadRecentTransactionQuery] = useQuery({
    query: recentTransactionQuery,
    variables: {
      address: account,
      date: moment().subtract('7', 'days').endOf('day').unix(),
    },
    pause: !account,
    context: useMemo(
      () => ({
        url: process.env.REACT_APP_SWAP_HISTORIES_API_URL,
      }),
      [],
    ),
  });

  const loadRecentTransaction = () => {
    reExecuteLoadRecentTransactionQuery({ requestPolicy: 'network-only' });
  };

  useEffect(() => {
    dispatch(setRecentTransactions(get(recentTransactionResult, 'data.swaps', [])));
  }, [recentTransactionResult.data]);

  const loadEstimateToken = ({ isExactInput, tokenIn, tokenOut, amount }: loadEstimateTokenParams) => {
    const settingData = getSwapSettingData();

    try {
      dispatch(setIsInsufficientLiquidityError(false));
      dispatch(setIsLoadEstimateToken(true));
      if (!pairInfoLoaded) {
        throw Error('Pairs are not loaded');
      }
      if (Number(amount) === 0) {
        throw Error('Invalid token amount');
      }
      const isNativeTokenIn = tokenIn === SwapTokenId.AVAX;
      const isNativeTokenOut = tokenOut === SwapTokenId.AVAX;
      const zeroSlippageTolerance = new Percent('0', '10000');
      const currentSlippageTolerance = new Percent(String(Number(settingData!.slippage) * 100), '10000');

      let tokenInRouter;
      let tokenOutRouter;
      if (isNativeTokenIn) {
        tokenInRouter = new Route([pairsData[tokenOut]!], swap[tokenIn], swap[tokenOut]);
        tokenOutRouter = new Route([pairsData[tokenOut]!], swap[tokenIn], swap[tokenOut]);
      } else if (isNativeTokenOut) {
        tokenInRouter = new Route([pairsData[tokenIn]!], swap[tokenIn], swap[tokenOut]);
        tokenOutRouter = new Route([pairsData[tokenIn]!], swap[tokenIn], swap[tokenOut]);
      } else {
        tokenInRouter = new Route([pairsData[tokenIn]!], swap[tokenIn], swap[SwapTokenId.AVAX]);
        tokenOutRouter = new Route([pairsData[tokenOut]!], swap[SwapTokenId.AVAX], swap[tokenOut]);
      }
      if (isExactInput) {
        if (isEqual(tokenInRouter, tokenOutRouter)) {
          const trade = new Trade(
            tokenInRouter,
            new TokenAmount(
              swap[tokenIn],
              new BigNumber(amount).multipliedBy(`1e${swap[tokenIn].decimals}`).toString(),
            ),
            TradeType.EXACT_INPUT,
            Number(process.env.REACT_APP_CHAIN_ID),
          );
          const estimatedAmountToken = trade.minimumAmountOut(zeroSlippageTolerance).raw.toString();
          return {
            estimatedAmountToken: formatPercent(
              new BigNumber(estimatedAmountToken).div(`1e${swap[tokenOut].decimals}`).toNumber(),
              10,
              0,
            ),
            slippageTolerance: settingData!.slippage,
            minReceive: formatForNumberLessThanCondition({
              value: new BigNumber(trade.minimumAmountOut(currentSlippageTolerance).raw.toString())
                .div(`1e${swap[tokenOut].decimals}`)
                .toNumber(),
              minValueCondition: 0.000001,
              callback: formatPercent,
              callBackParams: [6, 0],
            }),
            maxSold: null,
            tradingFee: calculateTradingFee(
              new BigNumber(amount).multipliedBy(`1e${swap[tokenIn].decimals}`).toNumber(),
              swap[tokenIn],
            ),
            priceImpact:
              Number(trade.priceImpact.toSignificant(6)) > 0.3
                ? String(Number(trade.priceImpact.toSignificant(6)) - 0.3)
                : '0.0001',
          };
        } else {
          const tradeTokenInToWavax = new Trade(
            tokenInRouter,
            new TokenAmount(
              swap[tokenIn],
              new BigNumber(amount).multipliedBy(`1e${swap[tokenIn].decimals}`).toString(),
            ),
            TradeType.EXACT_INPUT,
            Number(process.env.REACT_APP_CHAIN_ID),
          );
          const estimatedWavaxAmountToken = tradeTokenInToWavax.minimumAmountOut(zeroSlippageTolerance).raw.toString();
          const priceImpact1 = Number(tradeTokenInToWavax.priceImpact.toSignificant(6)) - 0.3;
          const tradeWavaxToTokenOut = new Trade(
            tokenOutRouter,
            new TokenAmount(swap[SwapTokenId.AVAX], estimatedWavaxAmountToken),
            TradeType.EXACT_INPUT,
            Number(process.env.REACT_APP_CHAIN_ID),
          );
          const estimatedAmountToken = tradeWavaxToTokenOut.minimumAmountOut(zeroSlippageTolerance).raw.toString();
          const priceImpact2 = Number(tradeWavaxToTokenOut.priceImpact.toSignificant(6)) - 0.3;
          return {
            estimatedAmountToken: formatPercent(
              new BigNumber(estimatedAmountToken).div(`1e${swap[tokenOut].decimals}`).toNumber(),
              10,
              0,
            ),
            slippageTolerance: settingData!.slippage,
            minReceive: formatForNumberLessThanCondition({
              value: new BigNumber(tradeWavaxToTokenOut.minimumAmountOut(currentSlippageTolerance).raw.toString())
                .div(`1e${swap[tokenOut].decimals}`)
                .toNumber(),
              minValueCondition: 0.000001,
              callback: formatPercent,
              callBackParams: [6, 0],
            }),
            maxSold: null,
            tradingFee: calculateTradingFee(
              new BigNumber(amount).multipliedBy(`1e${swap[tokenIn].decimals}`).toNumber(),
              swap[tokenIn],
            ),
            priceImpact:
              Number(priceImpact1 + priceImpact2) !== 0 ? String(Number(priceImpact1 + priceImpact2)) : '0.0001',
          };
        }
      } else {
        if (isEqual(tokenInRouter, tokenOutRouter)) {
          const trade = new Trade(
            tokenInRouter,
            new TokenAmount(
              swap[tokenOut],
              new BigNumber(amount).multipliedBy(`1e${swap[tokenOut].decimals}`).toString(),
            ),
            TradeType.EXACT_OUTPUT,
            Number(process.env.REACT_APP_CHAIN_ID),
          );
          const estimatedAmountToken = trade.maximumAmountIn(zeroSlippageTolerance).raw.toString();
          return {
            estimatedAmountToken: formatPercent(
              new BigNumber(estimatedAmountToken).div(`1e${swap[tokenIn].decimals}`).toNumber(),
              10,
              0,
            ),
            slippageTolerance: settingData!.slippage,
            minReceive: null,
            maxSold: formatForNumberLessThanCondition({
              value: new BigNumber(trade.maximumAmountIn(currentSlippageTolerance).raw.toString())
                .div(`1e${swap[tokenIn].decimals}`)
                .toNumber(),
              minValueCondition: 0.000001,
              callback: formatPercent,
              callBackParams: [6, 0],
            }),
            tradingFee: calculateTradingFee(new BigNumber(estimatedAmountToken).toNumber(), swap[tokenIn]),
            priceImpact:
              Number(trade.priceImpact.toSignificant(6)) > 0.3
                ? String(Number(trade.priceImpact.toSignificant(6)) - 0.3)
                : '0.0001',
          };
        } else {
          const tradeTokenOutToWavax = new Trade(
            tokenOutRouter,
            new TokenAmount(
              swap[tokenOut],
              new BigNumber(amount).multipliedBy(`1e${swap[tokenOut].decimals}`).toString(),
            ),
            TradeType.EXACT_OUTPUT,
            Number(process.env.REACT_APP_CHAIN_ID),
          );
          const estimatedAmountWAavaxIn = tradeTokenOutToWavax.maximumAmountIn(zeroSlippageTolerance).raw.toString();
          const priceImpact1 = Number(tradeTokenOutToWavax.priceImpact.toSignificant(6)) - 0.3;
          const tradeWavaxToTokenIn = new Trade(
            tokenInRouter,
            new TokenAmount(swap[SwapTokenId.AVAX], estimatedAmountWAavaxIn),
            TradeType.EXACT_OUTPUT,
            Number(process.env.REACT_APP_CHAIN_ID),
          );
          const estimatedAmountToken = tradeWavaxToTokenIn.maximumAmountIn(zeroSlippageTolerance).raw.toString();
          const priceImpact2 = Number(tradeWavaxToTokenIn.priceImpact.toSignificant(6)) - 0.3;
          return {
            estimatedAmountToken: formatPercent(
              new BigNumber(estimatedAmountToken).div(`1e${swap[tokenIn].decimals}`).toNumber(),
              10,
              0,
            ),
            slippageTolerance: settingData!.slippage,
            minReceive: null,
            maxSold: formatForNumberLessThanCondition({
              value: new BigNumber(tradeWavaxToTokenIn.maximumAmountIn(currentSlippageTolerance).raw.toString())
                .div(`1e${swap[tokenIn].decimals}`)
                .toNumber(),
              minValueCondition: 0.000001,
              callback: formatPercent,
              callBackParams: [6, 0],
            }),
            tradingFee: calculateTradingFee(new BigNumber(estimatedAmountToken).toNumber(), swap[tokenIn]),
            priceImpact:
              Number(priceImpact1 + priceImpact2) !== 0 ? String(Number(priceImpact1 + priceImpact2)) : '0.0001',
          };
        }
      }
    } catch (error: any) {
      if (error instanceof InsufficientReservesError) {
        dispatch(setIsInsufficientLiquidityError(true));
      }
      return {
        estimatedAmountToken: '',
        slippageTolerance: settingData!.slippage,
        minReceive: null,
        maxSold: '0',
        tradingFee: '0',
        priceImpact: '0',
      };
    } finally {
      dispatch(setIsLoadEstimateToken(false));
    }
  };

  const handleLoadPairInfo = async () => {
    try {
      const [WAVAX_OXB, WAVAX_USDC, WAVAX_USDT] = await getPairsInfo();
      dispatch(
        setPairData({
          [SwapTokenId.OXB]: WAVAX_OXB,
          [SwapTokenId.AVAX]: WAVAX_OXB,
          [SwapTokenId.USDC]: WAVAX_USDC,
          [SwapTokenId.USDT]: WAVAX_USDT,
        }),
      );
      dispatch(setPairInfoLoaded(true));
    } catch (error: any) {
      createToast({
        message: error.message,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    handleLoadPairInfo();
    const interval = setInterval(() => {
      handleLoadPairInfo();
    }, getPairsInfoIntervalTime);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return {
    loadRecentTransaction,
    loadEstimateToken,
  };
};
