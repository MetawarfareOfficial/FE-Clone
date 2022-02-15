export const formatPrice = (price: string, numberAfterPeriod = 2): string => {
  if (price) {
    return Number(price).toLocaleString('en-US', {
      maximumFractionDigits: numberAfterPeriod,
      minimumFractionDigits: numberAfterPeriod,
    });
  }
  return Number('0').toLocaleString('en-US', {
    maximumFractionDigits: numberAfterPeriod,
    minimumFractionDigits: numberAfterPeriod,
  });
};
