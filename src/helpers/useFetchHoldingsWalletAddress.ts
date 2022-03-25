import { useEffect } from 'react';
import { getBalanceNativeTokenOf, getBalanceTokenOf, getHoldingsWalletAddress } from './interractiveContract';
import { getBalanceTokenUsdcOf } from './interactiveUsdcContract';
import { bigNumber2Number, bigNumber2NumberV3 } from './formatNumber';
import { useAppDispatch } from 'stores/hooks';
import { setHoldings, setLoading } from 'services/holdings';
import OxBCoin from 'assets/images/coin-0xb.svg';
import USDCoin from 'assets/images/coin-usd.svg';
import AVAXCoin from 'assets/images/avalanche-avax-logo.svg';
import axiosInstance from 'utils/AxiosInstance';
import BigNumber from 'bignumber.js';
import { formatReward } from './formatReward';

export const useFetchHoldingsWalletAddress = () => {
  const dispatch = useAppDispatch();

  const fetchTokenPrices = async () => {
    const uOxb = `${process.env.REACT_APP_API_URL_PRICE_TOKEN_TO_USD}/${process.env.REACT_APP_CONTRACT_ADDRESS}`;
    const uUsdc = `${process.env.REACT_APP_API_URL_PRICE_TOKEN_TO_USD}/${process.env.REACT_APP_USDC_CONTRACT_ADDRESS}`;
    const uAvax = `${process.env.REACT_APP_API_URL_PRICE_TOKEN_TO_USD}/${process.env.REACT_APP_AVAX_CONTRACT_ADDRESS}`;

    try {
      const price0xb = await axiosInstance.get(uOxb);
      const priceAvax = await axiosInstance.get(uAvax);
      const priceUsdc = await axiosInstance.get(uUsdc);

      return [
        { name: '0xb', price: bigNumber2NumberV3(price0xb.data) },
        { name: 'Avax', price: bigNumber2NumberV3(priceAvax.data) },
        { name: 'Usdc', price: bigNumber2NumberV3(priceUsdc.data) },
      ];
    } catch (e) {
      return [
        { name: '0xb', price: '0' },
        { name: 'Avax', price: '0' },
        { name: 'Usdc', price: '0' },
      ];
    }
  };

  const fetchBalanceAssetsWallet = async (address: string) => {
    const _0xbBalance = await getBalanceTokenOf(address);
    const _avaxBalance = await getBalanceNativeTokenOf(address);
    const _usdcBalance = await getBalanceTokenUsdcOf(address);
    const _prices = await fetchTokenPrices();

    const amount0xb = bigNumber2Number(_0xbBalance[0]);
    const value0xb = new BigNumber(_prices[0].price).times(amount0xb).toString();

    const amountAvax = bigNumber2Number(_avaxBalance);
    const valueAvax = new BigNumber(_prices[1].price).times(amountAvax).toString();

    const amountUsdc = bigNumber2Number(_usdcBalance[0], 1e6);
    const valueUsdc = new BigNumber(_prices[2].price).times(amountUsdc).toString();

    return [
      { name: '0xb', icon: OxBCoin, value: formatReward(value0xb), amount: formatReward(amount0xb) },
      { name: 'Avax', icon: AVAXCoin, value: formatReward(valueAvax), amount: formatReward(amountAvax) },
      { name: 'Usdc', icon: USDCoin, value: formatReward(valueUsdc), amount: formatReward(amountUsdc) },
    ];
  };

  const fetchResourceHoldings = async () => {
    const [treasuryWallet, liquidityWallet, rewardWallet, devWallet] = await getHoldingsWalletAddress();
    const reserveRewardsWallet = '0xfa4eCa6D583a825B80146B87d10EB24fa79EEdCb';

    const treasuryAssets = await fetchBalanceAssetsWallet(treasuryWallet[0]);
    const liquidityAssets = await fetchBalanceAssetsWallet(liquidityWallet[0]);
    const rewardAssets = await fetchBalanceAssetsWallet(rewardWallet[0]);
    const devAssets = await fetchBalanceAssetsWallet(devWallet[0]);
    const reserveRewardsAssets = await fetchBalanceAssetsWallet(reserveRewardsWallet);

    return {
      treasury: treasuryAssets,
      liquidity: liquidityAssets,
      rewards: rewardAssets,
      dev_marketing: devAssets,
      reserve_rewards: reserveRewardsAssets,
    };
  };

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      const resources = await fetchResourceHoldings();
      dispatch(setHoldings(resources));
      dispatch(setLoading(false));
    })();
  }, []);
};
