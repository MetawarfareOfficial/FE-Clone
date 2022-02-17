import { labelGroupDate, paramsCurrentPriceApi } from 'consts/dashboard';
import { DELAY_TIME, getLast30DaysMarketParams } from 'consts/treasury';
import { get, groupBy, mapValues, maxBy, orderBy, values } from 'lodash';
import moment from 'moment';
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

export const useFetchMarketCapData = () => {
  const dispatch = useAppDispatch();
  const last30DaysMarketData = useAppSelector((state) => state.coingeko.last30DaysMarketData);
  const currentMarketData = useAppSelector((state) => state.coingeko.currentMarketData);

  const [circulatingSupply, setCirculatingSupply] = useState<number | null>(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [marketCap, setMarketCap] = useState<number | null>(null);
  const [marketCapHistory, setMarketCapHistory] = useState<any>([]);
  const [circulatingSupplyHistory, setCirculatingSupplyHistory] = useState<any>([]);

  const handleGetLast30DaysCirculatingSupply = (
    last30DaysPrices: number[][],
    last30DaysMarketCaps: number[][],
    currentMarketData: CurrentMarketData,
  ) => {
    const last30DaysPricesWithIndex = last30DaysPrices.map((data: number[], index: number) => {
      return {
        price: data[1],
        time: data[0],
        index,
      };
    });

    const last30DaysMaxPrices = orderBy(
      values(
        mapValues(
          groupBy(last30DaysPricesWithIndex, (data) => moment(data.time).format(labelGroupDate)),
          (value) => maxBy(value, 'price'),
        ),
      ),
      'time',
    );

    const last30DaysCirculationSupply = last30DaysMaxPrices.map((data, index) => {
      const isLastItem = index >= last30DaysMaxPrices.length - 1;
      return {
        time: isLastItem ? moment(currentMarketData.last_updated).valueOf() : get(data, 'time'),
        circulationSupply: isLastItem
          ? get(currentMarketData, 'market_cap.usd', 1) / get(currentMarketData, 'current_price.usd', 1)
          : last30DaysMarketCaps[get(data, 'index', 1)][1] / get(data, 'price', 1),
      };
    });

    return last30DaysCirculationSupply;
  };

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

  const handleConvertMarketData = (last30DaysMarketData: MarketData, currentMarketData: CurrentMarketData) => {
    const last30DaysMarketCapsWithHourlyValue = get(last30DaysMarketData, 'market_caps', []);
    const last30DaysPrices = get(last30DaysMarketData, 'prices', []);
    const last30DaysCirculatingSupply = handleGetLast30DaysCirculatingSupply(
      last30DaysPrices,
      last30DaysMarketCapsWithHourlyValue,
      currentMarketData,
    );
    const last30DaysMarketCapsWithDailyValue = handleGetLast30DaysMarketCapDailyValue(
      last30DaysMarketCapsWithHourlyValue,
      currentMarketData,
    );
    return {
      last30DaysCirculatingSupply,
      last30DaysMarketCapsWithDailyValue,
      totalSupply: currentMarketData.total_supply || 0,
      marketCap: get(currentMarketData, 'market_cap.usd', 0),
    };
  };

  useEffect(() => {
    dispatch(getLast30DaysMarketData(getLast30DaysMarketParams));
    dispatch(getCurrentPrice(paramsCurrentPriceApi));
  }, []);

  useEffect(() => {
    const { last30DaysCirculatingSupply, totalSupply, marketCap, last30DaysMarketCapsWithDailyValue } =
      handleConvertMarketData(last30DaysMarketData as MarketData, currentMarketData as CurrentMarketData);
    if (last30DaysCirculatingSupply.length > 0) {
      setCirculatingSupply(last30DaysCirculatingSupply[last30DaysCirculatingSupply.length - 1].circulationSupply);
      setCirculatingSupplyHistory(last30DaysCirculatingSupply);
      setTotalSupply(totalSupply);
      setMarketCap(marketCap);
      setMarketCapHistory(last30DaysMarketCapsWithDailyValue);
    }
  }, [last30DaysMarketData, currentMarketData]);

  useInterval(async () => {
    await dispatch(getCurrentPrice(paramsCurrentPriceApi));
  }, DELAY_TIME);

  return {
    circulatingSupply,
    circulatingSupplyHistory,
    marketCapHistory,
    totalSupply,
    marketCap,
  };
};
