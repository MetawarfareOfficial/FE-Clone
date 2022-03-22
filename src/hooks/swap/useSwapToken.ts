import { useWeb3React } from '@web3-react/core';
import { usdcAbi } from 'abis/usdcAbi';
import BigNumber from 'bignumber.js';
import { bigNumber2Number } from 'helpers/formatNumber';
import { formatPrice } from 'helpers/formatPrice';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import get from 'lodash/get';
import { Exchange, TokenItem } from 'pages/Swap';
import { useState } from 'react';
import { useAppSelector } from 'stores/hooks';
import { useLoadSwapData } from './useLoadSwapData';

export enum SwapTokenId {
  AVAX = 'avax',
  OXB = '0xb',
  USDC = 'usdc',
}

const SwappableToken = {
  [SwapTokenId.OXB]: [SwapTokenId.AVAX, SwapTokenId.USDC],
  [SwapTokenId.USDC]: [SwapTokenId.OXB],
  [SwapTokenId.AVAX]: [SwapTokenId.OXB],
};

export const useSwapToken = () => {
  const { account } = useWeb3React();
  const { loading: TokenAddressesLoading } = useLoadSwapData();
  const { getBalanceNativeTokenOf, multipleCall, swap0xbToAvax } = useInteractiveContract();
  const tokenList = useAppSelector((state) => state.swap.tokenList);

  const [exchange, setExchange] = useState<Exchange>({
    from: SwapTokenId.AVAX,
    fromValue: null,
    fromBalance: 10,
    to: SwapTokenId.OXB,
    toValue: null,
    toBalance: 0,
  });
  const tokenAddresses = useAppSelector((state) => state.swap.tokenAddress);

  const handleGetNativeToken = async (address: string) => {
    const avaxToken = await getBalanceNativeTokenOf(address);
    const avaxAmount = bigNumber2Number(avaxToken);
    return avaxAmount;
  };

  const handleSwapToken = async () => {
    if (exchange.from === SwapTokenId.OXB && exchange.to === SwapTokenId.AVAX) {
      if (exchange.fromValue) {
        await swap0xbToAvax(exchange.fromValue);
      } else {
        throw new Error('swap amount token cannot be null');
      }
    } else if (exchange.from === SwapTokenId.OXB && exchange.to === SwapTokenId.USDC) {
      if (exchange.fromValue) {
        await swap0xbToAvax(exchange.fromValue);
      } else {
        throw new Error('swap amount token cannot be null');
      }
    } else {
      throw new Error('only 0xb -> Avax and 0xb -> usdc is supported');
    }
  };

  const getSwapTokenBalances = async (TokensList: TokenItem[]) => {
    if (account && tokenAddresses) {
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
      const newTokenList = TokensList.map((item) => {
        if (item.isNative) {
          return {
            ...item,
            balance: formatPrice(nativeTokenBalance, 4),
          };
        } else {
          const rawBalance = get(results, `[${item.id}].callsReturnContext[0].returnValues[0]`, 0) as any;
          const tokenDecimal = get(results, `[${item.id}].callsReturnContext[1].returnValues[0]`, 18);
          return {
            ...item,
            balance: formatPrice(new BigNumber(rawBalance.hex).div(Number(`1e${tokenDecimal}`)).toString(), 4),
          };
        }
      });
      return newTokenList;
    }
    return TokensList;
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

  return {
    getSwappaleTokens,
    getSwapTokenBalances,
    handleSwapToken,
    exchange,
    setExchange,
    account,
    TokenAddressesLoading,
  };
};
