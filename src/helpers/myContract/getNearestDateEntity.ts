import { MineContract } from 'interfaces/MyContract';
import minBy from 'lodash/minBy';
import { checkPendingContract } from './checkPendingContract';

export const getNearestDateEntity = (contracts: MineContract[], cType = '', oneMonthTime: number) => {
  if (cType !== '') {
    const contractWithDueDateTime = contracts.map((item) => {
      const nearestExpiredContractPendingMonth = checkPendingContract(Number(item.expireIn), oneMonthTime, false, true);
      return {
        type: item.type,
        expireIn: item.expireIn,
        dueDate: Number(item.expireIn) + Number(nearestExpiredContractPendingMonth) * oneMonthTime,
      };
    });
    return minBy(
      contractWithDueDateTime.filter((item) => item.type === cType),
      (item) => Number(item.dueDate),
    );
  }
  return minBy(contracts, (item) => Number(item.expireIn));
};
