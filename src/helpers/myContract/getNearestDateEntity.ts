import { MineContract } from 'interfaces/MyContract';
import minBy from 'lodash/minBy';

export const getNearestDateEntity = (contracts: MineContract[]) => {
  return minBy(contracts, (item) => Number(item.expireIn));
};
