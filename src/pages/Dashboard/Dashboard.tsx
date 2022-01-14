import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Statistics from 'components/Dashboard/Statistics';
import TotalMinted from 'components/Dashboard/TotalMinted';
import PriceChart from 'components/Dashboard/PriceChart';
import { Box, Grid, ToolbarProps, Toolbar, Typography } from '@mui/material';
import { coinsHistory } from 'services/coingeko';
import { useAppDispatch, useAppSelector } from 'stores/hooks';

interface DashboardProps {
  name?: string;
}

const CustomToolbar = styled(Toolbar)<ToolbarProps>(() => ({
  minHeight: '40px !important',
  padding: '0 !important',
  marginBottom: '30px',
}));

const Dashboard: React.FC<DashboardProps> = () => {
  // Lấy data từ store về
  const dispatch = useAppDispatch();
  // const aave = useAppSelector((state) => state.coingeko.detail);
  const history: any = useAppSelector((state) => state.coingeko.history);
  useEffect(() => {
    // dispatch(coinsDetail('aave'));
    dispatch(coinsHistory('aave', { vs_currency: 'usd', days: '364' }));
  }, []);
  const rechartLineData = (history?.prices || []).map((el: any) => {
    return {
      time: el[0],
      close: el[1],
      conversionSymbol: '',
    };
  });

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
