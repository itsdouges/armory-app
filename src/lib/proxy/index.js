// @flow

import debounce from 'lodash/debounce';

type debounceOptions = {
  leading?: boolean,
  maxWait?: boolean,
  trailing?: boolean,
};

const proxyFunction = (wait: number, options: debounceOptions) => {
  let args = [];

  return (func: Function) => {
    const debouncedFunc = debounce(func, wait, options);

    return (arr: Array<*>) => {
      args = args.concat(arr);
      debouncedFunc(args);
    };
  };
};

export default proxyFunction;
