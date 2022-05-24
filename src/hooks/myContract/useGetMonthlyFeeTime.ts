import { contsRewardManagerAbi as rewardAvaxAbi } from 'abis/avalanche';
import { contsRewardManagerAbi as rewardRinkebyAbi } from 'abis/rinkeby';
import BigNumber from 'bignumber.js';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { useToast } from 'hooks/useToast';
import get from 'lodash/get';
import { useEffect } from 'react';
import { setMonthlyFeeReleaseTime, setMonthlyFeeTime } from 'services/contract';
import { useAppDispatch } from 'stores/hooks';

const rewardManagerAbi = process.env.REACT_APP_NODE_ENV === 'dev' ? rewardRinkebyAbi : rewardAvaxAbi;

export const useGetMonthlyFeeTime = () => {
  const { multipleCall } = useInteractiveContract();
  const dispatch = useAppDispatch();
  const { createToast } = useToast();
  const times = [
    {
      id: 'one',
      method: 'ONE_MONTH',
    },
    {
      id: 'two',
      method: 'TWO_MONTH',
    },
    {
      id: 'three',
      method: 'THREE_MONTH',
    },
  ];
  const handleGetMonthlyTime = async () => {
    try {
      const multiCallParams = times.map((item) => {
        return {
          reference: item.id,
          contractAddress: String(process.env.REACT_APP_CONTS_REWARD_MANAGER),
          abi: rewardManagerAbi,
          calls: [
            {
              reference: 'value',
              methodName: item.method,
              methodParameters: [],
            },
          ],
        };
      });
      const getDeployV2TimeParam = {
        reference: 'releaseTime',
        contractAddress: String(process.env.REACT_APP_CONTS_REWARD_MANAGER),
        abi: rewardManagerAbi,
        calls: [
          {
            reference: 'value',
            methodName: 'monthFeeLogs',
            methodParameters: [0],
          },
        ],
      };

      const response = await multipleCall([...multiCallParams, getDeployV2TimeParam]);

      const monthlyTimes = times.map((item) => {
        const time = get(response, `[${item.id}].callsReturnContext[0].returnValues[0]`, 0) as any;
        return new BigNumber(time.hex).toString();
      });
      dispatch(
        setMonthlyFeeTime({
          one: monthlyTimes[0],
          two: monthlyTimes[1],
          three: monthlyTimes[2],
        }),
      );
      const deployTime = get(response, `releaseTime.callsReturnContext[0].returnValues[0]`, 0) as any;
      dispatch(setMonthlyFeeReleaseTime(new BigNumber(deployTime.hex ? deployTime.hex : deployTime)));
    } catch (error) {
      createToast({
        type: 'error',
        message: 'Oop! Something went wrong',
      });
    }
  };

  useEffect(() => {
    handleGetMonthlyTime();
  }, []);

  return {
    handleGetTokenBalances: handleGetMonthlyTime,
  };
};
