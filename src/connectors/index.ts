import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS = {
  [process.env.REACT_APP_CHAIN_ID!]: process.env.REACT_APP_RPC_URLS,
};
export const injected = new InjectedConnector({
  supportedChainIds: [Number(process.env.REACT_APP_CHAIN_ID as string)],
});

export const walletConnect = new WalletConnectConnector({
  rpc: {
    [Number(process.env.REACT_APP_CHAIN_ID as string)]: String(RPC_URLS[process.env.REACT_APP_CHAIN_ID!]),
  },
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org',
  chainId: Number(process.env.REACT_APP_CHAIN_ID),
});
