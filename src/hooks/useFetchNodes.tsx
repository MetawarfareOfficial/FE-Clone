import { useEffect } from 'react';
import { setNodes, unSetNodes } from 'services/contract';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { useInteractiveContract } from './useInteractiveContract';

export function useFetchNodes(crtNodeOk?: boolean) {
  const dispatch = useAppDispatch();
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const { getNameOfNodes, contractWithSigner } = useInteractiveContract();

  const fetchNodesOfUser = async (address?: string): Promise<void> => {
    try {
      if (address) {
        const response = await getNameOfNodes();
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
        const response = await contractWithSigner.functions.getContsNames.call({});
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
