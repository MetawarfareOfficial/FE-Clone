import { ContractResponse, MineContract } from 'interfaces/MyContract';
import { zipWith } from 'lodash';
import { computeEarnedTokenPerDay } from './computeEarnedTokenPerDay';
import { bigNumber2NumberV3 } from './formatNumber';
import { ContractPrice } from '../interfaces/ContractPrice';
import { ContractApy } from '../interfaces/ContractApy';

export const parseDataMyContract = (data: string) => {
  return data.split('#');
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
      if (item[0] === '0') return computeEarnedTokenPerDay(prices.square, bigNumber2NumberV3(item[1], 1e11));
      if (item[0] === '1') return computeEarnedTokenPerDay(prices.cube, bigNumber2NumberV3(item[1], 1e11));
      return computeEarnedTokenPerDay(prices.tesseract, bigNumber2NumberV3(item[1], 1e11));
    });
  }
  return [];
};

export const parseDataCurrentApy = (types: string, currentApy: ContractApy, prices: ContractPrice) => {
  const _types = parseDataMyContract(types);

  if (_types.length > 0) {
    // TODO: fixme reusable code
    return _types.map((type: string) => {
      if (type === '0') return computeEarnedTokenPerDay(prices.square, currentApy.square);
      if (type === '1') return computeEarnedTokenPerDay(prices.cube, currentApy.cube);
      return computeEarnedTokenPerDay(prices.tesseract, currentApy.tesseract);
    });
  }
  return [];
};

export const zipDataMyContract = (param: ContractResponse) => {
  return zipWith(
    param.mintDates,
    param.names,
    param.types,
    param.initZeroXBlockPerDays,
    param.currentZeroXBlockPerDays,
    param.rewards,
    (a, b, c, d, e, f) =>
      ({
        mintDate: a,
        name: b,
        type: c,
        initial: d,
        current: e,
        rewards: f,
      } as MineContract),
  );
};
