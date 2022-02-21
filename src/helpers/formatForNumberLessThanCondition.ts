export const formatForNumberLessThanCondition = (
  value: number | string,
  numberCondition: number | string,
  callBack?: any,
) => {
  if (Number(value) < Number(numberCondition) && Number(value) !== 0) {
    return '<' + String(numberCondition);
  }
  return callBack ? callBack(value) : value;
};
