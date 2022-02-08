import { formatApyV3 } from 'helpers/formatApy';
import { bigNumber2NumberV2 } from 'helpers/formatNumber';
import {
  getInitApyOfNodes,
  getNameOfNodes,
  getPriceAllNode,
  getRewardAmount,
  getRewardAPYAllNode,
  getRewardOfNodes,
  getTimeCreatedOfNodes,
  getTypeOfNodes,
} from 'helpers/interractiveContract';
import {
  parseDataCurrentApy,
  parseDataInitApy,
  parseDataMyContract,
  zipDataMyContract,
} from 'helpers/zipDataMyContract';
import { ContractResponse } from 'interfaces/MyContract';
import { flatten } from 'lodash';
import { setDataMyContracts, setRewardAmount, unSetDataMyContracts, unSetRewardAmount } from 'services/contract';
import { useAppDispatch, useAppSelector } from 'stores/hooks';

export const useFetchUserContractData = () => {
  const dispatch = useAppDispatch();
  const myContractData = useAppSelector((state) => state.contract.dataMyContracts);
  const fetchUserContractsData = async (): Promise<void> => {
    try {
      const [mintDates, names, rewards, types, rewardAmount, initApy, prices, currentApy] = await Promise.all([
        getTimeCreatedOfNodes(),
        getNameOfNodes(),
        getRewardOfNodes(),
        getTypeOfNodes(),
        getRewardAmount(),
        getInitApyOfNodes(),
        getPriceAllNode(),
        getRewardAPYAllNode(),
      ]);

      const dataPrices = flatten(prices);
      const _prices = {
        square: bigNumber2NumberV2(dataPrices[0]),
        cube: bigNumber2NumberV2(dataPrices[1]),
        tesseract: bigNumber2NumberV2(dataPrices[2]),
      };

      const dataCurrentApy = flatten(currentApy);
      const _currentApy = {
        square: formatApyV3(dataCurrentApy[0]),
        cube: formatApyV3(dataCurrentApy[1]),
        tesseract: formatApyV3(dataCurrentApy[2]),
      };

      const dataCt = zipDataMyContract({
        mintDates: parseDataMyContract(mintDates[0]),
        names: parseDataMyContract(names[0]),
        types: parseDataMyContract(types[0]),
        initZeroXBlockPerDays: parseDataInitApy(types[0], initApy[0], _prices),
        currentZeroXBlockPerDays: parseDataCurrentApy(types[0], _currentApy, _prices),
        rewards: parseDataMyContract(rewards[0]),
      } as ContractResponse);
      dataCt.sort((a, b) => (a.mintDate < b.mintDate ? 1 : -1));
      const dataRw = bigNumber2NumberV2(rewardAmount[0], 1e9);

      dispatch(setDataMyContracts(dataCt));
      dispatch(setRewardAmount(dataRw));
    } catch (e) {
      dispatch(unSetDataMyContracts());
      dispatch(unSetRewardAmount());
    }
  };
  return {
    fetchUserContractsData,
    myContractData,
  };
};
