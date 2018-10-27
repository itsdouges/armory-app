// @flow

import { createSelector } from 'reselect';
import { connect } from 'react-redux';

export type InjectedProps = {
  token: string,
  alias: string,
  authenticated: boolean,
  checkingAuthentication: boolean,
};

export const selector = createSelector(
  store => store.user.token,
  store => store.user.loggedIn,
  store => store.user.checkingAuthentication,
  store => store.user.alias,
  (token, authenticated, checkingAuthentication, alias) => ({
    token,
    authenticated,
    alias,
    checkingAuthentication,
  })
);

const authenticatedData = (ComposedComponent: React.ComponentType<*>) => {
  // eslint-disable-next-line no-param-reassign
  ComposedComponent.defaultProps = {
    ...ComposedComponent.defaultProps,
    token: '',
    alias: '',
    authenticated: false,
    checkingAuthentication: false,
  };

  return connect(selector)(props => <ComposedComponent {...props} />);
};

export default authenticatedData;
