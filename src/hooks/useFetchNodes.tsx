import { useEffect } from 'react';
import { getNameOfNodes, getNumberNodeOf, getRewardOfNodes, getTimeCreatedOfNodes } from 'helpers/interractiveContract';
import { bigNumber2NumberV2 } from 'helpers/formatNumber';
import _ from 'lodash';
import { setDataMyContracts, setNodes, unSetNodes } from 'services/contract';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { parseDataMyContract, zipDataMyContract } from 'helpers/zipDataMyContract';
import { ContractResponse } from 'interfaces/MyContract';

export function useFetchNodes(crtNodeOk?: boolean) {
  const dispatch = useAppDispatch();
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);

  const fetchNodesOfUser = async (address?: string): Promise<void> => {
    try {
      if (address) {
        const [nodesRes, mintDates, names, rewards] = await Promise.all([
          getNumberNodeOf(address),
          getTimeCreatedOfNodes(),
          getNameOfNodes(),
          getRewardOfNodes(),
        ]);

        const nodes = bigNumber2NumberV2(_.flatten(nodesRes)[0], 1);
        const dataMyContracts = zipDataMyContract({
          mintDates: parseDataMyContract(mintDates[0]),
          names: parseDataMyContract(names[0]),
          types: [],
          initZeroXBlockPerDays: [],
          currentZeroXBlockPerDays: [],
          rewards: parseDataMyContract(rewards[0]),
        } as ContractResponse);

        dispatch(setNodes(nodes));
        dispatch(setDataMyContracts(dataMyContracts));
      }
    } catch (err: any) {
      throw err?.message;
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
