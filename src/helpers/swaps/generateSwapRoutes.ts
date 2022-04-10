import { SwapTokenId } from 'hooks/swap';
import avaxIcon from 'assets/images/avalanche-avax-logo.svg';
import OxbIcon from 'assets/images/coin-0xb.svg';
import usdcIcon from 'assets/images/coin-usd.svg';
import usdtIcon from 'assets/images/coin-usdt.svg';

export const generateSwapRoutes = (from: SwapTokenId, to: SwapTokenId) => {
  const routeMap = {
    [SwapTokenId.AVAX]: {
      [SwapTokenId.OXB]: [
        {
          id: SwapTokenId.AVAX,
          logo: avaxIcon,
        },
        {
          id: SwapTokenId.OXB,
          logo: OxbIcon,
        },
      ],
      [SwapTokenId.AVAX]: [],
      [SwapTokenId.USDC]: [],
      [SwapTokenId.USDT]: [],
    },
    [SwapTokenId.OXB]: {
      [SwapTokenId.AVAX]: [
        {
          id: SwapTokenId.OXB,
          logo: OxbIcon,
        },
        {
          id: SwapTokenId.AVAX,
          logo: avaxIcon,
        },
      ],
      [SwapTokenId.USDC]: [
        {
          id: SwapTokenId.OXB,
          logo: OxbIcon,
        },
        {
          id: SwapTokenId.AVAX,
          logo: avaxIcon,
        },
        {
          id: SwapTokenId.USDC,
          logo: usdcIcon,
        },
      ],
      [SwapTokenId.USDT]: [
        {
          id: SwapTokenId.OXB,
          logo: OxbIcon,
        },
        {
          id: SwapTokenId.AVAX,
          logo: avaxIcon,
        },
        {
          id: SwapTokenId.USDT,
          logo: usdtIcon,
        },
      ],
      [SwapTokenId.OXB]: [],
    },
    [SwapTokenId.USDC]: {
      [SwapTokenId.OXB]: [
        {
          id: SwapTokenId.USDC,
          logo: usdcIcon,
        },
        {
          id: SwapTokenId.AVAX,
          logo: avaxIcon,
        },
        {
          id: SwapTokenId.OXB,
          logo: OxbIcon,
        },
      ],
      [SwapTokenId.AVAX]: [],
      [SwapTokenId.USDC]: [],
      [SwapTokenId.USDT]: [],
    },
    [SwapTokenId.USDT]: {
      [SwapTokenId.OXB]: [
        {
          id: SwapTokenId.USDT,
          logo: usdtIcon,
        },
        {
          id: SwapTokenId.AVAX,
          logo: avaxIcon,
        },
        {
          id: SwapTokenId.OXB,
          logo: OxbIcon,
        },
      ],
      [SwapTokenId.AVAX]: [],
      [SwapTokenId.USDC]: [],
      [SwapTokenId.USDT]: [],
    },
  };
  return routeMap[from][to];
};
