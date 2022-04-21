import { defaultSettingData } from 'consts/swap';
import { localStorageZapSettingKey } from 'consts/zap';
import { errorMessage } from 'messages/errorMessages';

const getSwapSettingData = () => {
  const rawData = localStorage.getItem(localStorageZapSettingKey);
  return rawData ? JSON.parse(rawData) : defaultSettingData;
};

const validateDeadlineInput = (value: string) => {
  if (!value || (value && value.trim() === '') || Number(value) > 9999999999 || Number(value) <= 0) {
    return errorMessage.SWAP_SLIPPAGE_INVALID.message;
  }
  return '';
};
const validateSlippageInput = (value: string): string => {
  if (!value || (value && value.trim()) === '') {
    return errorMessage.SWAP_SLIPPAGE_INVALID.message;
  } else if (Number(value) < 0.1) {
    return errorMessage.SWAP_SLIPPAGE_TOO_SMALL.message;
  } else if (Number(value) >= 50) {
    return errorMessage.SWAP_SLIPPAGE_TOO_HIGH.message;
  } else if (Number(value) >= 5) {
    return errorMessage.SWAP_SLIPPAGE_HIGH.message;
  }
  return '';
};

export const getZapSetting = () => {
  const settings = getSwapSettingData();
  if (settings) {
    const deadLineError = validateDeadlineInput(settings.deadline);
    const slippageError = validateSlippageInput(settings.slippage);
    const inValidSlippage =
      slippageError === errorMessage.SWAP_SLIPPAGE_INVALID.message ||
      slippageError === errorMessage.SWAP_SLIPPAGE_TOO_HIGH.message;

    const invalidDeadline = deadLineError === errorMessage.SWAP_SLIPPAGE_INVALID.message;
    const newSetting = {
      slippage: inValidSlippage ? defaultSettingData.slippage : settings.slippage,
      deadline: invalidDeadline ? defaultSettingData.deadline : settings.deadline,
    };
    localStorage.setItem(localStorageZapSettingKey, JSON.stringify(newSetting));
    return newSetting;
  } else {
    localStorage.setItem(localStorageZapSettingKey, JSON.stringify(defaultSettingData));
    return defaultSettingData;
  }
};
