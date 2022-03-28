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
import { formatReward } from 'helpers/formatReward';

export const useFetchHoldingsWalletAddress = () => {
  const dispatch = useAppDispatch();
  const baseUrl = process.env.REACT_APP_API_URL_PRICE_TOKEN_TO_USD;

  const fetchTokenPrices = async () => {
    const uOxb = `${baseUrl}/${process.env.REACT_APP_CONTRACT_ADDRESS}`;
    const uUsdcE = `${baseUrl}/${process.env.REACT_APP_USDC_E_CONTRACT_ADDRESS}`;
    const uAvax = `${baseUrl}/${process.env.REACT_APP_AVAX_CONTRACT_ADDRESS}`;

    try {
      const [price0xb, priceAvax, priceUsdc] = await Promise.all([
        axiosInstance.get(uOxb),
        axiosInstance.get(uAvax),
        axiosInstance.get(uUsdcE),
      ]);

      return [
        { name: '0xB', price: bigNumber2NumberV3(price0xb.data) },
        { name: 'AVAX', price: bigNumber2NumberV3(priceAvax.data) },
        { name: 'USDC.e', price: bigNumber2NumberV3(priceUsdc.data) },
      ];
    } catch (e) {
      return [
        { name: '0xB', price: '0' },
        { name: 'AVAX', price: '0' },
        { name: 'USDC.e', price: '0' },
      ];
    }
  };

  const fetchBalanceAssetsWallet = async (address: string) => {
    const [_0xbBalance, _avaxBalance, _usdcBalance, _prices] = await Promise.all([
      getBalanceTokenOf(address),
      getBalanceNativeTokenOf(address),
      getBalanceTokenUsdcOf(address),
      fetchTokenPrices(),
    ]);

    const amount0xb = bigNumber2Number(_0xbBalance[0]);
    const value0xb = new BigNumber(_prices[0].price).times(amount0xb).toString();

    const amountAvax = bigNumber2Number(_avaxBalance);
    const valueAvax = new BigNumber(_prices[1].price).times(amountAvax).toString();

    const amountUsdcE = bigNumber2Number(_usdcBalance[0], 1e6);
    const valueUsdcE = new BigNumber(_prices[2].price).times(amountUsdcE).toString();

    return [
      { name: '0xB', icon: OxBCoin, value: formatReward(value0xb), amount: formatReward(amount0xb) },
      { name: 'AVAX', icon: AVAXCoin, value: formatReward(valueAvax), amount: formatReward(amountAvax) },
      { name: 'USDC.e', icon: USDCoin, value: formatReward(valueUsdcE), amount: formatReward(amountUsdcE) },
    ];
  };

  const fetchResourceHoldings = async () => {
    const [treasuryWallet, liquidityWallet, rewardWallet, devWallet] = await getHoldingsWalletAddress();
    const reserveRewardsWallet = '0xfa4eCa6D583a825B80146B87d10EB24fa79EEdCb';

    const [treasuryAssets, liquidityAssets, rewardAssets, devAssets, reserveRewardsAssets] = await Promise.all([
      fetchBalanceAssetsWallet(treasuryWallet[0]),
      fetchBalanceAssetsWallet(liquidityWallet[0]),
      fetchBalanceAssetsWallet(rewardWallet[0]),
      fetchBalanceAssetsWallet(devWallet[0]),
      fetchBalanceAssetsWallet(reserveRewardsWallet),
    ]);

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
