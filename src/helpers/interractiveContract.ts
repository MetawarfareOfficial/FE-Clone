import { BigNumber, ethers } from 'ethers';
import { zeroXBlockAbi } from 'abis/zeroXBlockAbi';
import { contractType } from 'consts/typeReward';
import { contractWithSigner as contractWithSignerInstance } from 'utils/contractWithSigner';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '';
const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URLS);
const contractWithoutSigner = new ethers.Contract(contractAddress, zeroXBlockAbi, provider);

/** write contract **/
export const approveToken = async (address?: string, amount?: string): Promise<void> => {
  try {
    return contractWithSignerInstance().functions.approve(address, amount);
  } catch (err: any) {
    if (err.code === 4001) throw err;
    throw new Error('Oop! Something went wrong');
  }
};

export const cashOutAll = async (): Promise<void> => {
  try {
    return contractWithSignerInstance().functions.cashoutAll();
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const publicDistributeRewards = async (): Promise<void> => {
  try {
    return contractWithSignerInstance().functions.publicDistributeRewards();
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const transferTokenTo = async (address: string, amount: string): Promise<void> => {
  try {
    return contractWithSignerInstance().functions.transfer(address, amount);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const createMultipleNodesWithTokens = async (names: string[], cType: string): Promise<Record<string, any>> => {
  try {
    return contractWithSignerInstance().functions.mintConts(names, cType.toString());
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const claimAllNodes = async () => {
  try {
    return contractWithSignerInstance().functions.cashoutAll();
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const claimNodeByNode = async (nodeIndex: number) => {
  try {
    return contractWithSignerInstance().functions.cashoutReward(nodeIndex);
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

export const getRewardAPRAllNode = async (): Promise<any[]> => {
  try {
    const squareApy = contractWithoutSigner.functions.getRewardAPRPerCont(contractType.square);
    const cubeApy = contractWithoutSigner.functions.getRewardAPRPerCont(contractType.cube);
    const tesseractApy = contractWithoutSigner.functions.getRewardAPRPerCont(contractType.tesseract);

    return await Promise.all([squareApy, cubeApy, tesseractApy]);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getPriceAllNode = async (): Promise<any[]> => {
  try {
    const squarePrice = contractWithoutSigner.functions.getContPrice(contractType.square);
    const cubePrice = contractWithoutSigner.functions.getContPrice(contractType.cube);
    const tesseractPrice = contractWithoutSigner.functions.getContPrice(contractType.tesseract);

    return await Promise.all([squarePrice, cubePrice, tesseractPrice]);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getTotalNodeByType = async (): Promise<any[]> => {
  try {
    const squareTotal = contractWithoutSigner.functions.getTotalContsPerContType(contractType.square);
    const cubeTotal = contractWithoutSigner.functions.getTotalContsPerContType(contractType.cube);
    const tesseractTotal = contractWithoutSigner.functions.getTotalContsPerContType(contractType.tesseract);

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
    return contractWithSignerInstance().functions.getContsCreationTime.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getNameOfNodes = async (): Promise<[string]> => {
  try {
    return contractWithSignerInstance().functions.getContsNames.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getRewardOfNodes = async (): Promise<[string]> => {
  try {
    return contractWithSignerInstance().functions.getContsRewards.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getTypeOfNodes = async (): Promise<[string]> => {
  try {
    return contractWithSignerInstance().functions.getContsTypes.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getRewardAmount = async (): Promise<[BigNumber]> => {
  try {
    return contractWithSignerInstance().functions.getRewardAmount.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getInitAPROfNodes = async (): Promise<[string]> => {
  try {
    return contractWithSignerInstance().functions.getContsInitialAPR.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getNodesCurrentAPR = async (): Promise<[string]> => {
  try {
    return contractWithSignerInstance().functions.getContsCurrentAPR.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getClaimPermit = async (): Promise<[boolean]> => {
  try {
    return contractWithoutSigner.functions.enableCashout.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getMintPermit = async (): Promise<[boolean]> => {
  try {
    return contractWithoutSigner.functions.enableMintConts.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getHoldingsWalletAddress = async (): Promise<string[][]> => {
  try {
    const devWallet = contractWithoutSigner.functions.developmentFundPool.call({});
    const treasuryWallet = contractWithoutSigner.functions.treasuryPool.call({});
    const rewardWallet = contractWithoutSigner.functions.rewardsPool.call({});
    const liquidityWallet = contractWithoutSigner.functions.liquidityPool.call({});

    return Promise.all([treasuryWallet, liquidityWallet, rewardWallet, devWallet]);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getUsdcTokenAddress = async (): Promise<string[]> => {
  try {
    return contractWithoutSigner.functions.usdcToken.call({});
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getTokenDistribution = async (): Promise<any[]> => {
  try {
    const developmentFee = contractWithoutSigner.functions.developmentFee.call({});
    const liquidityPoolFee = contractWithoutSigner.functions.liquidityPoolFee.call({});
    const rewardsFee = contractWithoutSigner.functions.rewardsFee.call({});
    const treasuryFee = contractWithoutSigner.functions.treasuryFee.call({});
    const cashOutFee = contractWithoutSigner.functions.cashoutFee.call({});

    return await Promise.all([developmentFee, liquidityPoolFee, rewardsFee, treasuryFee, cashOutFee]);
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};

export const getTotalSupply = async (): Promise<[BigNumber]> => {
  try {
    return contractWithoutSigner.functions.totalSupply();
  } catch (e) {
    throw new Error('Oop! Something went wrong');
  }
};
