import { labelGroupDate, paramsCurrentPriceApi } from 'consts/dashboard';
import { DELAY_TIME, getLast30DaysMarketParams } from 'consts/treasury';
import { get, groupBy, mapValues, maxBy, orderBy, values } from 'lodash';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { getCurrentPrice, getLast30DaysMarketData } from 'services/coingeko';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import useInterval from './useInterval';

interface MarketData {
  market_caps: number[][];
  prices: number[][];
}

interface CurrentMarketData {
  last_updated: string;
  market_cap: {
    usd: number;
  };
  current_price: {
    usd: number;
  };
  total_supply: number;
}

interface Price {
  time: number;
  price: number;
}
interface MarketCap {
  marketCap: number;
  time: number;
}

export const useFetchMarketCapData = () => {
  const dispatch = useAppDispatch();
  const last30DaysMarketData = useAppSelector((state) => state.coingeko.last30DaysMarketData);
  const currentMarketData = useAppSelector((state) => state.coingeko.currentMarketData);

  const [last30DaysDailyPrices, setLast30DaysDailyPrices] = useState<Price[]>([]);
  const [marketCap, setMarketCap] = useState<number | null>(null);
  const [marketCapHistory, setMarketCapHistory] = useState<MarketCap[]>([]);

  const handleGetLast30DaysMarketCapDailyValue = (
    last30DaysMarketCaps: number[][],
    currentMarketData: CurrentMarketData,
  ) => {
    const last30DaysMarketCapWithDailyMaxValue = orderBy(
      values(
        mapValues(
          groupBy(last30DaysMarketCaps, (data) => moment(data[0]).format(labelGroupDate)),
          (data) => {
            return {
              time: get(
                maxBy(data, (item) => item[1]),
                '[0]',
              ),
              marketCap: get(
                maxBy(data, (item) => item[1]),
                '[1]',
              ),
            };
          },
        ),
      ),
      (item) => item.time,
    );
    return last30DaysMarketCapWithDailyMaxValue.map((item, index) => {
      const isLastItem = index < last30DaysMarketCapWithDailyMaxValue.length - 1;
      return {
        time: isLastItem ? item.time : moment(get(currentMarketData, 'last_updated')).valueOf(),
        marketCap: isLastItem ? item.marketCap : get(currentMarketData, 'market_cap.usd', 0),
      };
    });
  };

  const handleGetLast30DaysPriceDailyValue = (last30DaysPrices: number[][], currentMarketData: CurrentMarketData) => {
    const last30DaysPriceWithDailyMaxValue = orderBy(
      values(
        mapValues(
          groupBy(last30DaysPrices, (data) => moment(data[0]).format(labelGroupDate)),
          (data) => {
            return {
              time: get(
                maxBy(data, (item) => item[1]),
                '[0]',
              ),
              price: get(
                maxBy(data, (item) => item[1]),
                '[1]',
              ),
            };
          },
        ),
      ),
      (item) => item.time,
    );
    return last30DaysPriceWithDailyMaxValue.map((item, index) => {
      const isNotLastItem = index < last30DaysPriceWithDailyMaxValue.length - 1;
      return {
        time: isNotLastItem ? item.time : moment(get(currentMarketData, 'last_updated')).valueOf(),
        price: isNotLastItem ? item.price : get(currentMarketData, 'current_price.usd', 0),
      };
    });
  };

  const handleConvertMarketData = (last30DaysMarketData: MarketData, currentMarketData: CurrentMarketData) => {
    const last30DaysMarketCapsWithHourlyValue = get(last30DaysMarketData, 'market_caps', []);
    const last30DaysHourlyPrices = get(last30DaysMarketData, 'prices', []);
    const last30DaysDailyPrices = handleGetLast30DaysPriceDailyValue(last30DaysHourlyPrices, currentMarketData);
    last30DaysDailyPrices.shift();
    const last30DaysMarketCapsDailyValue = handleGetLast30DaysMarketCapDailyValue(
      last30DaysMarketCapsWithHourlyValue,
      currentMarketData,
    );
    last30DaysMarketCapsDailyValue.shift();
    return {
      last30DaysDailyPrices,
      last30DaysMarketCapsDailyValue,
      marketCap: get(currentMarketData, 'market_cap.usd', 0),
    };
  };

  useEffect(() => {
    dispatch(getLast30DaysMarketData(getLast30DaysMarketParams));
    dispatch(getCurrentPrice(paramsCurrentPriceApi));
  }, []);

  useEffect(() => {
    const { last30DaysDailyPrices, marketCap, last30DaysMarketCapsDailyValue } = handleConvertMarketData(
      last30DaysMarketData as MarketData,
      currentMarketData as CurrentMarketData,
    );
    if (last30DaysMarketCapsDailyValue.length > 0) {
      setLast30DaysDailyPrices(last30DaysDailyPrices);
      setMarketCap(marketCap);
      setMarketCapHistory(last30DaysMarketCapsDailyValue);
    }
  }, [last30DaysMarketData, currentMarketData]);

  useInterval(async () => {
    await dispatch(getCurrentPrice(paramsCurrentPriceApi));
  }, DELAY_TIME);

  return {
    last30DaysDailyPrices,
    marketCapHistory,
    marketCap,
  };
};
