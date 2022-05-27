import BigNumber from 'bignumber.js';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { useToast } from 'hooks/useToast';
import { useEffect } from 'react';
import { setSell0xbTax } from 'services/swap';
import { useAppDispatch } from 'stores/hooks';

export const useLoadSell0xbTax = () => {
  const dispatch = useAppDispatch();
  const { getSell0xbTax } = useInteractiveContract();
  const { createToast } = useToast();
  const handleLoadSell0xbTax = async () => {
    try {
      const response = await getSell0xbTax();
      dispatch(setSell0xbTax(new BigNumber(response._hex).toString()));
    } catch (error: any) {
      createToast({
        message: error.message,
        type: 'error',
      });
    }
  };
  useEffect(() => {
    handleLoadSell0xbTax();
  }, []);
};
