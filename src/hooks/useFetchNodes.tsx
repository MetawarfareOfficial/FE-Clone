import { useEffect } from 'react';
import { getNumberNodeOf } from 'helpers/interractiveContract';
import { bigNumber2NumberV2 } from 'helpers/formatNumber';
import _ from 'lodash';
import { setNodes, unSetNodes } from 'services/contract';
import { useAppDispatch, useAppSelector } from 'stores/hooks';

export function useFetchNodes(crtNodeOk?: boolean) {
  const dispatch = useAppDispatch();
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);

  const fetchNodesOfUser = async (address?: string): Promise<void> => {
    try {
      if (address) {
        const response = await getNumberNodeOf(address);
        const nodes = bigNumber2NumberV2(_.flatten(response)[0], 1);
        dispatch(setNodes(nodes));
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

  return '';
}
