import { BigNumber, ethers } from 'ethers';
import { zeroXBlockAbi } from 'abis/zeroXBlockAbi';
import { getInstanceEtherJs } from 'BaseEtherJs';
import { contractType } from 'consts/typeReward';

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

export const createMultipleNodesWithTokens = async (names: string[], cType: string): Promise<Record<string, any>> => {
  try {
    return contractWithSigner.functions.createMultipleNodesWithTokens(names, cType.toString());
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const claimAllNodes = async () => {
  try {
    return contractWithSigner.functions.cashoutAll();
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const claimNodeByNode = async (nodeIndex: number) => {
  try {
    return contractWithSigner.functions.cashoutReward(nodeIndex);
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

export const getRewardAPYAllNode = async (): Promise<any[]> => {
  try {
    const squareApy = contractWithoutSigner.functions.getRewardAPYPerNode(contractType.square);
    const cubeApy = contractWithoutSigner.functions.getRewardAPYPerNode(contractType.cube);
    const tesseractApy = contractWithoutSigner.functions.getRewardAPYPerNode(contractType.tesseract);

    return await Promise.all([squareApy, cubeApy, tesseractApy]);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getPriceAllNode = async (): Promise<any[]> => {
  try {
    const squarePrice = contractWithoutSigner.functions.getNodePrice(contractType.square);
    const cubePrice = contractWithoutSigner.functions.getNodePrice(contractType.cube);
    const tesseractPrice = contractWithoutSigner.functions.getNodePrice(contractType.tesseract);

    return await Promise.all([squarePrice, cubePrice, tesseractPrice]);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getTotalNodeByType = async (): Promise<any[]> => {
  try {
    const squareTotal = contractWithoutSigner.functions.getTotalCreatedNodesPerContractType(contractType.square);
    const cubeTotal = contractWithoutSigner.functions.getTotalCreatedNodesPerContractType(contractType.cube);
    const tesseractTotal = contractWithoutSigner.functions.getTotalCreatedNodesPerContractType(contractType.tesseract);

    return await Promise.all([squareTotal, cubeTotal, tesseractTotal]);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getNumberNodeOf = async (address: string): Promise<[BigNumber]> => {
  try {
    return contractWithoutSigner.functions.getNodeNumberOf(address);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getTimeCreatedOfNodes = async (): Promise<[string]> => {
  try {
    return contractWithSigner.functions.getNodesCreatime.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getNameOfNodes = async (): Promise<[string]> => {
  try {
    return contractWithSigner.functions.getNodesNames.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getRewardOfNodes = async (): Promise<[string]> => {
  try {
    return contractWithSigner.functions.getNodesRewards.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getTypeOfNodes = async (): Promise<[string]> => {
  try {
    return contractWithSigner.functions.getNodesTypes.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getRewardAmount = async (): Promise<[BigNumber]> => {
  try {
    return contractWithSigner.functions.getRewardAmount.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getInitApyOfNodes = async (): Promise<[string]> => {
  try {
    return contractWithSigner.functions.getNodesInitialAPY.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};
