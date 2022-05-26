import moment from 'moment';

export const checkPendingContract = (expiredTime: number, oneMonthTime: number) => {
  const now = moment().unix();

  const previous30Days = Number(expiredTime) - Number(oneMonthTime);

  // const previous30DaysForOldContract = Number(expiredTime) - Number(oneMonthTime) / 3;

  if (now >= previous30Days) {
    return true;
  } else return false;
};
