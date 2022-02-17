import moment from 'moment';

export const formatTimestamp = (timestamp: string, formatter: string): string => {
  if (timestamp !== '') {
    return moment(new Date(timestamp)).format(formatter);
  }
  return moment(new Date()).format(formatter);
};

export const formatTimestampV2 = (timestamp: string): string => {
  return moment.unix(Number(timestamp)).format('MMM DD YYYY');
};
