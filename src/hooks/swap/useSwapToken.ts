import { useWeb3React } from '@web3-react/core';
import { usdcAbi } from 'abis/usdcAbi';
import BigNumber from 'bignumber.js';
import { intervalTime } from 'consts/swap';
import { bigNumber2Number } from 'helpers/formatNumber';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import get from 'lodash/get';
import { Exchange, TokenItem } from 'pages/Swap';
import { useEffect } from 'react';
import { useAppSelector } from 'stores/hooks';
import { useLoadSwapData } from './useLoadSwapData';

export enum SwapTokenId {
  AVAX = 'avax',
  OXB = '0xb',
  USDC = 'usdc',
  USDT = 'usdt',
}

const SwappableToken = {
  [SwapTokenId.OXB]: [SwapTokenId.AVAX, SwapTokenId.USDC],
  [SwapTokenId.USDC]: [SwapTokenId.OXB],
  [SwapTokenId.AVAX]: [SwapTokenId.OXB],
  [SwapTokenId.USDT]: [SwapTokenId.OXB],
};

export const useSwapToken = () => {
  const { account } = useWeb3React();
  const { loadRecentTransaction, loadEstimateToken } = useLoadSwapData();
  const { getBalanceNativeTokenOf, multipleCall, swap0xbToTokens } = useInteractiveContract();
  const tokenList = useAppSelector((state) => state.swap.tokenList);

  const tokenAddresses = useAppSelector((state) => state.swap.tokenAddress);

  const handleGetNativeToken = async (address: string) => {
    const avaxToken = await getBalanceNativeTokenOf(address);
    const avaxAmount = bigNumber2Number(avaxToken);
    return avaxAmount;
  };

  const handleSwapToken = async (_exchange: Exchange, isExactOut: boolean) => {
    const tokenIn = tokenList.filter((item) => _exchange.fromId === item.id);
    const tokenOut = tokenList.filter((item) => _exchange.toId === item.id);
    if (_exchange.fromId !== SwapTokenId.OXB) {
      throw new Error('only 0xb -> Avax and 0xb -> usdc is supported');
    } else if (tokenIn.length === 0 || tokenOut.length === 0) {
      throw new Error('some thing wrong');
    } else if (!_exchange.toValue || !_exchange.fromValue) {
      throw new Error('some thing wrong');
    } else {
      const amount = isExactOut ? _exchange.toValue : _exchange.fromValue;
      const decimal = isExactOut ? tokenOut[0].decimal : tokenIn[0].decimal;
      return await swap0xbToTokens(tokenOut[0].address, amount, String(decimal), isExactOut);
    }
  };

  const getSwapTokenBalances = async (_tokensList: TokenItem[]) => {
    if (account) {
      const nativeTokenBalance = await handleGetNativeToken(account);
      const multiCallParams = tokenList
        .filter((item) => !item.isNative)
        .map((item) => {
          return {
            reference: item.id,
            contractAddress: tokenAddresses[item.id],
            abi: usdcAbi,
            calls: [
              {
                reference: 'balance',
                methodName: 'balanceOf',
                methodParameters: [account],
              },
              {
                reference: 'decimals',
                methodName: 'decimals',
                methodParameters: [],
              },
            ],
          };
        });
      const results = await multipleCall(multiCallParams);
      const newTokenList = _tokensList.map((item) => {
        if (item.isNative) {
          return {
            ...item,
            balance: nativeTokenBalance,
          };
        } else {
          const rawBalance = get(results, `[${item.id}].callsReturnContext[0].returnValues[0]`, 0) as any;
          const tokenDecimal = get(results, `[${item.id}].callsReturnContext[1].returnValues[0]`, 18);
          return {
            ...item,
            balance: new BigNumber(rawBalance.hex).div(Number(`1e${tokenDecimal}`)).toString(),
          };
        }
      });
      return newTokenList;
    } else {
      return _tokensList.map((item) => {
        return {
          ...item,
          balance: 0,
        };
      });
    }
  };

  const getSwappaleTokens = (tokenId: SwapTokenId) => {
    const clonedTokenList = [...tokenList];
    const swappableTokens = SwappableToken[tokenId];
    return clonedTokenList.map((item) => {
      if (swappableTokens.includes(item.id) || item.id == tokenId) {
        return {
          ...item,
          disabled: true,
        };
      }
      return {
        ...item,
        disabled: false,
      };
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      loadRecentTransaction();
    }, intervalTime);
    return () => {
      clearInterval(interval);
    };
  }, [account]);

  return {
    getSwappaleTokens,
    getSwapTokenBalances,
    handleSwapToken,
    loadEstimateToken,
    account,
  };
};
