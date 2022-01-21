import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Statistic, TableContracts } from 'components/MyContract';

import SquareIcon from 'assets/images/square.gif';
import CubeIcon from 'assets/images/cube.gif';
import TessIcon from 'assets/images/tess.gif';
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
import { setDataMyContracts, setRewardAmount } from 'services/contract';
import useInterval from 'hooks/useInterval';
import { bigNumber2NumberV2 } from 'helpers/formatNumber';
import _ from 'lodash';
import { formatPrice } from '../../helpers/formatPrice';

interface Props {
  title?: string;
}

const MyContract: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const dataMyContracts = useAppSelector((state) => state.contract.dataMyContracts);
  const dataRewardAmount = useAppSelector((state) => state.contract.dataRewardAmount);

  const [myReward, setMyReward] = useState('0');
  const [countMyContract, setCountMyContract] = useState({
    square: '0',
    cube: '0',
    tesseract: '0',
  });

  const fetchDataContract = async (): Promise<void> => {
    try {
      const [mintDates, names, rewards, types, rewardAmount] = await Promise.all([
        getTimeCreatedOfNodes(),
        getNameOfNodes(),
        getRewardOfNodes(),
        getTypeOfNodes(),
        getRewardAmount(),
      ]);

      const dataMyContracts = zipDataMyContract({
        mintDates: parseDataMyContract(mintDates[0]),
        names: parseDataMyContract(names[0]),
        types: parseDataMyContract(types[0]),
        initZeroXBlockPerDays: [],
        currentZeroXBlockPerDays: [],
        rewards: parseDataMyContract(rewards[0]),
      } as ContractResponse);
      dataMyContracts.sort((a, b) => (a.mintDate < b.mintDate ? 1 : -1));
      const dataRw = bigNumber2NumberV2(rewardAmount[0], 1e9);

      dispatch(setDataMyContracts(dataMyContracts));
      dispatch(setRewardAmount(dataRw));
    } catch (e) {}
  };

  useInterval(async () => {
    await fetchDataContract();
  }, 5000);

  useEffect(() => {
    const dataCountByType = _.countBy(dataMyContracts, 'type');

    if (dataCountByType && dataCountByType['0']) {
      setCountMyContract({
        square: `${dataCountByType['0']}`,
        cube: `${dataCountByType['1']}`,
        tesseract: `${dataCountByType['2']}`,
      });
    }
  }, [dataMyContracts.length]);

  useEffect(() => {
    if (dataRewardAmount) {
      setMyReward(formatPrice(dataRewardAmount.toString()));
      return;
    }
    setMyReward('0.00');
  }, [dataRewardAmount]);

  return (
    <Box>
      <Box sx={{ width: '100%', margin: '30px 0' }}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Statistic
              icon={SquareIcon}
              color="#E5E5FE"
              title="Square"
              text="Contract"
              value={countMyContract.square}
            />
          </Grid>
          <Grid item md={3}>
            <Statistic icon={CubeIcon} color="#D2FFDB" title="CUBE" text="Contract" value={countMyContract.cube} />
          </Grid>
          <Grid item md={3}>
            <Statistic
              icon={TessIcon}
              color="#DBECFD"
              title="Tesseract"
              text="Contract"
              value={countMyContract.tesseract}
            />
          </Grid>
          <Grid item md={3}>
            <Statistic
              color={currentUserAddress ? 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%)' : '#fff'}
              title="My Rewards"
              value={myReward}
            />
          </Grid>
        </Grid>
      </Box>

      <TableContracts data={currentUserAddress ? dataMyContracts : []} />
    </Box>
  );
};

export default MyContract;
