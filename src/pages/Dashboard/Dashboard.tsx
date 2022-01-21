import React, { useEffect, useState } from 'react';
import Statistics from 'components/Dashboard/Statistics';
import TotalMinted from 'components/Dashboard/TotalMinted';
import PriceChart from 'components/Dashboard/PriceChart';
import { Box, Grid } from '@mui/material';
import { getCurrentPrice, getPrice30DaysAgo } from 'services/coingeko';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import useInterval from 'hooks/useInterval';
import { DELAY_TIME, labelGroupDate, paramsCurrentPriceApi, paramsLast30DaysApi } from 'consts/dashboard';
import { TokenPrice } from 'interfaces/TokenPrice';
import _ from 'lodash';
import moment from 'moment';
import { toast } from 'react-toastify';

interface DashboardProps {
  name?: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const dispatch = useAppDispatch();

  const last30DaysPrice = useAppSelector((state) => state.coingeko.last30DaysPrice);
  const currentPrice = useAppSelector((state) => state.coingeko.currentPrice);

  const [tokenPrices, setTokenPrices] = useState<TokenPrice[]>([]);

  useEffect(() => {
    dispatch(getPrice30DaysAgo(paramsLast30DaysApi));
    dispatch(getCurrentPrice(paramsCurrentPriceApi));
    toast.clearWaitingQueue();
  }, []);

  useEffect(() => {
    const _data: TokenPrice[] = [];

    const prices = last30DaysPrice.map((el: Array<string>) => {
      return {
        time: el[0],
        price: el[2],
      };
    });
    const tokenPriceGroupByDate = _.groupBy(prices, (data) => moment(data.time).format(labelGroupDate));
    Object.keys(tokenPriceGroupByDate).map((key) => {
      const maxPriceObject = _.maxBy(tokenPriceGroupByDate[key], 'price') as TokenPrice;
      _data.push(maxPriceObject);
    });

    _data.pop();
    _data.push({
      time: '',
      price: currentPrice.toString(),
    } as TokenPrice);

    setTokenPrices(_data);
  }, [last30DaysPrice, currentPrice]);

  useInterval(async () => {
    await dispatch(getCurrentPrice(paramsCurrentPriceApi));
  }, DELAY_TIME);

  return (
    <Box>
      <Box mt="30px" mb="50px">
        <Statistics data={tokenPrices.at(-1)} />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <TotalMinted />
        </Grid>
        <Grid item xs={12} md={8}>
          <PriceChart data={tokenPrices} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
