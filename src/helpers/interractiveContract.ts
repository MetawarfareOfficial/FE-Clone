import { BigNumber, ethers } from 'ethers';
import { zeroXBlockAbi } from 'abis/zeroXBlockAbi';
import { getInstanceEtherJs } from 'BaseEtherJs';

declare let window: any;

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '';
const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URLS);
const signer = window.ethereum && getInstanceEtherJs().getSigner();
const contractWithSigner = new ethers.Contract(contractAddress, zeroXBlockAbi, signer);
const contractWithoutSigner = new ethers.Contract(contractAddress, zeroXBlockAbi, provider);

/** write contract **/
export const approveToken = async (address?: string, amount?: string): Promise<void> => {
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

export const publicDistributeRewards = async (): Promise<void> => {
  try {
    return contractWithSigner.functions.publicDistributeRewards();
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const transferTokenTo = async (address: string, amount: string): Promise<void> => {
  try {
    return contractWithSigner.functions.transfer(address, amount);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const createNodeWithToken = async (name: string, cType: string): Promise<void> => {
  try {
    return contractWithSigner.functions.createNodeWithToken(name, cType);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

/** read contract **/
export const getBalanceTokenOf = async (address: string): Promise<[BigNumber]> => {
  try {
    return contractWithoutSigner.functions.balanceOf(address);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getBalanceNativeTokenOf = async (address: string): Promise<BigNumber> => {
  try {
    return provider.getBalance(address);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};
