import moment from 'moment';

export const checkPendingContract = (expiredTime: number, oneMonthTime: number, deployTime: number) => {
  const now = moment().unix();

  const isOldContract = expiredTime - deployTime <= oneMonthTime;

  const previous30Days = Number(expiredTime) - Number(oneMonthTime);

  const previous30DaysForOldContract = Number(expiredTime) - Number(oneMonthTime) / 3;

  if (isOldContract) {
    if (now >= previous30DaysForOldContract) {
      return true;
    } else return false;
  } else {
    if (now >= previous30Days) {
      return true;
    } else return false;
  }
};
