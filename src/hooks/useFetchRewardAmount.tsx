import { useEffect, useState } from 'react';
import { useAppSelector } from 'stores/hooks';
import { formatPrice } from 'helpers/formatPrice';

const useFetchRewardAmount: () => string = () => {
  const dataRewardAmount = useAppSelector((state) => state.contract.dataRewardAmount);

  const [myReward, setMyReward] = useState('0');

  useEffect(() => {
    if (dataRewardAmount) {
      setMyReward(formatPrice(dataRewardAmount.toString()));
      return;
    }
    setMyReward('0.00');
  }, [dataRewardAmount]);

  return myReward;
};

export default useFetchRewardAmount;
