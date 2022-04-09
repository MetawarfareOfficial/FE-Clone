import { getInstanceEtherJs } from 'BaseEtherJs';
import { ethers } from 'ethers';
import { zeroXBlockAbi } from 'abis/zeroXBlockAbi';
import { usdcEAbi } from 'abis/usdcEAbi';
import { usdcAbi } from 'abis/usdcAbi';

declare let window: any;

export const contractWithSigner = () => {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '';
  const signer = window.ethereum && getInstanceEtherJs().getSigner();
  return new ethers.Contract(contractAddress, zeroXBlockAbi, signer);
};

export const contractUsdcE = () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URLS);
  const contractAddress = process.env.REACT_APP_USDC_E_CONTRACT_ADDRESS || '';
  return new ethers.Contract(contractAddress, usdcEAbi, provider);
};

export const contractUsdc = () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URLS);
  const contractAddress = process.env.REACT_APP_USDC_TOKEN_ADDRESS || '';
  return new ethers.Contract(contractAddress, usdcAbi, provider);
};
