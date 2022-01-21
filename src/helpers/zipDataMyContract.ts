import { ContractResponse, MyContract } from 'interfaces/MyContract';
import { zipWith } from 'lodash';
import moment from 'moment';

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
        mintDate: moment.unix(Number(a)).format('MMM DD YYYY'),
        name: b,
        type: c,
        initial: d,
        current: e,
        rewards: f,
      } as MyContract),
  );
};
