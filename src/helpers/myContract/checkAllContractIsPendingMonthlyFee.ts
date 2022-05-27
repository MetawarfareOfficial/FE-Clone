import { MineContract } from 'interfaces/MyContract';
import { checkPendingContract } from './checkPendingContract';

export const checkAllContractIsPendingMonthlyFee = (contracts: MineContract[], oneMonthTime: number) => {
  let result = true;

  for (const contract of contracts) {
    if (contract.type !== '0') {
      const isPending = checkPendingContract(Number(contract.expireIn), oneMonthTime);
      if (!isPending) {
        result = false;
        break;
      }
    }
  }

  return result;
};
