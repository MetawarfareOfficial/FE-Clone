import React, { useEffect } from 'react';
import { getToken } from 'services/auth';

export const useCheckEthereumResponse = () => {
  const [ethereumOk, setEthereumOk] = React.useState(false);
  const { ethereum } = window as any;

  useEffect(() => {
    // this is for fixing bug ethereum.request does not response on metamask
    if (ethereum && ethereum.isMetaMask && getToken()) {
      const waitingTime = 2000;
      const reloadPageTimeOut = setTimeout(() => {
        window.location.reload();
      }, waitingTime);
      ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
        clearTimeout(reloadPageTimeOut);
        setEthereumOk(true);
      });
      return () => {
        clearTimeout(reloadPageTimeOut);
      };
    } else {
      setEthereumOk(true);
    }
  }, [ethereum, getToken()]);
  return {
    ethereumOk,
  };
};
