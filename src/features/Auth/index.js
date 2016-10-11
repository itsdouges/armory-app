import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { authenticateUser, checkingAuthentication } from './actions';
import ProgressIcon from 'common/components/Icon/Progress';

const selector = createSelector(
  store => store.user.token,
  store => store.user.loggedIn,
  store => store.user.checkingAuthentication,
  store => store.user.alias,
  (userToken, userAuthenticated, checkinAuthentication, userAlias) => ({
    userToken,
    userAuthenticated,
    checkingAuthentication: checkinAuthentication,
    userAlias,
  })
);

export const authEnabled = (ComposedComponent) => connect(selector)(
  class AuthEnabled extends Component {
    static propTypes = {
      dispatch: PropTypes.func,
      userToken: PropTypes.string,
      userAuthenticated: PropTypes.bool,
      checkingAuthentication: PropTypes.bool,
      userAlias: PropTypes.string,
    };

    static childContextTypes = {
      _checkingAuth: PropTypes.bool,
      _userAuthenticated: PropTypes.bool,
      _userAlias: PropTypes.string,
    };

    getChildContext () {
      return {
        _checkingAuth: this.props.checkingAuthentication,
        _userAuthenticated: this.props.userAuthenticated,
        _userAlias: this.props.userAlias,
      };
    }

    componentWillMount () {
      this.checkAuth();
    }

    componentDidUpdate (prevProps) {
      if (prevProps.userToken !== this.props.userToken) {
        this.checkAuth();
      }
    }

    checkAuth () {
      if (!this.props.userToken || this.props.userAuthenticated) {
        this.props.dispatch(checkingAuthentication(false));
        return;
      }

      this.props.dispatch(authenticateUser(this.props.userToken));
    }

    render () {
      return (
        this.props.checkingAuthentication
          ? <ProgressIcon />
          : <ComposedComponent {...this.props} />
      );
    }
});

/* eslint react/no-multi-comp:0 */
export const authOnly = (ComposedComponent) => class AuthOnly extends Component {
  static contextTypes = {
    _checkingAuth: PropTypes.bool,
    _userAuthenticated: PropTypes.bool,
  };

  componentWillMount () {
    this.redirectIfNeeded();
  }

  componentDidUpdate () {
    this.redirectIfNeeded();
  }

  redirectIfNeeded () {
    /* eslint no-underscore-dangle:0 */
    if (!this.context._checkingAuth && !this.context._userAuthenticated) {
      browserHistory.replace('/login');
    }
  }

  render () {
    return this.context._checkingAuth ? <ProgressIcon /> : <ComposedComponent {...this.props} />;
  }
};

