// @flow

import type { Children } from 'react';
import type { InjectedProps } from './data';

import { Component } from 'react';
import { connect } from 'react-redux';

import authenticatatedData from './data';
import * as actions from './actions';

type Props = InjectedProps & {
  authenticateUser: (string) => void,
  checkingAuthentication: (boolean) => void,
};

const authEnabled = (ComposedComponent: Children) =>
authenticatatedData(
connect(null, {
  checkingAuthentication: actions.checkingAuthentication,
  authenticateUser: actions.authenticateUser,
})(
  class AuthenticatedApp extends Component {
    props: Props;

    componentWillMount () {
      this.authenticate();
    }

    componentDidUpdate (prevProps) {
      if (prevProps.token !== this.props.token) {
        this.authenticate();
      }
    }

    authenticate () {
      const { token, authenticated, checkingAuthentication, authenticateUser } = this.props;
      if (!token || authenticated) {
        checkingAuthentication(false);
        return;
      }

      authenticateUser(token);
    }

    render () {
      return <ComposedComponent {...this.props} />;
    }
}));

export default authEnabled;
