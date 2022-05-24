import moment from 'moment';

export const calculateDueDate = (expiredTime: number) => {
  const now = moment();
  const remainHours = moment(expiredTime * 1000).diff(now, 'h');
  const remainDays = Math.ceil(remainHours / 24);
  if (remainDays > 30) {
    return remainDays - 30;
  }
  return remainDays;
};
