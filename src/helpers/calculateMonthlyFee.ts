export const calculateMonthlyFee = (totalContract: number, getLastFee: boolean, taxFee: number) => {
  if (getLastFee) {
    return taxFee * totalContract - taxFee * totalContract * (totalContract * 0.1);
  }
};
