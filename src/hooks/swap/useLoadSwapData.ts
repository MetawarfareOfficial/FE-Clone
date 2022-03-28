import { useWeb3React } from '@web3-react/core';
import { recentTransactionQuery } from 'consts/query';
import { intervalTime } from 'consts/swap';
import { convertGetAmountTokenData } from 'helpers/convertGetAmountTokenData';
import { convertSwapTokenRate } from 'helpers/convertSwapTokenRate';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import { ExchangeItem } from 'pages/Swap';
import { useEffect, useMemo, useState } from 'react';
import {
  handleSetCloneExchange,
  handleSetExchange,
  handleSetIsEstimateFrom,
  setIsInsufficientLiquidityError,
  setIsLoadEstimateToken,
  setRecentTransactions,
  setSelectedName,
  setSwapTokenRates,
  setTokenAddress,
} from 'services/swap';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { useQuery } from 'urql';
import { SwapTokenId } from './useSwapToken';

export interface TokenAddresses {
  [SwapTokenId.OXB]: string;
  [SwapTokenId.AVAX]: string;
  [SwapTokenId.USDC]: string;
}

interface Test {
  _selectedName: string | null;
  _tokenList: any;
  _exchangeFrom: ExchangeItem;
  _exchangeTo: ExchangeItem;
  _isSwap: boolean;
  _isEstimateFrom: boolean;
  _changeEstimateFrom?: boolean;
}

