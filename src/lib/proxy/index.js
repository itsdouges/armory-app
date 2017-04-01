// @flow

import debounce from 'lodash/debounce';

type debounceOptions = {
  leading?: boolean,
  maxWait?: boolean,
  trailing?: boolean,
};

const proxyFunction = (wait: number, options: debounceOptions) => {
  let arrArg = [];

  return (func: Function) => {
    const callThenResetArgs = (...args) => {
      const result = func(...args);
      arrArg = [];
      return result;
    };

    const debouncedFunc = debounce(callThenResetArgs, wait, options);

    return (arr: Array<*>, ...args: any) => {
      arrArg = arrArg.concat(arr);
      debouncedFunc(arrArg, ...args);
    };
  };
};

export default proxyFunction;
