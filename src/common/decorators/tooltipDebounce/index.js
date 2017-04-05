// @flow

import debounce from 'lodash/debounce';

export type InjectedProps = {
  show?: (callback: Function) => void,
  hide?: (callback: Function) => void,
};

const tooltipDebounce = (wait: number = 150) => <TProps: {}>(WrappedComponent: any) => {
  let canHide = false;

  const debouncedHide = debounce((cb: ?Function) => {
    if (canHide) {
      cb && cb();
    }
  }, wait);

  function show (cb: ?Function) {
    canHide = false;
    cb && cb();
  }

  function hide (cb: ?Function) {
    canHide = true;
    debouncedHide(cb);
  }

  return (props: TProps) => <WrappedComponent {...props} show={show} hide={hide} />;
};

export default tooltipDebounce;
