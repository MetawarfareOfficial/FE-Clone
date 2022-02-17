import { ethers } from 'ethers';
import { bigNumber2Number } from './formatNumber';

const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URLS);

export const getTokenBalanceFromWalletAddress = async (
  contractAddress: string | undefined,
  abi: any,
  walletAddress: string,
) => {
  try {
    if (contractAddress && abi && walletAddress) {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const balance = await contract.functions.balanceOf(walletAddress);
      return bigNumber2Number(balance[0], 1e6);
    }
  } catch (error) {
    return 0;
  }
  return 0;
};
