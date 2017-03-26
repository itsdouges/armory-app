// @flow

import React from 'react';

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

export const stubRedux = ({
  'react-redux': {
    connect: () => (c: any) => c,
  },
});
