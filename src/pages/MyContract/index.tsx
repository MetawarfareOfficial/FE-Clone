import React from 'react';
import { Box, Grid } from '@mui/material';
import { Statistic, TableContracts } from 'components/MyContract';

import SquareIcon from 'assets/images/square.gif';
import CubeIcon from 'assets/images/cube.gif';
import TessIcon from 'assets/images/tess.gif';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { getNameOfNodes, getRewardOfNodes, getTimeCreatedOfNodes } from 'helpers/interractiveContract';
import { parseDataMyContract, zipDataMyContract } from 'helpers/zipDataMyContract';
import { ContractResponse } from 'interfaces/MyContract';
import { setDataMyContracts } from 'services/contract';
import useInterval from 'hooks/useInterval';

interface Props {
  title?: string;
}

const MyContract: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const dataMyContracts = useAppSelector((state) => state.contract.dataMyContracts);

  const fetchDataContract = async (): Promise<void> => {
    try {
      const [mintDates, names, rewards] = await Promise.all([
        getTimeCreatedOfNodes(),
        getNameOfNodes(),
        getRewardOfNodes(),
      ]);
      const dataMyContracts = zipDataMyContract({
        mintDates: parseDataMyContract(mintDates[0]),
        names: parseDataMyContract(names[0]),
        types: [],
        initZeroXBlockPerDays: [],
        currentZeroXBlockPerDays: [],
        rewards: parseDataMyContract(rewards[0]),
      } as ContractResponse);
      dataMyContracts.sort((a, b) => (a.mintDate < b.mintDate ? 1 : -1));
      dispatch(setDataMyContracts(dataMyContracts));
    } catch (e) {}
  };

  useInterval(async () => {
    await fetchDataContract();
  }, 1000);

  return (
    <Box>
      <Box sx={{ width: '100%', margin: '30px 0' }}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Statistic icon={SquareIcon} color="#E5E5FE" title="Square" text="Contract" value="5" />
          </Grid>
          <Grid item md={3}>
            <Statistic icon={CubeIcon} color="#D2FFDB" title="CUBE" text="Contract" value="0" />
          </Grid>
          <Grid item md={3}>
            <Statistic icon={TessIcon} color="#DBECFD" title="Tesseract" text="Contract" value="3" />
          </Grid>
          <Grid item md={3}>
            <Statistic
              color={currentUserAddress ? 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%)' : '#fff'}
              title="My Rewards"
              value="0.000"
            />
          </Grid>
        </Grid>
      </Box>

      <TableContracts data={currentUserAddress ? dataMyContracts : []} />
    </Box>
  );
};

export default MyContract;
