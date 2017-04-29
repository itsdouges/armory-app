// @flow

import times from 'lodash/times';

// eslint-disable-next-line
export const makeStubItems = (n: number) => ({
  rows: times(n, () => undefined),
  count: 9999,
});
