import { ContractResponse } from 'interfaces/MyContract';
import { zipWith } from 'lodash';
import { computeEarnedTokenPerDay } from 'helpers/computeEarnedTokenPerDay';
import { bigNumber2NumberV3 } from 'helpers/formatNumber';
import { ContractPrice } from 'interfaces/ContractPrice';
import { formatPrice, truncateNumber } from './formatPrice';
import sortBy from 'lodash/sortBy';

import BigNumber from 'bignumber.js';

export const parseDataMyContract = (data: string) => {
  return data.split('#');
};

const calculateEarnCurrent0xbPerDay = (price: number, apr: string) => {
  const convertedApr = bigNumber2NumberV3(String(apr), 1e6);
  const tokenEarnedPerYear = new BigNumber(convertedApr).multipliedBy(price).div(36500).toNumber();
  const truncatedNumber = truncateNumber(tokenEarnedPerYear, 3);
  return formatPrice(String(truncatedNumber), 3, 3);
};

export const parseDataInitApy = (types: string, initApy: string, prices: ContractPrice) => {
  const _types = parseDataMyContract(types);
  const _initApy = parseDataMyContract(initApy);

  const _typesLen = _types.length;
  const _initApyLen = _initApy.length;

  if (_typesLen > 0 && _initApyLen > 0 && _typesLen === _initApyLen) {
    const zipTypesInitApy = zipWith(_types, _initApy);
    // TODO: fixme reusable code
    return zipTypesInitApy.map((item: any) => {
      if (item[0] === '0') return computeEarnedTokenPerDay(prices.square, bigNumber2NumberV3(item[1], 1e6));
      if (item[0] === '1') return computeEarnedTokenPerDay(prices.cube, bigNumber2NumberV3(item[1], 1e6));
      return computeEarnedTokenPerDay(prices.tesseract, bigNumber2NumberV3(item[1], 1e6));
    });
  }
  return [];
};

export const parseDataCurrentApr = (types: string, currentAprPerContract: string[], prices: ContractPrice) => {
  const _types = parseDataMyContract(types);

  if (_types.length > 0) {
    return currentAprPerContract.map((apr: string, index) => {
      if (_types[index] === '0') return calculateEarnCurrent0xbPerDay(prices.square, apr);
      else if (_types[index] === '1') return calculateEarnCurrent0xbPerDay(prices.cube, apr);
      return calculateEarnCurrent0xbPerDay(prices.tesseract, apr);
    });
  }
  return [];
};
export const parseDataCurrentAprV2 = (type: string, currentApr: string, price: number) => {
  if (type === '0') {
    return calculateEarnCurrent0xbPerDay(price, currentApr);
  }
};

export const zipDataMyContract = (param: ContractResponse) => {
  const contracts = zipWith(
    param.currentZeroXBlockPerDays,
    param.contractData,
    (currentZeroXBlockPerDay, contractData) => ({
      mintDate: contractData.mintDate,
      name: contractData.name,
      type: String(contractData.type),
      initial: computeEarnedTokenPerDay(Number(contractData.price), contractData.initApy),
      current: calculateEarnCurrent0xbPerDay(Number(contractData.price), currentZeroXBlockPerDay),
      rewards: contractData.reward,
      claimedRewards: contractData.claimedReward,
      expireIn: contractData.expireIn,
    }),
  ).map((item, index) => {
    return {
      ...item,
      index,
    };
  });

  const squareContracts = contracts
    .filter((item) => item.type === '0')
    .map((item, index) => {
      return {
        ...item,
        reduceMonthlyFeePercent: index,
      };
    });
  const cubeContracts = sortBy(
    contracts.filter((item) => item.type === '1'),
    (item) => Number(item.mintDate),
  ).map((item, index) => {
    return {
      ...item,
      reduceMonthlyFeePercent: index,
    };
  });
  const tesseractContracts = sortBy(
    contracts.filter((item) => item.type === '2'),
    (item) => Number(item.mintDate),
  ).map((item, index) => {
    return {
      ...item,
      reduceMonthlyFeePercent: index,
    };
  });
  return sortBy([...squareContracts, ...cubeContracts, ...tesseractContracts], (item) => Number(item.mintDate));
};
