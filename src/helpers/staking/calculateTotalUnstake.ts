import { calculateEarlyUnstakingFee } from './calculateEarlyUnstakingFee';

interface DataItem {
  stakedAmount: string;
  stakedTime: string;
  rewards: string;
}
const handleCalculateUnstakeFee = (records: DataItem[]) => {
  return records.reduce((acc, item) => {
    return acc + Number(calculateEarlyUnstakingFee(Number(item.stakedAmount), Number(item.stakedTime)));
  }, 0);
};

export const calculateTotalUnstake = (records: DataItem[]) => {
  return (
    records.reduce((acc, item) => {
      return acc + Number(item.stakedAmount);
    }, 0) - handleCalculateUnstakeFee(records)
  );
};
