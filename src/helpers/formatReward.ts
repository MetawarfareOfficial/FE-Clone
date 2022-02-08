const getNumberLengthSymbol = (length: number) => {
  if (length > 3 && length < 7) {
    return 'K';
  } else if (length > 6 && length < 10) {
    return 'M';
  } else if (length > 9 && length < 13) {
    return 'B';
  } else if (length > 12) {
    return 'T';
  }
  return '';
};

const formatNumberAfterPeriod = (beforePeriodNumberLength: number, numberAfterPeriod: string) => {
  if (beforePeriodNumberLength === 3) return String(numberAfterPeriod).slice(0, 1);
  else if (beforePeriodNumberLength === 2) {
    if (numberAfterPeriod.length > 3) {
      return String(numberAfterPeriod).slice(0, 1) + getNumberLengthSymbol(numberAfterPeriod.length);
    }
    return String(numberAfterPeriod).slice(0, 2);
  } else {
    if (numberAfterPeriod.length > 4) {
      return String(numberAfterPeriod).slice(0, 2) + getNumberLengthSymbol(numberAfterPeriod.length);
    }
    return String(numberAfterPeriod).slice(0, 3);
  }
};

const removeEndingComma = (value: string) => {
  if (value[value.length - 1] === ',') {
    return value.slice(0, value.length - 1);
  }
  return value;
};

export const formatReward = (value: string) => {
  const beforePeriodNumber = value.split('.')[0];
  const afterPeriodNumber = value.split('.')[1];
  if (beforePeriodNumber.length > 3) {
    return `${removeEndingComma(Number(beforePeriodNumber).toLocaleString('en-US').slice(0, 4))}${getNumberLengthSymbol(
      beforePeriodNumber.length,
    )} `;
  } else if (afterPeriodNumber) {
    return beforePeriodNumber + '.' + formatNumberAfterPeriod(beforePeriodNumber.length, afterPeriodNumber);
  }
  return beforePeriodNumber;
};
