interface Params {
  value: number | string;
  minValueCondition: number | string;
  callback?: any;
}

export const formatForNumberLessThanCondition = (params: Params) => {
  const { value, minValueCondition, callback } = params;
  if (Number(value) < Number(minValueCondition) && Number(value) !== 0) {
    return '<' + String(minValueCondition);
  }
  return callback ? callback(value) : value;
};
