import { Component, PropTypes } from 'react';
import { get } from 'axios';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { browserHistory } from 'react-router';

import config from 'env';
import { authenticateUser, clearUserData } from './actions';

const selector = createSelector(
  store => store.user.token,
  store => store.user.loggedIn,
  (userToken, userAuthenticated) => ({
    userToken,
    userAuthenticated,
  })
);

export const authEnabled = (ComposedComponent) => connect(selector)(
  class AuthEnabled extends Component {
    static propTypes = {
      dispatch: PropTypes.func,
      userToken: PropTypes.string,
      userAuthenticated: PropTypes.bool,
    };

    static childContextTypes = {
      _checkingAuth: PropTypes.bool,
      _userAuthenticated: PropTypes.bool,
    };

    state = {
      checkingAuth: true,
    };

    getChildContext () {
      return {
        _checkingAuth: this.state.checkingAuth,
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

      get(`${config.api.endpoint}/users/me`, {
        headers: {
          Authorization: this.props.userToken,
        },
      })
      .then(({ data }) => {
        this.props.dispatch(authenticateUser(data));
        this.setState({
          checkingAuth: false,
        });
      }, this.clearUser);
    }

    clearUser () {
      this.props.dispatch(clearUserData());
      this.setState({
        checkingAuth: false,
      });
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
    return this.context._checkingAuth ? <span /> : <ComposedComponent {...this.props} />;
  }
};

