import React from 'react';
import { rechartLineData } from 'components/Dashboard/data';
import { styled } from '@mui/material/styles';
import Statistics from 'components/Dashboard/Statistics';
import TotalMinted from 'components/Dashboard/TotalMinted';
import PriceChart from 'components/Dashboard/PriceChart';

import { Box, Grid, ButtonProps, ToolbarProps, Button, Toolbar, Typography } from '@mui/material';

interface DashboardProps {
  name?: string;
}

const ButtonConnect = styled(Button)<ButtonProps>(() => ({
  textDecoration: 'none',
  borderRadius: '14px',
  padding: '12px 20px',
  textTransform: 'unset',
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'bold',
  maxHeight: '46px',
  boxSizing: 'border-box',
}));

const CustomToolbar = styled(Toolbar)<ToolbarProps>(() => ({
  minHeight: '40px !important',
  padding: '0 !important',
  marginBottom: '30px',
}));

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Box>
      <CustomToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

        <div>
          <ButtonConnect variant="outlined" color="primary">
            Connect Wallet
          </ButtonConnect>
        </div>
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
