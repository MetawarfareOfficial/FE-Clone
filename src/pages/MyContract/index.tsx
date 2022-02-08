import { Box } from '@mui/material';
import { ListContracts, Stats, TableContracts } from 'components/MyContract';
import { DELAY_TIME } from 'consts/myContract';
import { useFetchUserContractData } from 'hooks/useFetchUserContractData';
import useInterval from 'hooks/useInterval';
import useMobileChangeAccountMetamask from 'hooks/useMobileChangeAccountMetamask';
import { useToast } from 'hooks/useToast';
import { useWindowSize } from 'hooks/useWindowSize';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { unSetDataMyContracts, unSetNodes, unSetRewardAmount } from 'services/contract';
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
  const { fetchUserContractsData, myContractData } = useFetchUserContractData();

  const { createToast } = useToast();
  const [width] = useWindowSize();
  const [countMyContract, setCountMyContract] = useState(defaultData);

  const resetData = () => {
    dispatch(unSetDataMyContracts());
    dispatch(unSetNodes());
    dispatch(unSetRewardAmount());
    setCountMyContract(defaultData);
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
      if (myContractData.length === 0) {
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
    const dataCountByType = _.countBy(myContractData, 'type');

    if (dataCountByType && dataCountByType['0'] && currentUserAddress) {
      setCountMyContract({
        square: `${dataCountByType['0'] || 0}`,
        cube: `${dataCountByType['1'] || 0}`,
        tesseract: `${dataCountByType['2'] || 0}`,
      });
      return;
    }
  }, [myContractData.length]);

  useMobileChangeAccountMetamask();

  useInterval(() => {
    if (myContractData.length > 0) fetchUserContractsData();
  }, DELAY_TIME);

  return (
    <Box>
      <Stats countMyContract={countMyContract} />

      {/*<div>{currentUserAddress}</div>*/}

      {width < 600 ? (
        <ListContracts data={currentUserAddress ? myContractData : []} />
      ) : (
        <TableContracts data={currentUserAddress ? myContractData : []} />
      )}
    </Box>
  );
};

export default MyContract;
