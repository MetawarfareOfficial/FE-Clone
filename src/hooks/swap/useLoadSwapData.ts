import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { useEffect, useState } from 'react';
import { setTokenAddress } from 'services/swap';
import { useAppDispatch } from 'stores/hooks';
import { SwapTokenId } from './useSwapToken';

export interface TokenAddresses {
  [SwapTokenId.OXB]: string;
  [SwapTokenId.AVAX]: string;
  [SwapTokenId.USDC]: string;
}
export const useLoadSwapData = () => {
  const { getUsdcTokenAddress } = useInteractiveContract();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const loadSwapData = async () => {
    setLoading(true);
    try {
      // load token address
      const usdcTokenAddress = await getUsdcTokenAddress();
      const OxbTokenAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      const AvaxTokenAddress = process.env.REACT_APP_NATIVE_TOKEN_ADDRESS;
      dispatch(
        setTokenAddress({
          [SwapTokenId.OXB]: OxbTokenAddress || '',
          [SwapTokenId.AVAX]: AvaxTokenAddress || '',
          [SwapTokenId.USDC]: usdcTokenAddress[0] || '',
        }),
      );
      // load histories transactions
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    loadSwapData();
  }, []);

  return {
    loading,
  };
};
