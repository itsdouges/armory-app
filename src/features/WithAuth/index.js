import { Component } from 'react';
import { get } from 'axios';
import { browserHistory } from 'react-router';

import config from 'env';
import { authenticateUser, clearUserData } from './actions';

const withAuthDecoratorFactory = ({
  getState,
  dispatch,
}) => (ComposedComponent, redirect) => class WithAuth extends Component {
  componentWillMount () {
    const state = getState();

    if (!state.user.token) {
      this.clearUser();
      return;
    }

    if (state.user.loggedIn) {
      return;
    }

    get(`${config.api.endpoint}/users/me`, {
      headers: {
        Authorization: state.user.token,
      },
    })
    .then(({ data }) => {
      dispatch(authenticateUser(data));
    }, this.clearUser);
  }

  clearUser () {
    dispatch(clearUserData());

    if (redirect) {
      browserHistory.push('/in');
    }
  }

  render () {
    return <ComposedComponent {...this.props} />;
  }
};

export default withAuthDecoratorFactory;
