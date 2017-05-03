// @flow

import type { Children } from 'react';

import { selector } from './user.reducer';
import { connect } from 'react-redux';

export type InjectedProps = {
  token: string,
  alias: string,
  authenticated: boolean,
  checkingAuthentication: boolean,
};

const authData = (ComposedComponent: Children) => {
  // eslint-disable-next-line no-param-reassign
  ComposedComponent.defaultProps = {
    ...ComposedComponent.defaultProps,
    token: '',
    alias: '',
    authenticated: false,
    checkingAuthentication: false,
  };

  return connect(selector)(
    (props) => <ComposedComponent {...props} />
  );
};

export default authData;
