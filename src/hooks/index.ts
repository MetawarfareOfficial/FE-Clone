import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { ethers } from 'ethers';
import { errorMessage } from 'messages/errorMessages';
import { unAuthenticateUser } from 'services/auth';
import { useToast } from './useToast';
export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then(async (isAuthorized: boolean) => {
      alert(`isAuthorized: ${isAuthorized} `);
      if (isAuthorized) {
        await activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []);

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

  const handleAccountsChanged = (accounts: string[]) => {
    if (!accounts[0]) {
      unAuthenticateUser();
    }
  };

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      injected.on('Web3ReactDeactivate', unAuthenticateUser);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [active, error, suppress, activate, deactivate]);

  useEffect(() => {
    const { ethereum } = window as any;
    if (ethereum) {
      ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    } else {
      unAuthenticateUser();
    }
  }, []);
};
