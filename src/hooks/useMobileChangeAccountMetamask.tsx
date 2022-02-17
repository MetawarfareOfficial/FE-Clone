import { useEffect } from 'react';

declare let window: any;

const useMobileChangeAccountMetamask = () => {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        if (window.innerWidth < 600) window.location.reload();
      });
    }
  }, []);
};

export default useMobileChangeAccountMetamask;
