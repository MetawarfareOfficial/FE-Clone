import { ethers } from 'ethers';
import { zeroExABI } from 'abis/zeroexAbi';
import { getInstanceEtherJs } from 'BaseEtherJs';

declare let window: any;

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '';
const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URLS);
const signer = window.ethereum && getInstanceEtherJs().getSigner();
const contractWithSigner = new ethers.Contract(contractAddress, zeroExABI, signer);
const contractWithoutSigner = new ethers.Contract(contractAddress, zeroExABI, provider);

/** write contract **/
export const approveToken = async (address?: string, amount?: number): Promise<void> => {
  try {
    return contractWithSigner.functions.approve(address, amount);
  } catch (err: any) {
    if (err.code === 4001) throw err;
    throw new Error('Oop! Something went wrong');
  }
};

export const cashOutAll = async (): Promise<void> => {
  try {
    return contractWithSigner.functions.cashoutAll();
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

/** read contract **/
export const getBalanceTokenOf = async (address: string): Promise<void> => {
  try {
    return contractWithoutSigner.functions.balanceOf(address);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};
