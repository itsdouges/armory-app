import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selector } from './user.reducer';
import ApiTokens from './components/ApiTokens';
import ChangePassword from './components/ChangePassword';
import debounce from 'lodash/debounce';
import { browserHistory } from 'react-router';

import { clearUserData } from 'features/Auth/actions';
import {
  validateGw2Token,
  addGw2Token,
  fetchGw2Tokens,
  selectPrimaryGw2Token,
  removeGw2Token,
} from './actions';

class Settings extends Component {
  static propTypes = {
    router: PropTypes.object,
    dispatch: PropTypes.func,
    user: PropTypes.object,
  };

  componentWillMount () {
    this.props.dispatch(fetchGw2Tokens());
  }

  setPrimaryToken = (token) => {
    this.props.dispatch(selectPrimaryGw2Token(token));
  };

  validateToken = debounce((token) => {
    this.props.dispatch(validateGw2Token(token));
  });

  addToken = (token) => {
    this.props.dispatch(addGw2Token(token));
  };

  removeToken = (token) => {
    this.props.dispatch(removeGw2Token(token));
  };

  signOut = (e) => {
    e.preventDefault();
    browserHistory.push('/');
    this.props.dispatch(clearUserData());
  };

  render () {
    return (
      <span>
        <ApiTokens
          valid={this.props.user.validGw2Token}
          tokens={this.props.user.gw2Tokens}
          error={this.props.user.gw2TokenError}
          add={this.addToken}
          remove={this.removeToken}
          validate={this.validateToken}
          setPrimary={this.setPrimaryToken}
          adding={this.props.user.addingGw2Token}
        />

        <ChangePassword
          valid={this.props.user.validPasswords}
          change={this.changePassword}
          validate={this.validatePassword}
          error={this.passwordsError}
        />

        <a href="" onClick={this.signOut}>Sign Out</a>
      </span>
    );
  }
}

export default connect(selector)(Settings);
