export const formatForNumberLessThanCondition = (
  value: number | string,
  numberCondition: number | string,
  callBack?: any,
) => {
  if (Number(value) === 0) {
    return value;
  } else if (Number(value) < Number(numberCondition)) {
    return '<' + String(numberCondition);
  }
  return callBack ? callBack(value) : value;
};
