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
import useFetchInforContract from 'hooks/useFetchInforContract';
import useMobileChangeAccountMetamask from 'hooks/useMobileChangeAccountMetamask';
import { useFetchMarketCapData } from 'hooks/useFetchMarketCapData';

interface DashboardProps {
  name?: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const dispatch = useAppDispatch();

  const last30DaysPrice = useAppSelector((state) => state.coingeko.last30DaysPrice);
  const currentPrice = useAppSelector((state) => state.coingeko.zeroXBCurrentPrice);

  const [tokenPrices, setTokenPrices] = useState<TokenPrice[]>([]);
  const { marketCapHistory } = useFetchMarketCapData();
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
    _data.shift();

    setTokenPrices(_data);
  }, [last30DaysPrice, currentPrice]);

  useFetchInforContract();
  useMobileChangeAccountMetamask();

  useInterval(async () => {
    await dispatch(getCurrentPrice(paramsCurrentPriceApi));
  }, DELAY_TIME);

  return (
    <Box>
      <Box mt={{ xs: '28px', md: '30px' }} mb={{ xs: '34px', md: '50px' }}>
        <Statistics data={_.last(tokenPrices)} />
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
            data={isPriceChartOpened ? tokenPrices : marketCapHistory}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
