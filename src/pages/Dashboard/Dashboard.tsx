import React, { useState } from 'react';
import { rechartLineData } from 'components/Dashboard/data';
import Statistics from 'components/Dashboard/Statistics';
import TotalMinted from 'components/Dashboard/TotalMinted';
import PriceChart from 'components/Dashboard/PriceChart';

import { Box, Grid } from '@mui/material';

interface DashboardProps {
  name?: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [heightTotal, setHeightTotal] = useState<any>(null);

  const handleChangeHeightTotal = (height: number) => {
    setHeightTotal(height);
  };

  return (
    <Box>
      <Box mt={{ sm: 0, md: '30px' }} mb="45px">
        <Statistics />
      </Box>

      <Grid container spacing="30px">
        <Grid item xs={12} md={4}>
          <TotalMinted onChangeHeight={handleChangeHeightTotal} />
        </Grid>
        <Grid item xs={12} md={8}>
          <PriceChart heightTotal={heightTotal} data={rechartLineData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
