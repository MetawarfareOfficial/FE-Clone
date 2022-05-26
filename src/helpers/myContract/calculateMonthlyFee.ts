import { PopupType } from 'components/Base/MyContractsPayFeeModal/MyContractsPayFeeModal';
import { MineContract } from 'interfaces/MyContract';
import { checkPendingContract } from './checkPendingContract';


export const calculateMonthlyFee = (contracts: MineContract[], contractFee: number, type: PopupType) => {
  if (type === 'pay_all') {
    return contracts.reduce((acc) => {
      return acc + contractFee;
    }, 0);
  } else {
    return contractFee;
  }
};

export const calculatePendingFee = (contracts: MineContract[], contractFee: number, oneMonthTime: number) => {
  return contracts.reduce((acc, item) => {
    const isPendingFee = checkPendingContract(Number(item.expireIn), Number(oneMonthTime));
    if (isPendingFee) {
      acc + contractFee;
    }
    return acc;
  }, 0);
};
