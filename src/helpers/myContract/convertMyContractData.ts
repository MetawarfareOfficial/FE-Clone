import BigNumber from 'bignumber.js';
import { GetMyContractResponse } from 'interfaces/myContract';

export const convertMyContractData = (data: GetMyContractResponse[]) => {
  return data.map((item) => {
    return {
      price: new BigNumber(item.buyPrice._hex).div(Number(`1e${process.env.REACT_APP_CONTRACT_DECIMAL}`)).toString(),
      type: item.cType,
      mintDate: new BigNumber(item.creationTime._hex).toString(),
      expireIn: new BigNumber(item.expireIn._hex).toString(),
      initApy: new BigNumber(item.initialAPR._hex).div(1e6).toString(),
      name: item.name,
    };
  });
};
