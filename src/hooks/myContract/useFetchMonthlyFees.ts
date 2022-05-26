import BigNumber from 'bignumber.js';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { useToast } from 'hooks/useToast';
import { useEffect } from 'react';
import { setMonthlyFees } from 'services/contract';
import { useAppDispatch } from 'stores/hooks';

export const useFetchMonthlyFees = () => {
  const dispatch = useAppDispatch();
  const { createToast } = useToast();
  const { getMonthlyFees } = useInteractiveContract();

  const handleGetMonthlyFees = async () => {
    try {
      const [square, cube, tesseract] = await getMonthlyFees();

      dispatch(
        setMonthlyFees({
          square: new BigNumber(square._hex).div(Number(`1e${process.env.REACT_APP_CONTRACT_DECIMAL}`)).toString(),
          cube: new BigNumber(cube._hex).div(Number(`1e${process.env.REACT_APP_CONTRACT_DECIMAL}`)).toString(),
          tesseract: new BigNumber(tesseract._hex)
            .div(Number(`1e${process.env.REACT_APP_CONTRACT_DECIMAL}`))
            .toString(),
        }),
      );
    } catch {
      createToast({
        type: 'error',
        message: 'Oop! Something went wrong',
      });
    }
  };

  useEffect(() => {
    handleGetMonthlyFees();
  }, []);
};
