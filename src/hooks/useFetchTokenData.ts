import { useQuery } from 'urql';
import { TokenQuery } from 'consts/query';
import { useAppDispatch } from 'stores/hooks';
import { setTokenData } from 'services/traderJoe';

const useFetchTokenData = () => {
  const dispatch = useAppDispatch();

  const [result, reExecuteQuery] = useQuery({
    query: TokenQuery,
    variables: {
      tokenId: process.env.REACT_APP_CONTRACT_ADDRESS_IN_TRADER_JOE,
      first: 30,
    },
  });

  if (result.data) {
    dispatch(setTokenData(result.data?.token?.dayData));
  }

  const refresh = () => {
    reExecuteQuery({ requestPolicy: 'network-only' });
  };

  return { refresh };
};

export default useFetchTokenData;
