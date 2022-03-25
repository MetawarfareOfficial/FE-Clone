import { contractUsdc } from 'utils/contractWithSigner';
import { BigNumber } from 'ethers';

export const getBalanceTokenUsdcOf = async (adress: string): Promise<[BigNumber]> => {
  try {
    return contractUsdc().functions.balanceOf(adress);
  } catch (e) {
    throw new Error('');
  }
};
