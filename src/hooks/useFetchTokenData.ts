import { useQuery } from 'urql';
import { TokenQuery } from 'consts/query';
import { useAppDispatch } from 'stores/hooks';
import { setTokenData } from 'services/traderJoe';
import { useEffect } from 'react';

const useFetchTokenData = () => {
  const dispatch = useAppDispatch();

  const [result, reExecuteQuery] = useQuery({
    query: TokenQuery,
    variables: {
      tokenId: process.env.REACT_APP_CONTRACT_ADDRESS_IN_TRADER_JOE,
      first: 30,
    },
  });

  const refresh = () => {
    reExecuteQuery({ requestPolicy: 'network-only' });
  };

  useEffect(() => {
    if (result.data) {
      dispatch(setTokenData(result.data?.token?.dayData));
      return;
    }
    dispatch(setTokenData([]));
  }, [result.data]);

  return { refresh };
};

export default useFetchTokenData;
