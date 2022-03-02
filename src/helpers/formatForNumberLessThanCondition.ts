interface Params {
  value: number | string;
  minValueCondition: number | string;
  callback?: any;
  addLessThanSymbol?: boolean;
}

export const formatForNumberLessThanCondition = (params: Params) => {
  const { value, minValueCondition, callback, addLessThanSymbol = true } = params;
  if (Number(value) < Number(minValueCondition) && Number(value) !== 0) {
    return addLessThanSymbol ? '<' + String(minValueCondition) : String(minValueCondition);
  }
  return callback ? callback(value) : value;
};
