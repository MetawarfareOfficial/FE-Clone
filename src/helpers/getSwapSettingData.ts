import { localStorageSwapSettingKey } from 'consts/swap';

interface SwapSettingData {
  slippage: String;
  deadline: String;
}

export const getSwapSettingData = (): SwapSettingData | null => {
  const rawData = localStorage.getItem(localStorageSwapSettingKey);
  return rawData ? JSON.parse(rawData) : null;
};
