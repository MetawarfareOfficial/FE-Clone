import moment from 'moment-timezone';

export const formatTimestamp = (timestamp: string, formatter: string, timezone?: string): string => {
  if (timestamp !== '') {
    return timezone
      ? moment(new Date(timestamp)).tz('UTC').format(formatter)
      : moment(new Date(timestamp)).format(formatter);
  }
  return timezone ? moment(new Date()).tz('UTC').format(formatter) : moment(new Date()).format(formatter);
};

export const formatTimestampV2 = (timestamp: string): string => {
  return moment.unix(Number(timestamp)).format('MMM DD YYYY');
};
