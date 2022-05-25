import { PopupType } from 'components/Base/MyContractsPayFeeModal/MyContractsPayFeeModal';
import { MineContract } from 'interfaces/MyContract';
import { checkPendingContract } from './checkPendingContract';

const calculateMonthlyFeePercent = (percent: number) => {
  return percent / 10;
};

export const calculateMonthlyFee = (
  contracts: MineContract[],
  contractFee: number,
  type: PopupType,
  totalContract: number,
) => {
  if (type === 'pay_all') {
    return contracts.reduce((acc, item) => {
      return acc + (contractFee - (contractFee * calculateMonthlyFeePercent(totalContract)) / 100);
    }, 0);
  } else {
    return contractFee - (contractFee * calculateMonthlyFeePercent(totalContract - 1)) / 100;
  }
};

export const calculatePendingFee = (
  contracts: MineContract[],
  contractFee: number,
  oneMonthTime: number,
  releaseTime: number,
  totalContract: number,
) => {
  return contracts.reduce((acc, item) => {
    const isPendingFee = checkPendingContract(Number(item.expireIn), Number(oneMonthTime), Number(releaseTime));
    if (isPendingFee) {
      acc + (contractFee - (contractFee * calculateMonthlyFeePercent(totalContract - 1)) / 100);
    }
    return acc;
  }, 0);
};
