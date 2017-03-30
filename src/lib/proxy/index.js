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
    const callThenResetArgs = () => {
      const result = func(arrArg);
      arrArg = [];
      return result;
    };

    const debouncedFunc = debounce(callThenResetArgs, wait, options);

    return (arr: Array<*>) => {
      arrArg = arrArg.concat(arr);
      debouncedFunc(arrArg);
    };
  };
};

export default proxyFunction;
