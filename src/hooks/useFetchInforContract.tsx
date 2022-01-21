import {
  getPriceAllNode,
  getRewardAmount,
  getRewardAPYAllNode,
  getTotalNodeByType,
} from 'helpers/interractiveContract';
import _ from 'lodash';
import { setApy, setPrice, setRewardAmount, setTotal } from 'services/contract';
import { formatApy } from 'helpers/formatApy';
import { useAppDispatch } from 'stores/hooks';
import { bigNumber2NumberV2 } from 'helpers/formatNumber';
import { useEffect } from 'react';

const useFetchInforContract = () => {
  const dispatch = useAppDispatch();

  const fetchApy = async () => {
    const response = await getRewardAPYAllNode();
    const data = _.flatten(response);

    dispatch(
      setApy({
        square: formatApy(data[0]),
        cube: formatApy(data[1]),
        tesseract: formatApy(data[2]),
      }),
    );
  };

  const fetchPrice = async () => {
    const response = await getPriceAllNode();
    const data = _.flatten(response);

    dispatch(
      setPrice({
        square: bigNumber2NumberV2(data[0]),
        cube: bigNumber2NumberV2(data[1]),
        tesseract: bigNumber2NumberV2(data[2]),
      }),
    );
  };

  const fetchTotal = async () => {
    const response = await getTotalNodeByType();
    const data = _.flatten(response);

    dispatch(
      setTotal({
        square: bigNumber2NumberV2(data[0], 1),
        cube: bigNumber2NumberV2(data[1], 1),
        tesseract: bigNumber2NumberV2(data[2], 1),
      }),
    );
  };

  const fetchRewardAmount = async () => {
    const response = await getRewardAmount();
    const data = bigNumber2NumberV2(response[0], 1e9);

    dispatch(setRewardAmount(data));
  };

  useEffect(() => {
    fetchApy();
    fetchPrice();
    fetchTotal();
    fetchRewardAmount();
  }, []);
};

export default useFetchInforContract;
