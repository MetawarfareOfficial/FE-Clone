import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { ethers } from 'ethers';
import { errorMessage } from 'messages/errorMessages';
import { getToken, unAuthenticateUser } from 'services/auth';
import { useToast } from './useToast';
import { useWindowSize } from './useWindowSize';
export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();
  const { ethereum } = window as any;
  const [tried, setTried] = useState(false);
  const [size] = useWindowSize();

  const handleAccountsChanged = (accounts: string[]) => {
    if (!accounts[0]) {
      unAuthenticateUser();
    }
  };

  useEffect(() => {
    const { ethereum } = window as any;
    // trying to active if the account is being connected on the metamask
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
        unAuthenticateUser();
      }
    });
    // listeners
    if (ethereum) {
      ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  const handleReloadPageIfEthereumRequestNotResponse = async (ethereum: any) => {
    const waitingTime = 1000;
    const reloadPageTimeOut = setTimeout(() => {
      window.location.reload();
    }, waitingTime);
    await ethereum.request({ method: 'eth_requestAccounts' });
    clearTimeout(reloadPageTimeOut);
  };

  useEffect(() => {
    // this is for fixing bug ethereum.request does not response on metamask mobile
    if (ethereum && ethereum.isMetaMask && size < 600 && getToken()) {
      handleReloadPageIfEthereumRequestNotResponse(ethereum);
    }
  }, [ethereum, size, getToken()]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};

export const useInactiveListener = (suppress = false) => {
  const { active, error, activate, deactivate } = useWeb3React();
  const { createToast } = useToast();
  const validChainId = ethers.utils.hexlify(Number(process.env.REACT_APP_CHAIN_ID));

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum) {
      ethereum.removeAllListeners(['networkChanged']);
    }

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = async (chainId: string | number) => {
        if (chainId.toString() !== validChainId.toString()) {
          createToast({
            message: errorMessage.META_MASK_WRONG_NETWORK.message,
            type: 'error',
          });
          return;
        }
      };

      injected.on('Web3ReactDeactivate', unAuthenticateUser);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [active, error, suppress, activate, deactivate]);
};
