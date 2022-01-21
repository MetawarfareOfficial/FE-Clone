export const formatPrice = (price: string): string => {
  if (price) {
    return Number(price).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  }
  return Number('0').toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
};
