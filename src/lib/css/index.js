// @flow

import upperFirst from 'lodash/upperFirst';

const vendors = ['Webkit', 'Moz', 'ms', 'O'];

export function prefix (key: string, value: string): { [key: string]: string } {
  const obj = {
    [key]: value,
  };

  vendors.forEach((vendor) => (obj[`${vendor}${upperFirst(key)}`] = value));

  return obj;
}
