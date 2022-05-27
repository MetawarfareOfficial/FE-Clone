import moment from 'moment';

export const checkPendingContract = (
  expiredTime: number,
  oneMonthTime: number,
  checkLast10days = false,
  getTotalPendingMonths = false,
) => {
  const now = moment().unix();

  const last10Days = Number(expiredTime) - Number(oneMonthTime) / 3;
  if (getTotalPendingMonths) {
    if (now >= expiredTime) {
      const times = Math.ceil((now - expiredTime) / oneMonthTime);
      return times > 0 ? times : 1;
    } else return 0;
  }

  if (!checkLast10days) {
    if (now >= expiredTime) {
      return true;
    } else return false;
  }

  if (now >= last10Days) {
    return true;
  } else return false;
};
