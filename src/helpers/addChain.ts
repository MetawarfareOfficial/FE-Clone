import { ethers } from 'ethers';

declare let window: any;

export const addEthereumChain = async () => {
  try {
    return await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: ethers.utils.hexlify(Number(process.env.REACT_APP_CHAIN_ID) || ''),
          rpcUrls: [process.env.REACT_APP_RPC_URLS],
          chainName: process.env.REACT_APP_CHAIN_NAME,
          nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
          blockExplorerUrls: [process.env.REACT_APP_EXPLORER_URLS],
        },
      ],
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
