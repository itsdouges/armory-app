import moment from 'moment';

// eslint-disable-next-line
export function humanize (date) {
  const now = moment();
  const end = moment(date);
  const diffInMs = now.diff(end);

  return `${moment.duration(diffInMs).humanize()} ago`;
}
