import { ClaimingType, ClaimingTypeV2 } from 'components/MyContract/TableContracts';
import {
  SquareIcon,
  CubeIcon,
  TessIcon,
  SquareDarkIcon,
  CubeDarkIcon,
  TessDarkIcon,
  AllContract,
  AllDarkContract,
} from 'assets/images';

export const getIconByMode = (type: ClaimingTypeV2, mode: string) => {
  if (type) {
    // TODO: return in if still need else statement?
    if (type === ClaimingType.AllContracts) return mode === 'light' ? AllContract : AllDarkContract;
    else if (type === ClaimingType.Square) return mode === 'light' ? SquareIcon : SquareDarkIcon;
    else if (type === ClaimingType.Cube) return mode === 'light' ? CubeIcon : CubeDarkIcon;
    else if (type === ClaimingType.Tesseract) return mode === 'light' ? TessIcon : TessDarkIcon;
  }
  return '';
};
