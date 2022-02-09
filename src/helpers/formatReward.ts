import { calculateToFixedNumber } from './calculateToFixedNumber';
import { formatBigNumber } from './formatBigNumber';

export const formatReward = (value: string, isAbbreviated = true) => {
  if (value === 'null' || value === 'undefined') {
    return '0';
  }
  const beforePeriodNumber = value.split('.')[0];
  const afterPeriodNumber = value.split('.')[1];
  if (beforePeriodNumber.length > 3) {
    return `${formatBigNumber(Number(beforePeriodNumber), isAbbreviated, false)} `;
  } else if (afterPeriodNumber) {
    return Number(value).toFixed(calculateToFixedNumber(value, false));
  }
  return beforePeriodNumber;
};
