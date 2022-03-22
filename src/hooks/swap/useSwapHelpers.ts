import { maxSlippageValue, minSlippageValue } from 'consts/swap';

export const useSwapHelpers = () => {
  const validateSlippageInput = (value: string): string => {
    if (!value || (value && value.trim()) === '') {
      return 'Please enter a valid amount!';
    } else if (Number(value) < minSlippageValue) {
      return `Please enter more than ${minSlippageValue}%`;
    } else if (Number(value) >= maxSlippageValue) {
      return `Please enter less than ${maxSlippageValue}%`;
    }
    return '';
  };
  const validateDeadlineInput = (value: string) => {
    if (!value || (value && value.trim() === '')) {
      return 'Please enter a valid amount!';
    } else if (Number(value) < 0) {
      return 'Please enter more than 0 minute';
    }
    return '';
  };
  return {
    validateSlippageInput,
    validateDeadlineInput,
  };
};
