export const calculateNextDueDateTime = (expiredTime: number, months: number, oneMonthTime: number) => {
  return expiredTime + months * oneMonthTime;
};
