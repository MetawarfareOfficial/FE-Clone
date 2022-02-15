export const formatForNumberLessThanCondition = (value: number | string, numberCondition: number | string) => {
  if (Number(value) === 0) {
    return value;
  } else if (Number(value) < Number(numberCondition)) {
    return '<' + String(numberCondition);
  }
  return value;
};
