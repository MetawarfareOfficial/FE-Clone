import React, { useEffect, useState } from 'react';
import Statistics from 'components/Dashboard/Statistics';
import TotalMinted from 'components/Dashboard/TotalMinted';
import PriceChart from 'components/Dashboard/PriceChart';
import { Box, Grid } from '@mui/material';
import { coinsPrices } from 'services/coingeko';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import useInterval from 'hooks/useInterval';
import { params, DELAY_TIME, labelGroupDate } from 'consts/dashboard';
import { TokenPrice } from 'interfaces/TokenPrice';
import _ from 'lodash';
import moment from 'moment';

interface DashboardProps {
  name?: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.coingeko.data);

  const [tokenPrices, setTokenPrices] = useState<TokenPrice[]>([]);

  useEffect(() => {
    dispatch(coinsPrices(params));
  }, []);

  useEffect(() => {
    const _data: TokenPrice[] = [];
    const prices = data.map((el: Array<string>) => {
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

    setTokenPrices(_data);
  }, [data]);

  useInterval(async () => {
    await dispatch(coinsPrices(params));
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