export const useLoadSwapData = () => {
  const { getAmountTokenOut, getAmountTokenIn } = useInteractiveContract();
  const { account } = useWeb3React();

  const selectedName = useAppSelector((state) => state.swap.selectedName);
  const tokenList = useAppSelector((state) => state.swap.tokenList);
  const isLoadEstimateToken = useAppSelector((state) => state.swap.isLoadEstimateToken);
  const cloneExchange = useAppSelector((state) => state.swap.cloneExchange);
  const exchange = useAppSelector((state) => state.swap.exchange);
  const isEstimateFrom = useAppSelector((state) => state.swap.isEstimateFrom);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const [recentTransactionResult, reExecuteLoadRecentTransactionQuery] = useQuery({
    query: recentTransactionQuery,
    variables: {
      address: account,
      date: moment().subtract('7', 'days').endOf('day').unix(),
    },
    pause: !account,
    context: useMemo(
      () => ({
        url: process.env.REACT_APP_GRAPH_RECENT_TRANSACTION_API_URL,
      }),
      [],
    ),
  });

  const loadSwapData = () => {
    setLoading(true);
    try {
      // load token address
      const usdcTokenAddress = process.env.REACT_APP_USDC_TOKEN_ADDRESS;
      const OxbTokenAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      const AvaxTokenAddress = process.env.REACT_APP_NATIVE_TOKEN_ADDRESS;
      dispatch(
        setTokenAddress({
          [SwapTokenId.OXB]: OxbTokenAddress || '',
          [SwapTokenId.AVAX]: AvaxTokenAddress || '',
          [SwapTokenId.USDC]: usdcTokenAddress || '',
        }),
      );
    } catch {}
    setLoading(false);
  };

  const loadRecentTransaction = () => {
    reExecuteLoadRecentTransactionQuery({ requestPolicy: 'network-only' });
  };

  useEffect(() => {
    dispatch(setRecentTransactions(get(recentTransactionResult, 'data.swaps', [])));
  }, [recentTransactionResult.data]);

  const loadEstimateToken = async ({
    _selectedName,
    _tokenList,
    _exchangeFrom,
    _exchangeTo,
    _isSwap = false,
    _isEstimateFrom,
    _changeEstimateFrom = false,
  }: Test) => {
    dispatch(setIsLoadEstimateToken(true));
    try {
      const tokenOut = _tokenList.filter((item: any) => item.id === _exchangeTo.id);
      const tokenIn = _tokenList.filter((item: any) => item.id === _exchangeFrom.id);
      if (tokenOut[0] && tokenIn[0]) {
        const is0xbOut = tokenOut[0].id === SwapTokenId.OXB;
        if (_selectedName === 'from') {
          if (!_exchangeFrom.value || Number(_exchangeFrom.value) <= 0) {
            dispatch(
              handleSetCloneExchange({
                fromId: _exchangeFrom.id,
                fromValue: _exchangeFrom.value,
                fromRawValue: _exchangeFrom.rawValue,
                toId: _exchangeTo.id,
                toValue: null,
                toRawValue: null,
              }),
            );
            if (_isSwap) {
              dispatch(
                handleSetExchange({
                  fromId: _exchangeFrom.id,
                  fromValue: _exchangeFrom.value,
                  fromRawValue: _exchangeFrom.rawValue,
                  toId: _exchangeTo.id,
                  toValue: null,
                  toRawValue: null,
                }),
              );
            }
          } else {
            const response = await getAmountTokenOut(
              is0xbOut ? tokenIn[0].address : tokenOut[0].address,
              Number(_exchangeFrom.value) || 0,
              Number(tokenOut[0].decimal),
              tokenOut[0].id === SwapTokenId.OXB,
              tokenIn[0].id === SwapTokenId.AVAX,
            );
            const results = convertGetAmountTokenData(response, _exchangeFrom.id, _exchangeTo.id) as any;
            if (results) {
              const afterSwapResult = results.afterSwap;
              const currentSwapResult = results.current;
              if (afterSwapResult.length <= 0) {
                throw new Error('IsInsufficient Liquidity Error');
              }
              dispatch(
                handleSetCloneExchange({
                  fromId: _exchangeFrom.id,
                  fromValue: _exchangeFrom.value,
                  fromRawValue: _exchangeFrom.rawValue,
                  toId: _exchangeTo.id,
                  toValue: Number(afterSwapResult[2] ? afterSwapResult[2] : afterSwapResult[1]).toFixed(6),
                  toRawValue: Number(afterSwapResult[2] ? afterSwapResult[2] : afterSwapResult[1]),
                }),
              );
              dispatch(
                setSwapTokenRates({
                  current: convertSwapTokenRate(currentSwapResult),
                  afterSwap: convertSwapTokenRate(afterSwapResult),
                }),
              );
              if (_isSwap) {
                dispatch(
                  handleSetExchange({
                    fromId: _exchangeFrom.id,
                    fromValue: _exchangeFrom.value,
                    fromRawValue: _exchangeFrom.rawValue,
                    toId: _exchangeTo.id,
                    toValue: Number(afterSwapResult[2] ? afterSwapResult[2] : afterSwapResult[1]).toFixed(6),
                    toRawValue: Number(afterSwapResult[2] ? afterSwapResult[2] : afterSwapResult[1]),
                  }),
                );
              }
            }
          }
        } else if (_selectedName === 'to') {
          if (!_exchangeTo.value || Number(_exchangeTo.value) <= 0) {
            dispatch(
              handleSetCloneExchange({
                fromId: _exchangeFrom.id,
                fromValue: null,
                fromRawValue: null,
                toId: _exchangeTo.id,
                toValue: _exchangeTo.value,
                toRawValue: _exchangeTo.rawValue,
              }),
            );
            if (_isSwap) {
              dispatch(
                handleSetExchange({
                  fromId: _exchangeFrom.id,
                  fromValue: null,
                  fromRawValue: null,
                  toId: _exchangeTo.id,
                  toValue: _exchangeTo.value,
                  toRawValue: _exchangeTo.rawValue,
                }),
              );
            }
          } else {
            const response = await getAmountTokenIn(
              is0xbOut ? tokenIn[0].address : tokenOut[0].address,
              Number(_exchangeTo.value) || 0,
              Number(tokenOut[0].decimal),
              tokenOut[0].id === SwapTokenId.OXB,
            );
            const results = convertGetAmountTokenData(response, _exchangeFrom.id, _exchangeTo.id) as any;
            if (results) {
              const afterSwapResult = results.afterSwap;
              const currentSwapResult = results.current;
              if (afterSwapResult.length <= 0) {
                throw new Error('Insufficient Liquidity Error');
              }
              dispatch(
                handleSetCloneExchange({
                  fromId: _exchangeFrom.id,
                  fromValue: Number(afterSwapResult[0]).toFixed(6),
                  fromRawValue: Number(afterSwapResult[0]).toFixed(6),
                  toId: _exchangeTo.id,
                  toValue: _exchangeTo.value,
                  toRawValue: _exchangeTo.rawValue,
                }),
              );
              dispatch(
                setSwapTokenRates({
                  current: convertSwapTokenRate(currentSwapResult),
                  afterSwap: convertSwapTokenRate(afterSwapResult),
                }),
              );
              if (_isSwap) {
                dispatch(
                  handleSetExchange({
                    fromId: _exchangeFrom.id,
                    fromValue: Number(afterSwapResult[0]).toFixed(6),
                    fromRawValue: Number(afterSwapResult[0]).toFixed(6),
                    toId: _exchangeTo.id,
                    toValue: _exchangeTo.value,
                    toRawValue: _exchangeTo.rawValue,
                  }),
                );
              }
            }
          }
        }
        dispatch(setIsInsufficientLiquidityError(false));
      }
    } catch (error) {
      if (_selectedName === 'from') {
        dispatch(
          handleSetCloneExchange({
            fromId: _exchangeFrom.id,
            fromValue: _exchangeFrom.value,
            fromRawValue: _exchangeFrom.rawValue,
            toId: _exchangeTo.id,
            toValue: null,
            toRawValue: null,
          }),
        );
        if (_isSwap) {
          dispatch(
            handleSetExchange({
              fromId: _exchangeFrom.id,
              fromValue: _exchangeFrom.value,
              fromRawValue: _exchangeFrom.rawValue,
              toId: _exchangeTo.id,
              toValue: null,
              toRawValue: null,
            }),
          );
        }
      } else {
        dispatch(
          handleSetCloneExchange({
            fromId: _exchangeFrom.id,
            fromValue: null,
            fromRawValue: null,
            toId: _exchangeTo.id,
            toValue: _exchangeTo.value,
            toRawValue: _exchangeTo.value,
          }),
        );
        if (_isSwap) {
          dispatch(
            handleSetExchange({
              fromId: _exchangeFrom.id,
              fromValue: null,
              fromRawValue: null,
              toId: _exchangeTo.id,
              toValue: _exchangeTo.value,
              toRawValue: _exchangeTo.value,
            }),
          );
        }
      }
      dispatch(setIsInsufficientLiquidityError(true));
    }
    dispatch(setSelectedName(_selectedName));
    if (_changeEstimateFrom) {
      dispatch(handleSetIsEstimateFrom(!_isEstimateFrom));
    }
    dispatch(setIsLoadEstimateToken(false));
  };

  useEffect(() => {
    if (!isLoadEstimateToken && !isEqual(cloneExchange, exchange)) {
      dispatch(handleSetExchange(cloneExchange));
    }
  }, [isLoadEstimateToken, cloneExchange, exchange]);

  useEffect(() => {
    loadSwapData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if ((exchange.fromId && selectedName == 'from') || (exchange.toId && selectedName == 'to')) {
      interval = setInterval(() => {
        loadEstimateToken({
          _selectedName: selectedName,
          _exchangeFrom: {
            id: exchange.fromId,
            value: exchange.fromValue,
            rawValue: exchange.fromRawValue,
          },
          _exchangeTo: {
            id: exchange.toId,
            value: exchange.toValue,
            rawValue: exchange.toRawValue,
          },
          _tokenList: tokenList,
          _isSwap: false,
          _isEstimateFrom: isEstimateFrom,
        });
      }, intervalTime);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedName, exchange, isEstimateFrom, tokenList]);

  return {
    loadRecentTransaction,
    loadEstimateToken,
    loading,
  };
};
