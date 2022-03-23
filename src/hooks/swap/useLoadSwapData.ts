import { useWeb3React } from '@web3-react/core';
import { recentTransactionQuery } from 'consts/query';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { useEffect, useMemo, useState } from 'react';
import { setRecentTransactions, setTokenAddress } from 'services/swap';
import { useAppDispatch } from 'stores/hooks';
import { useQuery } from 'urql';
import { SwapTokenId } from './useSwapToken';
import get from 'lodash/get';
import moment from 'moment';
export interface TokenAddresses {
  [SwapTokenId.OXB]: string;
  [SwapTokenId.AVAX]: string;
  [SwapTokenId.USDC]: string;
}
export const useLoadSwapData = () => {
  const { getUsdcTokenAddress } = useInteractiveContract();
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const [result, reExecuteQuery] = useQuery({
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

  const loadSwapData = async () => {
    setLoading(true);
    try {
      // load token address
      const usdcTokenAddress = await getUsdcTokenAddress();
      const OxbTokenAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      const AvaxTokenAddress = process.env.REACT_APP_NATIVE_TOKEN_ADDRESS;
      dispatch(
        setTokenAddress({
          [SwapTokenId.OXB]: OxbTokenAddress || '',
          [SwapTokenId.AVAX]: AvaxTokenAddress || '',
          [SwapTokenId.USDC]: usdcTokenAddress[0] || '',
        }),
      );
    } catch {}
    setLoading(false);
  };

  const loadRecentTransaction = () => {
    reExecuteQuery({ requestPolicy: 'network-only' });
  };

  useEffect(() => {
    dispatch(setRecentTransactions(get(result, 'data.swaps', [])));
  }, [result.data]);

  useEffect(() => {
    loadSwapData();
  }, []);

  return {
    loadRecentTransaction,
    loading,
  };
};
