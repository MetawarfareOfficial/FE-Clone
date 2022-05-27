import { MineContract } from 'interfaces/MyContract';
import minBy from 'lodash/minBy';

export const getNearestDateEntity = (contracts: MineContract[], cType = '') => {
  if (cType !== '') {
    return minBy(
      contracts.filter((item) => item.type === cType),
      (item) => Number(item.expireIn),
    );
  }
  return minBy(contracts, (item) => Number(item.expireIn));
};
