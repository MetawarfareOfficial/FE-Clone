import moment from 'moment';

export const calculateDueDate = (expiredTime: number, _oneMonthTime: number) => {
  const now = moment();
  const oneDaySecond = 60 * 60 * 24;

  const remainHours = Math.ceil(moment(expiredTime * 1000).diff(now, 'h', true));
  let remainDays = Math.ceil(remainHours / 24);
  // for case month time is hours
  if (_oneMonthTime <= oneDaySecond) {
    remainDays = remainHours > 0 ? remainHours : 0;
  }

  return remainDays;
};
