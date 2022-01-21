import { ContractResponse, MineContract } from 'interfaces/MyContract';
import { zipWith } from 'lodash';

export const parseDataMyContract = (data: string) => {
  return data.split('#');
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
