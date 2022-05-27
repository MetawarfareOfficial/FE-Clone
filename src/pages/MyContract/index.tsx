import { Box } from '@mui/material';
import { ListContracts, Stats, TableContracts } from 'components/MyContract';
import { DELAY_TIME } from 'consts/myContract';
import { bigNumber2NumberV2 } from 'helpers/formatNumber';
import { convertMyContractData } from 'helpers/myContract/convertMyContractData';

import { zipDataMyContract } from 'helpers/zipDataMyContract';
import { useGetUsdcTokenInfo } from 'hooks/myContract';
import { useGetMonthlyFeeTime } from 'hooks/myContract/useGetMonthlyFeeTime';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import useInterval from 'hooks/useInterval';
import { useToast } from 'hooks/useToast';
import { useWindowSize } from 'hooks/useWindowSize';
import { ContractResponse } from 'interfaces/MyContract';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  setDataMyContracts,
  setRewardAmount,
  unSetDataMyContracts,
  unSetNodes,
  unSetRewardAmount,
} from 'services/contract';
import { useAppDispatch, useAppSelector } from 'stores/hooks';

interface Props {
  title?: string;
}

const MyContract: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const defaultData = {
    square: '0',
    cube: '0',
    tesseract: '0',
  };

  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const { getRewardAmount, getNodesCurrentAPR, getMyContractDataByUserAddress } = useInteractiveContract();
  const { createToast } = useToast();
  const [width] = useWindowSize();
  const [countMyContract, setCountMyContract] = useState(defaultData);
  const dataMyContracts = useAppSelector((state) => state.contract.dataMyContracts);

  const resetData = () => {
    dispatch(unSetDataMyContracts());
    dispatch(unSetNodes());
    dispatch(unSetRewardAmount());
    setCountMyContract(defaultData);
  };

  const fetchUserContractsData = async (): Promise<void> => {
    try {
      if (!currentUserAddress) {
        throw new Error('user address is undefined');
      }

      const [rewardAmount, currentAPRs] = await Promise.all([getRewardAmount(), getNodesCurrentAPR()]);
      const rawMyContracts = await getMyContractDataByUserAddress(currentUserAddress);
      const myContracts = convertMyContractData(rawMyContracts);

      const dataCt = zipDataMyContract({
        contractData: myContracts,
        currentZeroXBlockPerDays: currentAPRs[0].split('#'),
      } as ContractResponse);
      const dataRw = bigNumber2NumberV2(rewardAmount[0], 1e18);
      dispatch(setDataMyContracts(dataCt));
      dispatch(setRewardAmount(dataRw));
    } catch (e) {
      dispatch(unSetDataMyContracts());
      dispatch(unSetRewardAmount());
    }
  };

  useEffect(() => {
    if (currentUserAddress) {
      resetData();
      createToast({
        promise: {
          callback: fetchUserContractsData,
          pendingMessage: 'Loading...',
          successMessage: 'Your contracts data is fetched successfully',
        },
      });
    }
  }, [currentUserAddress]);

  useEffect(() => {
    if (currentUserAddress) {
      if (dataMyContracts.length === 0) {
        createToast({
          promise: {
            callback: fetchUserContractsData,
            pendingMessage: 'Loading...',
            successMessage: 'Your contracts data is fetched successfully',
          },
        });
      }
      return;
    }
    resetData();
  }, [currentUserAddress]);

  useEffect(() => {
    const dataCountByType = _.countBy(dataMyContracts, 'type');
    if ((dataCountByType['0'] || dataCountByType['1'] || dataCountByType['2']) && currentUserAddress) {
      setCountMyContract({
        square: `${dataCountByType['0'] || 0}`,
        cube: `${dataCountByType['1'] || 0}`,
        tesseract: `${dataCountByType['2'] || 0}`,
      });
      return;
    }
  }, [dataMyContracts.length]);

  useInterval(() => {
    fetchUserContractsData();
  }, DELAY_TIME);

  useGetUsdcTokenInfo();
  useGetMonthlyFeeTime();

  return (
    <Box>
      <Stats countMyContract={countMyContract} data={currentUserAddress ? dataMyContracts : []} />
      {width < 600 ? (
        <ListContracts data={currentUserAddress ? dataMyContracts : []} />
      ) : (
        <TableContracts data={currentUserAddress ? dataMyContracts : []} />
      )}
    </Box>
  );
};

export default MyContract;
