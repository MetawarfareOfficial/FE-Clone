import { contractUsdcE } from 'utils/contractWithSigner';
import { BigNumber } from 'ethers';

export const getBalanceTokenUsdcOf = async (adress: string): Promise<[BigNumber]> => {
  try {
    return contractUsdcE().functions.balanceOf(adress);
  } catch (e) {
    throw new Error('');
  }
};
