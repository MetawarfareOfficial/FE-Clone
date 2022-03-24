import { localStorageSwapSettingKey } from 'consts/swap';

interface SwapSettingData {
  slippage: string;
  deadline: string;
}

export const getSwapSettingData = (): SwapSettingData | null => {
  const rawData = localStorage.getItem(localStorageSwapSettingKey);
  return rawData ? JSON.parse(rawData) : null;
};
