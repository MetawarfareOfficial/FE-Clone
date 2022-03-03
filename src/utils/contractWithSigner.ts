import { getInstanceEtherJs } from '../BaseEtherJs';
import { ethers } from 'ethers';
import { zeroXBlockAbi } from 'abis/zeroXBlockAbi';

declare let window: any;

export const contractWithSigner = () => {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '';
  const signer = window.ethereum && getInstanceEtherJs().getSigner();
  return new ethers.Contract(contractAddress, zeroXBlockAbi, signer);
};
