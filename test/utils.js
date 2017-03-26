// @flow

import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';

export const createStubComponent = (displayName: string) => {
  function stubComponent () {
    return <div />;
  }

  stubComponent.displayName = displayName;

  return stubComponent;
};

export const stubStyles = (classnames: Array<string>) => classnames.reduce((obj, name) => ({
  ...obj,
  [name]: `${name}-style`,
}), {});

export const stubDecoratorWithArgs = () => _.identity;

export const stubRedux = ({
  'react-redux': {
    connect: stubDecoratorWithArgs,
  },
});

export function describeConnect (path: string, stubs: {}, expectations: () => void) {
  let mapStateToPropsExtracted;
  let mapDispatchToPropsExatracted;

  const extractor = (mapStateToProps, mapDispatchToProps) => () => {
    mapStateToPropsExtracted = mapStateToProps;
    mapDispatchToPropsExatracted = mapDispatchToProps;
    return createStubComponent(path);
  };

  const StubComponent = global.proxyquire(path, {
    ...stubs,
    'react-redux': {
      connect: extractor,
    },
  });

  shallow(<StubComponent />);

  describe('mapStateToProps', () => {
    expectations(mapStateToPropsExtracted, mapDispatchToPropsExatracted);
  });
}
