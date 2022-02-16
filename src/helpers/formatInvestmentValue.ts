import { formatPrice, truncateNumber } from 'helpers/formatPrice';

export const formatInvestmentValue = (number: number, decimals = 4) => {
  const truncatedNumber = truncateNumber(number, decimals);
  return formatPrice(truncatedNumber, decimals, decimals);
};
