import { useEffect, useState } from 'react';
import { getHoldingsWalletAddress, getUsdcTokenAddress } from './interractiveContract';

interface HoldingsWalletAddresses {
  treasury: string;
  liquidity: string;
  rewards: string;
  dev_marketing: string;
}

export const useFetchHoldingsWalletAddress = () => {
  const [loading, setLoading] = useState(false);
  const [holdingsWalletAddresses, setHoldingsWalletAddresses] = useState<HoldingsWalletAddresses>();
  const [usdcTokenAddress, setUsdcTokenAddress] = useState<string>();
  const fetchWalletAndUsdcToken = async () => {
    setLoading(true);
    const [treasuryWallet, liquidityWallet, rewardWallet, devWallet] = await getHoldingsWalletAddress();
    const usdcToken = await getUsdcTokenAddress();
    setHoldingsWalletAddresses({
      treasury: treasuryWallet[0],
      liquidity: liquidityWallet[0],
      rewards: rewardWallet[0],
      dev_marketing: devWallet[0],
    });
    setUsdcTokenAddress(usdcToken[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchWalletAndUsdcToken();
  }, []);

  return {
    loading,
    holdingsWalletAddresses,
    usdcTokenAddress,
  };
};
