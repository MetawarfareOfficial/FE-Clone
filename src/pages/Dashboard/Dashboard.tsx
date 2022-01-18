import React from 'react';
import { rechartLineData } from 'components/Dashboard/data';
import Statistics from 'components/Dashboard/Statistics';
import TotalMinted from 'components/Dashboard/TotalMinted';
import PriceChart from 'components/Dashboard/PriceChart';

import { Box, Grid } from '@mui/material';

interface DashboardProps {
  name?: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Box>
      <Box mt="30px" mb="50px">
        <Statistics />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <TotalMinted />
        </Grid>
        <Grid item xs={12} md={8}>
          <PriceChart data={rechartLineData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
