import { ClaimingType } from 'components/MyContract/TableContracts';

export const convertCType = (cType: string) => {
  if (cType === '') return ClaimingType.AllContracts;
  else if (cType === '0') return ClaimingType.Square;
  else if (cType === '1') return ClaimingType.Cube;
  else if (cType === '2') return ClaimingType.Tesseract;
  else return null;
};
