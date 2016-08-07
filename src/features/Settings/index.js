import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ApiTokens from './components/ApiTokens';
import ChangePassword from './components/ChangePassword';
import debounce from 'lodash/debounce';

import { validateGw2Token, addGw2Token } from './actions';

const selector = createSelector(
  store => store.user,
  (user) => ({
    user,
  })
);

class Settings extends Component {
  static propTypes = {
    router: PropTypes.object,
    dispatch: PropTypes.func,
    user: PropTypes.object,
  };

  validateToken = debounce((token) => {
    this.props.dispatch(validateGw2Token(token));
  });

  addToken = (token) => {
    this.props.dispatch(addGw2Token(token));
  };

  removeToken = () => {

  };

  render () {
    return (
      <span>
        <ApiTokens
          valid={this.props.user.validGw2Token}
          tokens={this.props.user.apiTokens}
          error={this.props.user.gw2TokenError}
          add={this.addToken}
          remove={this.removeToken}
          validate={this.validateToken}
        />

        <ChangePassword
          valid={this.props.user.validPasswords}
          change={this.changePassword}
          validate={this.validatePassword}
          error={this.passwordsError}
        />
      </span>
    );
  }
}

export default connect(selector)(Settings);
