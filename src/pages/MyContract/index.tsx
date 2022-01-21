import React from 'react';
import { Box, Grid } from '@mui/material';
import { Statistic, TableContracts } from 'components/MyContract';

import SquareIcon from 'assets/images/square.gif';
import CubeIcon from 'assets/images/cube.gif';
import TessIcon from 'assets/images/tess.gif';
import { useAppSelector } from 'stores/hooks';

interface Props {
  title?: string;
}

const MyContract: React.FC<Props> = () => {
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const dataMyContracts = useAppSelector((state) => state.contract.dataMyContracts);

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
