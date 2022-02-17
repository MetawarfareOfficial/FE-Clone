import { Box, Grid } from '@mui/material';
import PriceChart from 'components/Dashboard/PriceChart';
import Statistics from 'components/Dashboard/Statistics';
import TotalMinted from 'components/Dashboard/TotalMinted';
import { paramsCurrentPriceApi, paramsLast30DaysApi } from 'consts/dashboard';
import useFetchInforContract from 'hooks/useFetchInforContract';
import { useFetchMarketCapData } from 'hooks/useFetchMarketCapData';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCurrentPrice, getPrice30DaysAgo } from 'services/coingeko';
import { useAppDispatch } from 'stores/hooks';

interface DashboardProps {
  name?: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const dispatch = useAppDispatch();

  const { last30DaysDailyPrices, marketCapHistory } = useFetchMarketCapData();
  const [isPriceChartOpened, setIsPriceChartOpened] = useState<boolean>(true);
  const [heightTotal, setHeightTotal] = useState<any>(null);

  const handleChangeHeightTotal = (height: number) => {
    setHeightTotal(height);
  };

  useEffect(() => {
    dispatch(getPrice30DaysAgo(paramsLast30DaysApi));
    dispatch(getCurrentPrice(paramsCurrentPriceApi));
    toast.clearWaitingQueue();
  }, []);

  useFetchInforContract();

  return (
    <Box>
      <Box mt={{ xs: '28px', md: '30px' }} mb={{ xs: '34px', md: '50px' }}>
        <Statistics data={_.last(last30DaysDailyPrices)} />
      </Box>

      <Grid container spacing={{ xs: '15px', md: '30px' }}>
        <Grid item xs={12} md={4}>
          <TotalMinted onChangeHeight={handleChangeHeightTotal} />
        </Grid>
        <Grid item xs={12} md={8}>
          <PriceChart
            changeChart={setIsPriceChartOpened}
            heightTotal={heightTotal}
            YDataKey={isPriceChartOpened ? 'price' : 'marketCap'}
            data={isPriceChartOpened ? last30DaysDailyPrices : marketCapHistory}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
