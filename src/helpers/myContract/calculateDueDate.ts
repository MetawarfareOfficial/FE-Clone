import moment from 'moment';

export const calculateDueDate = (expiredTime: number, _oneMonthTime: number) => {
  const now = moment();
  const oneDaySecond = 60 * 60 * 24;
  const oneHourSecond = 60 * 60;

  const remainHours = moment(expiredTime * 1000).diff(now, 'h');
  let remainDays = Math.ceil(remainHours / 24);

  let oneMonthTime = Math.ceil(_oneMonthTime / oneDaySecond);

  // for case month time is hours
  if (_oneMonthTime < oneDaySecond) {
    oneMonthTime = Math.ceil(_oneMonthTime / oneHourSecond);
    remainDays = remainHours >= 0 ? remainHours : 0;
  }

  if (remainDays > oneMonthTime) {
    return remainDays - oneMonthTime;
  }

  return remainDays;
};
