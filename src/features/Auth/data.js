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

const authData = (ComposedComponent: Children) =>
  connect(selector)(
    (props) => <ComposedComponent {...props} />
  );

export default authData;
