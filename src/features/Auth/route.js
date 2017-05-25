// @flow

import type { Children } from 'react';
import type { InjectedProps } from './data';

import { Component } from 'react';
import history from 'history';
import authData from './data';
import ProgressIcon from 'common/components/Icon/Progress';

const authenticatedRoute = (ComposedComponent: Children) => authData(class AuthOnly extends Component {
  props: InjectedProps;

  componentWillMount () {
    this.redirectIfNeeded();
  }

  componentDidUpdate () {
    this.redirectIfNeeded();
  }

  redirectIfNeeded () {
    if (!this.props.checkingAuthentication && !this.props.authenticated) {
      history.replace('/login');
    }
  }

  render () {
    return this.props.checkingAuthentication ? <ProgressIcon /> : <ComposedComponent {...this.props} />;
  }
});

export default authenticatedRoute;
