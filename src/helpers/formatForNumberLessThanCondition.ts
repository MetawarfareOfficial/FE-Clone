interface Params {
  value: string;
  minValueCondition: number | string;
  callback?: any;
  addLessThanSymbol?: boolean;
  callBackParams?: any[];
}

export const formatForNumberLessThanCondition = (params: Params) => {
  const { value, minValueCondition, callback, addLessThanSymbol = true, callBackParams = [] } = params;
  if (Number(value) < Number(minValueCondition) && Number(value) !== 0) {
    return addLessThanSymbol ? '<' + String(minValueCondition) : String(minValueCondition);
  }
  return callback ? callback(value, ...callBackParams) : value;
};
