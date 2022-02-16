export const formatPrice = (price: string, maximumFractionDigits = 2, minimumFractionDigits = 2): string => {
  if (price) {
    return Number(price).toLocaleString('en-US', {
      maximumFractionDigits,
      minimumFractionDigits,
    });
  }
  return Number('0').toLocaleString('en-US', {
    maximumFractionDigits,
    minimumFractionDigits,
  });
};
