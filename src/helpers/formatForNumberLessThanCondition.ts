export const formatForNumberLessThanCondition = (value: number | string, numberCondition: number | string) => {
  if (Number(value) < Number(numberCondition)) {
    return '<' + String(numberCondition);
  }
  return value;
};
