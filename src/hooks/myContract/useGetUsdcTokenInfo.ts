import { useWeb3React } from '@web3-react/core';
import { usdcAbi } from 'abis/rinkeby';
import { useEffect } from 'react';
import { useAppDispatch } from 'stores/hooks';
import { getTokenBalanceFromWalletAddress } from 'helpers';
import { getTokenAllowanceFromWalletAddress } from 'helpers/getTokenBalanceFromWalletAddress';
import { setUsdcToken, setUsdcTokenLoaded } from 'services/contract';
import { getBalanceIntervalTime } from 'consts/swap';
import { useToast } from 'hooks/useToast';

export const useGetUsdcTokenInfo = () => {
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();
  const { createToast } = useToast();

  const handleGetTokenBalances = async () => {
    try {
      const tokenBalance = await getTokenBalanceFromWalletAddress(
        String(process.env.REACT_APP_USDC_TOKEN_ADDRESS),
        usdcAbi,
        account!,
      );
      const allowanceAmount = await getTokenAllowanceFromWalletAddress(
        String(process.env.REACT_APP_USDC_TOKEN_ADDRESS),
        usdcAbi,
        account!,
        String(process.env.REACT_APP_CONTS_REWARD_MANAGER),
        String(process.env.REACT_APP_USDC_DECIMALS),
      );
      dispatch(
        setUsdcToken({
          balance: tokenBalance,
          allowance: allowanceAmount,
        }),
      );
      dispatch(setUsdcTokenLoaded(true));
    } catch {
      createToast({
        type: 'error',
        message: 'Oop! Something went wrong',
      });
    }
  };

  useEffect(() => {
    handleGetTokenBalances();
    let getTokenBalancesInterval: NodeJS.Timer;
    if (account) {
      getTokenBalancesInterval = setInterval(handleGetTokenBalances, getBalanceIntervalTime);
    }
    return () => {
      if (getTokenBalancesInterval) {
        clearInterval(getTokenBalancesInterval);
      }
    };
  }, [account]);

  return {
    handleGetTokenBalances,
  };
};
