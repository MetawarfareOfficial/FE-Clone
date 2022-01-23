import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import {
  getNameOfNodes,
  getRewardAmount,
  getRewardOfNodes,
  getTimeCreatedOfNodes,
  getTypeOfNodes,
} from 'helpers/interractiveContract';
import { parseDataMyContract, zipDataMyContract } from 'helpers/zipDataMyContract';
import { ContractResponse } from 'interfaces/MyContract';
import {
  setDataMyContracts,
  setRewardAmount,
  unSetDataMyContracts,
  unSetNodes,
  unSetRewardAmount,
} from 'services/contract';
import { bigNumber2NumberV2 } from 'helpers/formatNumber';
import _ from 'lodash';
import { resolveRequestAfterTime } from 'services/resolveRequestAfterTime';
import { toast } from 'react-toastify';
import useInterval from 'hooks/useInterval';
import { DELAY_TIME } from 'consts/myContract';
import { useWindowSize } from 'hooks/useWindowSize';
import { TableContracts, ListContracts, Stats } from 'components/MyContract';

interface Props {
  title?: string;
}

declare let window: any;

const MyContract: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const defaultData = {
    square: '0',
    cube: '0',
    tesseract: '0',
  };

  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const dataMyContracts = useAppSelector((state) => state.contract.dataMyContracts);

  const [width] = useWindowSize();
  const [countMyContract, setCountMyContract] = useState(defaultData);

  const fetchDataUserContracts = async (): Promise<void> => {
    try {
      const [mintDates, names, rewards, types, rewardAmount] = await Promise.all([
        getTimeCreatedOfNodes(),
        getNameOfNodes(),
        getRewardOfNodes(),
        getTypeOfNodes(),
        getRewardAmount(),
      ]);

      const dataCt = zipDataMyContract({
        mintDates: parseDataMyContract(mintDates[0]),
        names: parseDataMyContract(names[0]),
        types: parseDataMyContract(types[0]),
        initZeroXBlockPerDays: [],
        currentZeroXBlockPerDays: [],
        rewards: parseDataMyContract(rewards[0]),
      } as ContractResponse);
      dataCt.sort((a, b) => (a.mintDate < b.mintDate ? 1 : -1));
      const dataRw = bigNumber2NumberV2(rewardAmount[0], 1e9);

      dispatch(setDataMyContracts(dataCt));
      dispatch(setRewardAmount(dataRw));
    } catch (e) {
      dispatch(unSetDataMyContracts());
      dispatch(unSetRewardAmount());
    }
  };

  const resetData = () => {
    dispatch(unSetDataMyContracts());
    dispatch(unSetNodes());
    dispatch(unSetRewardAmount());
    setCountMyContract(defaultData);
  };

  useEffect(() => {
    const handleChangeAccounts = () => {
      resetData();
      fetchDataUserContracts();
    };

    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleChangeAccounts);
      window.ethereum.on('accountsChanged', () => {
        handleChangeAccounts();
        if (window.innerWidth < 600) {
          window.location.reload();
          return;
        }
        currentUserAddress && resolveRequestAfterTime(2000);
        toast.clearWaitingQueue();
      });
    }
  }, []);

  useEffect(() => {
    if (currentUserAddress) {
      if (dataMyContracts.length === 0) {
        fetchDataUserContracts();
        resolveRequestAfterTime(2000);
        toast.clearWaitingQueue();
      }
      return;
    }
    resetData();
  }, [currentUserAddress]);

  useEffect(() => {
    const dataCountByType = _.countBy(dataMyContracts, 'type');

    if (dataCountByType && dataCountByType['0'] && currentUserAddress) {
      setCountMyContract({
        square: `${dataCountByType['0'] || 0}`,
        cube: `${dataCountByType['1'] || 0}`,
        tesseract: `${dataCountByType['2'] || 0}`,
      });
      return;
    }
    resetData();
  }, [dataMyContracts.length]);

  useInterval(() => {
    if (dataMyContracts.length > 0) fetchDataUserContracts();
  }, DELAY_TIME);

  return (
    <Box>
      <Stats countMyContract={countMyContract} />

      {width < 600 ? (
        <ListContracts data={currentUserAddress ? dataMyContracts : []} />
      ) : (
        <TableContracts data={currentUserAddress ? dataMyContracts : []} />
      )}
    </Box>
  );
};

export default MyContract;
