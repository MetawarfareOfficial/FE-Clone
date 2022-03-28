import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import { BigNumber as BN } from 'bignumber.js';
import { zeroXBlockAbi } from 'abis/zeroXBlockAbi';
import { contractType } from 'consts/typeReward';
import { getNetWorkRpcUrl } from 'connectors';
import { Multicall, ContractCallResults, ContractCallContext } from 'ethereum-multicall';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '';
const provider = new ethers.providers.JsonRpcProvider(getNetWorkRpcUrl());
const contractWithoutSigner = new ethers.Contract(contractAddress, zeroXBlockAbi, provider);

interface MultiCallItem {
  reference: string;
  methodName: string;
  methodParameters: any[];
}

BN.config({
  EXPONENTIAL_AT: 100,
});

export interface MultiCallList {
  reference: string;
  contractAddress: string;
  abi: any;
  calls: MultiCallItem[];
}

export const useInteractiveContract = () => {
  const { library, account } = useWeb3React();

  const contractWithSigner =
    library && account
      ? new ethers.Contract(contractAddress, zeroXBlockAbi, library.getSigner(account))
      : contractWithoutSigner;

  const approveToken = async (address?: string, amount?: string): Promise<void> => {
    try {
      return contractWithSigner.functions.approve(address, amount);
    } catch (err: any) {
      if (err.code === 4001) throw err;
      throw new Error('Oop! Something went wrong');
    }
  };

  const publicDistributeRewards = async (): Promise<void> => {
    try {
      return contractWithSigner.functions.publicDistributeRewards();
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const transferTokenTo = async (address: string, amount: string): Promise<void> => {
    try {
      return contractWithSigner.functions.transfer(address, amount);
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const createMultipleNodesWithTokens = async (names: string[], cType: string): Promise<Record<string, any>> => {
    try {
      return contractWithSigner.functions.mintConts(names, cType.toString());
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const claimAllNodes = async () => {
    try {
      return contractWithSigner.functions.cashoutAll();
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const claimNodeByNode = async (nodeIndex: number) => {
    try {
      return contractWithSigner.functions.cashoutReward(nodeIndex);
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  /** read contract **/
  const getBalanceTokenOf = async (address: string): Promise<[BigNumber]> => {
    try {
      return contractWithoutSigner.functions.balanceOf(address);
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getBalanceNativeTokenOf = async (address: string): Promise<BigNumber> => {
    try {
      return provider.getBalance(address);
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getRewardAPRAllNode = async (): Promise<any[]> => {
    try {
      const squareApy = contractWithoutSigner.functions.getRewardAPRPerCont(contractType.square);
      const cubeApy = contractWithoutSigner.functions.getRewardAPRPerCont(contractType.cube);
      const tesseractApy = contractWithoutSigner.functions.getRewardAPRPerCont(contractType.tesseract);

      return await Promise.all([squareApy, cubeApy, tesseractApy]);
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getPriceAllNode = async (): Promise<any[]> => {
    try {
      const squarePrice = contractWithoutSigner.functions.getContPrice(contractType.square);
      const cubePrice = contractWithoutSigner.functions.getContPrice(contractType.cube);
      const tesseractPrice = contractWithoutSigner.functions.getContPrice(contractType.tesseract);

      return await Promise.all([squarePrice, cubePrice, tesseractPrice]);
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getTotalNodeByType = async (): Promise<any[]> => {
    try {
      const squareTotal = contractWithoutSigner.functions.getTotalContsPerContType(contractType.square);
      const cubeTotal = contractWithoutSigner.functions.getTotalContsPerContType(contractType.cube);
      const tesseractTotal = contractWithoutSigner.functions.getTotalContsPerContType(contractType.tesseract);

      return await Promise.all([squareTotal, cubeTotal, tesseractTotal]);
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getNumberNodeOf = async (address: string): Promise<[BigNumber]> => {
    try {
      return contractWithoutSigner.functions.getNodeNumberOf(address);
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getTimeCreatedOfNodes = async (): Promise<[string]> => {
    try {
      return contractWithSigner.functions.getContsCreationTime.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getNameOfNodes = async (): Promise<[string]> => {
    try {
      return contractWithSigner.functions.getContsNames.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getRewardOfNodes = async (): Promise<[string]> => {
    try {
      return contractWithSigner.functions.getContsRewards.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getTypeOfNodes = async (): Promise<[string]> => {
    try {
      return contractWithSigner.functions.getContsTypes.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getRewardAmount = async (): Promise<[BigNumber]> => {
    try {
      return contractWithSigner.functions.getRewardAmount.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getInitAPROfNodes = async (): Promise<[string]> => {
    try {
      return contractWithSigner.functions.getContsInitialAPR.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getNodesCurrentAPR = async (): Promise<[string]> => {
    try {
      return contractWithSigner.functions.getContsCurrentAPR.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getClaimPermit = async (): Promise<[boolean]> => {
    try {
      return contractWithoutSigner.functions.enableCashout.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getMintPermit = async (): Promise<[boolean]> => {
    try {
      return contractWithoutSigner.functions.enableMintConts.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getHoldingsWalletAddress = async (): Promise<string[][]> => {
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

  const getUsdcTokenAddress = async (): Promise<string[]> => {
    try {
      return contractWithoutSigner.functions.usdcToken.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getPairAddress = async (): Promise<string> => {
    try {
      return contractWithoutSigner.functions.uniswapV2Pair.call({});
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const getTokenDistribution = async (): Promise<any[]> => {
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

  const swap0xbToTokens = async (token: string, amount: number, tokenDecimal: string, isExactOut: boolean) => {
    try {
      if (isExactOut) {
        return contractWithSigner.functions.swap0xBForExactToken(
          token,
          new BN(amount).multipliedBy(Number(`1e${tokenDecimal}`)).toString(),
        );
      } else {
        return contractWithSigner.functions.swapExact0xBForToken(
          token,
          new BN(amount).multipliedBy(Number(`1e${process.env.REACT_APP_CONTRACT_DECIMAL}`)).toString(),
        );
      }
    } catch (e) {
      throw new Error('Oop! Something went wrong');
    }
  };

  const multipleCall = async (params: MultiCallList[]) => {
    const multiCall = new Multicall({ ethersProvider: provider, tryAggregate: true });
    const contractCallContext: ContractCallContext<{ extraContext: string; foo4: boolean }>[] = params.map(
      ({ reference, contractAddress, abi, calls }) => {
        return {
          reference,
          contractAddress,
          abi,
          calls,
        };
      },
    );
    const results: ContractCallResults = await multiCall.call(contractCallContext);
    return results.results;
  };

  const getAmountTokenOut = async (
    targetToken: string,
    amount: number,
    tokenOutDecimal: number,
    is0xbOutput: boolean,
    isNativeToken: boolean,
  ) => {
    const multiplied = isNativeToken ? 1 : `1e${tokenOutDecimal}`;
    return await multipleCall([
      {
        reference: 'swapTokenRates',
        contractAddress: contractAddress,
        abi: zeroXBlockAbi,
        calls: [
          {
            reference: 'current',
            methodName: 'getOutputAmount',
            methodParameters: [
              is0xbOutput,
              targetToken,
              new BN(1).multipliedBy(Number(multiplied)).toString().replace('.', ''),
            ],
          },
          {
            reference: 'afterSwap',
            methodName: 'getOutputAmount',
            methodParameters: [
              is0xbOutput,
              targetToken,
              new BN(amount).multipliedBy(Number(`1e${tokenOutDecimal}`)).toString(),
            ],
          },
        ],
      },
    ]);
  };
  const getAmountTokenIn = async (
    targetToken: string,
    amount: number,
    tokenOutDecimal: number,
    is0xbOutput: boolean,
  ) => {
    return await multipleCall([
      {
        reference: 'swapTokenRates',
        contractAddress: contractAddress,
        abi: zeroXBlockAbi,
        calls: [
          {
            reference: 'current',
            methodName: 'getInputAmount',
            methodParameters: [is0xbOutput, targetToken, new BN(1).toString()],
          },
          {
            reference: 'afterSwap',
            methodName: 'getInputAmount',
            methodParameters: [
              is0xbOutput,
              targetToken,
              new BN(amount).multipliedBy(Number(`1e${tokenOutDecimal}`)).toString(),
            ],
          },
        ],
      },
    ]);
  };

  return {
    approveToken,
    publicDistributeRewards,
    transferTokenTo,
    createMultipleNodesWithTokens,
    claimAllNodes,
    claimNodeByNode,
    getBalanceTokenOf,
    getBalanceNativeTokenOf,
    getRewardAPRAllNode,
    getPriceAllNode,
    getTotalNodeByType,
    getNumberNodeOf,
    getTimeCreatedOfNodes,
    getNameOfNodes,
    getRewardOfNodes,
    getTypeOfNodes,
    getRewardAmount,
    getInitAPROfNodes,
    getNodesCurrentAPR,
    getClaimPermit,
    getMintPermit,
    getHoldingsWalletAddress,
    getUsdcTokenAddress,
    getTokenDistribution,
    getPairAddress,
    multipleCall,
    swap0xbToTokens,
    getAmountTokenOut,
    getAmountTokenIn,
    contractWithSigner,
    provider,
  };
};
