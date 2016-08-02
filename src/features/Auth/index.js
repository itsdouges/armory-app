import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { authenticateUser } from './actions';

const selector = createSelector(
  store => store.user.token,
  store => store.user.loggedIn,
  store => store.user.checkingAuthentication,
  (userToken, userAuthenticated, checkingAuthentication) => ({
    userToken,
    userAuthenticated,
    checkingAuthentication,
  })
);

export const authEnabled = (ComposedComponent) => connect(selector)(
  class AuthEnabled extends Component {
    static propTypes = {
      dispatch: PropTypes.func,
      userToken: PropTypes.string,
      userAuthenticated: PropTypes.bool,
      checkingAuthentication: PropTypes.bool,
    };

    static childContextTypes = {
      _checkingAuth: PropTypes.bool,
      _userAuthenticated: PropTypes.bool,
    };

    getChildContext () {
      return {
        _checkingAuth: this.props.checkingAuthentication,
        _userAuthenticated: this.props.userAuthenticated,
      };
    }

    componentWillMount () {
      this.checkAuth();
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.userToken && nextProps.userToken !== this.props.userToken) {
        this.checkAuth();
      }
    }

    checkAuth () {
      if (!this.props.userToken || this.props.userAuthenticated) {
        return;
      }

      this.props.dispatch(authenticateUser(this.props.userToken));
    }

    render () {
      return <ComposedComponent {...this.props} />;
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
      browserHistory.push('/in');
    }
  }

  render () {
    return this.context._checkingAuth ? <span>...</span> : <ComposedComponent {...this.props} />;
  }
};

