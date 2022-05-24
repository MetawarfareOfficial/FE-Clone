import { PopupType } from 'components/Base/MyContractsPayFeeModal/MyContractsPayFeeModal';
import { MineContract } from 'interfaces/MyContract';
import { checkPendingContract } from './checkPendingContract';

const calculateMonthlyFeePercent = (percent: number) => {
  return percent / 10;
};

export const calculateMonthlyFee = (contracts: MineContract[], contractFee: number, type: PopupType) => {
  if (type === 'pay_all') {
    return contracts.reduce((acc, item) => {
      return acc + (contractFee - (contractFee * calculateMonthlyFeePercent(item.reduceMonthlyFeePercent)) / 100);
    }, 0);
  } else {
    const contract = contracts[0];
    return contractFee - (contractFee * calculateMonthlyFeePercent(contract.reduceMonthlyFeePercent)) / 100;
  }
};

export const calculatePendingFee = (
  contracts: MineContract[],
  contractFee: number,
  oneMonthTime: number,
  releaseTime: number,
) => {
  return contracts.reduce((acc, item) => {
    const isPendingFee = checkPendingContract(Number(item.expireIn), Number(oneMonthTime), Number(releaseTime));
    if (isPendingFee) {
      acc + (contractFee - (contractFee * calculateMonthlyFeePercent(item.reduceMonthlyFeePercent)) / 100);
    }
    return acc;
  }, 0);
};
