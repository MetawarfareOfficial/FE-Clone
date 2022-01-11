import React, {useEffect} from 'react';
import { rechartLineData } from 'components/Dashboard/data';
import { styled } from '@mui/material/styles';
import Statistics from 'components/Dashboard/Statistics';
import TotalMinted from 'components/Dashboard/TotalMinted';
import PriceChart from 'components/Dashboard/PriceChart';
import { Box, Grid, ToolbarProps, Toolbar, Typography } from '@mui/material';
import { coinsDetail, coinsHistory } from 'services/coingeko';

interface DashboardProps {
  name?: string;
}

const CustomToolbar = styled(Toolbar)<ToolbarProps>(() => ({
  minHeight: '40px !important',
  padding: '0 !important',
  marginBottom: '30px',
}));

const Dashboard: React.FC<DashboardProps> = () => {
  useEffect(() => {
    coinsDetail('aave');
    coinsHistory('aave', { vs_currency: 'usd', days: '365' });
  }, []);

  return (
    <Box>
      <CustomToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
      </CustomToolbar>

      <Box mb="50px">
        <Statistics />
      </Box>

      <Grid container spacing={4}>
        <Grid item md={4}>
          <TotalMinted />
        </Grid>
        <Grid item md={8}>
          <PriceChart data={rechartLineData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
