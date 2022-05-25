import moment from 'moment';

export const calculateDueDate = (expiredTime: number, _oneMonthTime: number) => {
  const now = moment();
  const oneDaySecond = 60 * 60 * 24;
  const remainHours = moment(expiredTime * 1000).diff(now, 'h');
  const remainDays = Math.ceil(remainHours / 24);
  const oneMonthTime = Math.ceil(_oneMonthTime / oneDaySecond);
  if (remainDays >= oneMonthTime) {
    return remainDays - oneMonthTime;
  }
  return remainDays;
};
