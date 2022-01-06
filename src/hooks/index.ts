import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { toast } from 'react-toastify';

export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
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
  const validChainId = process.env.REACT_APP_CHAIN_ID || '';

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = async () => {};
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const handleChainChanged = async (chainId: string | number) => {};
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const handleAccountsChanged = async (accounts: string[]) => {};
      const handleNetworkChanged = async (networkId: string | number) => {
        if (networkId.toString() !== validChainId.toString()) {
          toast.error(`unsupported network ${networkId}`, { hideProgressBar: true });
          return;
        }
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate, deactivate]);
};
