import React, { useState } from 'react';
import { dataContracts } from './data';
import { Box, Grid } from '@mui/material';

import { Banner } from 'components/Base/Banner';
import { Statistic, TableContracts } from 'components/MyContract';

import SquareIcon from 'assets/images/square.gif';
import CubeIcon from 'assets/images/cube.gif';
import TessIcon from 'assets/images/tess.gif';

interface Props {
  title?: string;
}

const MyContract: React.FC<Props> = () => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(!connected);
  };

  return (
    <Box>
      <Banner walletId="0x33434dieoewo" onConnect={handleConnect} />

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
              color={connected ? 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%)' : '#fff'}
              title="My Rewards"
              value="0.000"
            />
          </Grid>
        </Grid>
      </Box>

      <TableContracts data={connected ? dataContracts : []} />
    </Box>
  );
};

export default MyContract;
