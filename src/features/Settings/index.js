import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ApiTokens from './ApiTokens';
import ChangePassword from './ChangePassword';

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

  validateToken = () => {

  }

  addToken = () => {

  }

  removeToken = () => {

  }

  render () {
    return (
      <span>
        <ApiTokens
          valid={this.props.user.validToken}
          tokens={this.props.user.apiTokens}
          add={this.addToken}
          remove={this.removeToken}
          validate={this.validateToken}
          error={this.tokenError}
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
