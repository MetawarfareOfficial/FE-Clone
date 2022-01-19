import moment from 'moment';

export const formatTimestamp = (timestamp: string, formatter: string): string => {
  if (timestamp !== '') {
    return moment(new Date(timestamp)).format(formatter);
  }
  return moment(new Date()).format(formatter);
};
