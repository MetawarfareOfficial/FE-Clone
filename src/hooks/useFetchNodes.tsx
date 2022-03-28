import { useEffect } from 'react';
import { getNameOfNodes } from 'helpers/interractiveContract';
import { setNodes, unSetNodes } from 'services/contract';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { contractWithSigner } from 'utils/contractWithSigner';

export function useFetchNodes(crtNodeOk?: boolean) {
  const dispatch = useAppDispatch();
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const contractWithSignerInstance = contractWithSigner();

  const fetchNodesOfUser = async (address?: string): Promise<void> => {
    try {
      if (address) {
        const response = await getNameOfNodes();

        if (!response[0].includes('#')) {
          dispatch(setNodes(0));
          return;
        }

        const nodes = response[0].split('#');
        dispatch(setNodes(nodes.length));
      }
    } catch (err: any) {
      dispatch(unSetNodes());
    }
  };

  const fetchNodesOfUserV2 = async (address?: string): Promise<void> => {
    try {
      if (address) {
        const response = await contractWithSignerInstance.functions.getContsNames.call({});
        if (response[0] === '') {
          dispatch(setNodes(0));
          return;
        }

        const nodes = response[0].split('#');
        dispatch(setNodes(nodes.length));
      }
    } catch (err: any) {
      dispatch(unSetNodes());
    }
  };

  useEffect(() => {
    if (currentUserAddress || crtNodeOk) {
      fetchNodesOfUser(currentUserAddress);
      return;
    }
    dispatch(unSetNodes());
  }, [currentUserAddress, crtNodeOk]);

  return {
    fetchNodesOfUser,
    fetchNodesOfUserV2,
  };
}
