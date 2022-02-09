import { Box } from '@mui/material';
import { ListContracts, Stats, TableContracts } from 'components/MyContract';
import { DELAY_TIME } from 'consts/myContract';
import { formatApyV3 } from 'helpers/formatApy';
import { bigNumber2NumberV2 } from 'helpers/formatNumber';
import {
  getInitApyOfNodes,
  getNameOfNodes,
  getPriceAllNode,
  getRewardAmount,
  getRewardAPYAllNode,
  getRewardOfNodes,
  getTimeCreatedOfNodes,
  getTypeOfNodes,
} from 'helpers/interractiveContract';
import {
  parseDataCurrentApy,
  parseDataInitApy,
  parseDataMyContract,
  zipDataMyContract,
} from 'helpers/zipDataMyContract';
import useInterval from 'hooks/useInterval';
import useMobileChangeAccountMetamask from 'hooks/useMobileChangeAccountMetamask';
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

declare let window: any;

const MyContract: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const defaultData = {
    square: '0',
    cube: '0',
    tesseract: '0',
  };

  const currentUserAddress = useAppSelector((state) => state.user.account?.address);

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
      const [mintDates, names, rewards, types, rewardAmount, initApy, prices, currentApy] = await Promise.all([
        getTimeCreatedOfNodes(),
        getNameOfNodes(),
        getRewardOfNodes(),
        getTypeOfNodes(),
        getRewardAmount(),
        getInitApyOfNodes(),
        getPriceAllNode(),
        getRewardAPYAllNode(),
      ]);

      const dataPrices = _.flatten(prices);
      const _prices = {
        square: bigNumber2NumberV2(dataPrices[0]),
        cube: bigNumber2NumberV2(dataPrices[1]),
        tesseract: bigNumber2NumberV2(dataPrices[2]),
      };

      const dataCurrentApy = _.flatten(currentApy);
      const _currentApy = {
        square: formatApyV3(dataCurrentApy[0]),
        cube: formatApyV3(dataCurrentApy[1]),
        tesseract: formatApyV3(dataCurrentApy[2]),
      };

      const dataCt = zipDataMyContract({
        mintDates: parseDataMyContract(mintDates[0]),
        names: parseDataMyContract(names[0]),
        types: parseDataMyContract(types[0]),
        initZeroXBlockPerDays: parseDataInitApy(types[0], initApy[0], _prices),
        currentZeroXBlockPerDays: parseDataCurrentApy(types[0], _currentApy, _prices),
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

  useEffect(() => {
    fetchUserContractsData();
    const handleChangeAccounts = () => {
      resetData();
      createToast({
        promise: {
          callback: fetchUserContractsData,
          pendingMessage: 'Loading...',
          successMessage: 'Your contracts data is fetched successfully 👌',
        },
      });
    };

    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleChangeAccounts);
      window.ethereum.on('accountsChanged', handleChangeAccounts);
    }
  }, []);

  useEffect(() => {
    if (currentUserAddress) {
      if (dataMyContracts.length === 0) {
        createToast({
          promise: {
            callback: fetchUserContractsData,
            pendingMessage: 'Loading...',
            successMessage: 'Your contracts data is fetched successfully 👌',
          },
        });
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
  }, [dataMyContracts.length]);

  useMobileChangeAccountMetamask();

  useInterval(() => {
    if (dataMyContracts.length > 0) fetchUserContractsData();
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
