// @flow

import type { Children } from 'react';

import { Component } from 'react';
import { connect } from 'react-redux';
import { selector } from './user.reducer';
import * as actions from './actions';

type Props = {
  userToken: string,
  userAlias: string,
  userAuthenticated: boolean,
  authenticateUser: (string) => void,
  checkingAuthentication: (boolean) => void,
};

const authEnabled = (ComposedComponent: Children) =>
connect(selector, {
  checkingAuthentication: actions.checkingAuthentication,
  authenticateUser: actions.authenticateUser,
})(
  class AuthEnabled extends Component {
    props: Props;

    componentWillMount () {
      this.checkAuth();
    }

    componentDidUpdate (prevProps) {
      if (prevProps.userToken !== this.props.userToken) {
        this.checkAuth();
      }
    }

    checkAuth () {
      const { userToken, userAuthenticated, checkingAuthentication, authenticateUser } = this.props;
      if (!userToken || userAuthenticated) {
        checkingAuthentication(false);
        return;
      }

      authenticateUser(userToken);
    }

    render () {
      return <ComposedComponent {...this.props} />;
    }
});

export default authEnabled;
