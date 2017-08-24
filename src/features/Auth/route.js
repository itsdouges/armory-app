// @flow

import type { InjectedProps } from './data';

import type { ComponentType } from 'react';
import React, { Component } from 'react';
import history from 'history';
import authData from './data';
import ProgressIcon from 'common/components/Icon/Progress';

const authenticatedRoute = (ComposedComponent: ComponentType<*>) => authData(class AuthOnly extends Component<InjectedProps> {
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
