import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'bignumber.js';
import { calculateApr, convertStakingData, fetchTokensPrice } from 'helpers/staking';
import { SwapTokenId } from 'hooks/swap';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { useEstimateLPTokenAmount } from 'hooks/zap/useEstimateLPtokenAmount';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPools } from 'services/staking';
import { useAppSelector } from 'stores/hooks';
import get from 'lodash/get';

export const useFetchPoolsInfo = () => {
  // const [loading, setLoading] = useState(false);
  const { getPoolInfo } = useInteractiveContract();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { handleEstimateZapOutLpTokenAmount } = useEstimateLPTokenAmount();
  const liquidityPoolData = useAppSelector((state) => state.zap.liquidityPoolData);
  const isLiquidityPoolLoaded = useAppSelector((state) => state.zap.isLiquidityPoolLoaded);
  const pairInfoLoaded = useAppSelector((state) => state.swap.pairInfoLoaded);
  const totalPools = useAppSelector((state) => state.stake.totalPools);

  // const globalPools = useAppSelector((state) => state.stake.pools);

  const handleLoadPools = async () => {
    // const avaxPrice = await fetchTokensPrice(String(process.env.REACT_APP_NATIVE_TOKEN_ADDRESS).toLocaleLowerCase());
    // const OxbPrice = await ;
    const lpToUsdcAmount = handleEstimateZapOutLpTokenAmount(SwapTokenId.USDC, '1', liquidityPoolData);
    // const rawPools = await getPoolInfo(account || '');
    const [OxbPrice, rawPools] = await Promise.all([
      fetchTokensPrice(String(process.env.REACT_APP_CONTRACT_ADDRESS).toLocaleLowerCase()),
      getPoolInfo(account || ''),
    ]);
    const pools = rawPools.map((item, index) => {
      const yourStakedAmount = item.yourStakedAmounts.split('#');
      const yourTotalStakedAmount = yourStakedAmount.reduce((acc: number, item: string) => {
        const value = item !== '' ? item : '0';
        return new BigNumber(value).div(1e18).plus(new BigNumber(acc)).toNumber();
      }, 0);
      const yourRewardsAmount = item.yourRewardAmounts.split('#');
      const yourTotalRewardAmount = yourRewardsAmount.reduce((acc: number, item: string) => {
        const value = item !== '' ? item : '0';
        return new BigNumber(value).div(1e18).plus(new BigNumber(acc)).toNumber();
      }, 0);
      const yourStakingTimes = item.yourStakingTimes.split('#');
      const yourUnStakedAmounts = item.yourUnStakedAmounts.split('#');

      return {
        id: index.toString(),
        liquidity: new BigNumber(item.lpAmountInPool._hex).div(1e18).multipliedBy(lpToUsdcAmount).toString(),
        totalStaked: new BigNumber(item.lpAmountInPool._hex).div(1e18).toString(),
        apr: calculateApr({
          totalReward: new BigNumber(item.totalDistribute._hex).div(1e18).toString(),
          oxbPrice: get(OxbPrice, '[0].priceUSD', '0'),
          totalStaked: new BigNumber(item.lpAmountInPool._hex).div(1e18).toString(),
          lpPrice: lpToUsdcAmount,
        }),
        endTime: new BigNumber(item.duration._hex).toString(),
        yourShare: new BigNumber(yourTotalStakedAmount)
          .div(new BigNumber(item.lpAmountInPool._hex).div(1e18))
          .multipliedBy(100)
          .toString(),
        yourTotalStakedAmount: String(yourTotalStakedAmount),
        yourTotalRewardAmount: String(yourTotalRewardAmount),
        yourTotalRewardValue: new BigNumber(yourTotalRewardAmount)
          .multipliedBy(get(OxbPrice, '[0].priceUSD', 0))
          .toString(),
        yourAllStakes: convertStakingData({
          dates: yourStakingTimes,
          stakedAmounts: yourStakedAmount,
          unstakedAmounts: yourUnStakedAmounts,
          rewards: yourRewardsAmount,
        }),
        lpAddress: String(item['0']).toLocaleLowerCase(),
        title: item.name,
        account,
      };
    });
    dispatch(setPools(pools));
  };

  useEffect(() => {
    if (isLiquidityPoolLoaded && pairInfoLoaded && totalPools) {
      handleLoadPools();
    }
  }, [liquidityPoolData, isLiquidityPoolLoaded, pairInfoLoaded, account, totalPools]);
};
