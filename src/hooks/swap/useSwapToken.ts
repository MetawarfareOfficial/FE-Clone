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
import moment from 'moment';

export enum SwapTokenId {
  AVAX = 'avax',
  OXB = '0xb',
  USDC = 'usdc',
  USDT = 'usdt',
}

const SwappableToken = {
  [SwapTokenId.OXB]: [SwapTokenId.AVAX, SwapTokenId.USDC, SwapTokenId.USDT],
  [SwapTokenId.USDC]: [SwapTokenId.OXB],
  [SwapTokenId.AVAX]: [SwapTokenId.OXB],
  [SwapTokenId.USDT]: [SwapTokenId.OXB],
};

export const useSwapToken = () => {
  const { account } = useWeb3React();
  const { loadRecentTransaction, loadEstimateToken } = useLoadSwapData();
  const {
    getBalanceNativeTokenOf,
    multipleCall,
    swap0xbToExactToken,
    swapExact0xbToToken,
    swapExactTokenTo0xb,
    swapTokenToExact0xb,
    approveToken,
  } = useInteractiveContract();
  const tokenList = useAppSelector((state) => state.swap.tokenList);

  const tokenAddresses = useAppSelector((state) => state.swap.tokenAddress);

  const handleGetNativeToken = async (address: string) => {
    const avaxToken = await getBalanceNativeTokenOf(address);
    const avaxAmount = bigNumber2Number(avaxToken);
    return avaxAmount;
  };

  const handleSwapToken = async (
    _exchange: Exchange,
    isExactOut: boolean,
    setting: {
      slippage: string;
      deadline: string;
    },
  ) => {
    const tokenIn = tokenList.filter((item) => _exchange.fromId === item.id);
    const tokenOut = tokenList.filter((item) => _exchange.toId === item.id);
    if (!tokenIn[0] || !tokenOut[0]) {
      throw new Error('Cannot find tokens');
    }
    const slippage = new BigNumber(setting.slippage).multipliedBy(1e6).toString();
    const deadline = new BigNumber(moment().unix())
      .plus(new BigNumber(setting.deadline).multipliedBy(60000))
      .toString();
    if (_exchange.fromId === SwapTokenId.OXB) {
      if (isExactOut) {
        return await swap0xbToExactToken(
          tokenOut[0].address,
          new BigNumber(Number(_exchange.toValue)).multipliedBy(`1e${tokenOut[0].decimal}`).toString(),
          slippage,
          deadline,
        );
      } else {
        return await swapExact0xbToToken(
          tokenOut[0].address,
          new BigNumber(Number(_exchange.fromValue)).multipliedBy(`1e${tokenIn[0].decimal}`).toString(),
          slippage,
          deadline,
        );
      }
    } else if (_exchange.toId === SwapTokenId.OXB) {
      if (isExactOut) {
        return await swapTokenToExact0xb(
          tokenIn[0].address,
          new BigNumber(Number(_exchange.toValue)).multipliedBy(`1e${tokenOut[0].decimal}`).toString(),
          slippage,
          deadline,
        );
      } else {
        return await swapExactTokenTo0xb(
          tokenIn[0].address,
          new BigNumber(Number(_exchange.fromValue)).multipliedBy(`1e${tokenIn[0].decimal}`).toString(),
          slippage,
          deadline,
        );
      }
    } else {
      throw new Error('Tokens are not supported to swap');
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
                reference: 'allowance',
                methodName: 'allowance',
                methodParameters: [account, process.env.REACT_APP_CONTRACT_ADDRESS],
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
          const allowance = get(results, `[${item.id}].callsReturnContext[1].returnValues[0]`, 0) as any;
          return {
            ...item,
            balance: new BigNumber(rawBalance.hex).div(Number(`1e${item.decimal}`)).toString(),
            allowanceBalance:
              item.id === SwapTokenId.OXB || item.id === SwapTokenId.AVAX
                ? item.allowanceBalance
                : new BigNumber(allowance.hex).div(Number(`1e${item.decimal}`)).toString(),
          };
        }
      });
      return newTokenList;
    } else {
      return _tokensList.map((item) => {
        return {
          ...item,
          balance: 0,
          allowanceBalance: item.id === SwapTokenId.OXB || item.id === SwapTokenId.AVAX ? item.allowanceBalance : '0',
        };
      });
    }
  };

  const getSwappaleTokens = (tokenId: SwapTokenId, selectedToken: SwapTokenId) => {
    const clonedTokenList = [...tokenList];
    const swappableTokens = SwappableToken[tokenId];
    return clonedTokenList.map((item) => {
      if (item.id == selectedToken) {
        return {
          ...item,
          disabled: true,
        };
      } else if (swappableTokens.includes(item.id)) {
        return {
          ...item,
          disabled: false,
        };
      }
      return {
        ...item,
        disabled: true,
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
    approveToken,
    account,
  };
};
