import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Textbox from 'common/components/Textbox';
import Card from 'common/components/Card';
import Button from 'common/components/Button';
import PasswordForm from 'common/components/PasswordForm';
import Message from 'common/components/Message';

import {
  register,
  validateEmail,
  validateAlias,
  validatePasswords,
} from './actions';

import { selector } from './user.reducer';

import debounce from 'lodash/debounce';

class Join extends Component {
  static propTypes = {
    router: PropTypes.object,
    dispatch: PropTypes.func,
    user: PropTypes.object,
    canRegister: PropTypes.bool,
  };

  state = {
    email: '',
    alias: '',
    password: '',
    passwordConfirm: '',
  };

  fieldChanged = ({ target: { id, value } }) => {
    const newState = {
      ...this.state,
      [id]: value,
    };

    const passwordChanged = id.indexOf('password') >= 0;
    const methodName = passwordChanged ? 'password' : id;
    const args = passwordChanged ?
      [newState.password, newState.passwordConfirm] :
      [value];

    this[`check${methodName[0].toUpperCase() + methodName.slice(1)}`](...args);
    this.setState(newState);
  };

  checkEmail = debounce((value) => {
    if (!value.trim()) {
      return;
    }

    this.props.dispatch(validateEmail(value));
  }, 300);

  checkAlias = debounce((value) => {
    if (!value.trim()) {
      return;
    }

    this.props.dispatch(validateAlias(value));
  }, 300);

  checkPassword = debounce(
    (password, passwordConfirm) =>
      this.props.dispatch(validatePasswords(password, passwordConfirm)),
      300
  );

  register = (event) => {
    event.preventDefault();

    const action = register(this.state);
    this.props.dispatch(action);
  };

  render () {
    return (
      <span>
        <h2>Join</h2>
        <Card size="medium">
          <Message>
            Already have an account? <Link to="/login"><strong>Go login!</strong></Link>
          </Message>

          <form onSubmit={this.register}>
            <Textbox
              showStatus
              required
              id="email"
              placeholder="Email"
              value={this.state.email}
              error={this.props.user.emailErrors}
              valid={this.props.user.emailValid}
              onChange={this.fieldChanged}
            />

            <Textbox
              showStatus
              required
              id="alias"
              placeholder="Alias"
              value={this.state.alias}
              error={this.props.user.aliasErrors}
              valid={this.props.user.aliasValid}
              onChange={this.fieldChanged}
            />

            <PasswordForm
              onFieldChange={this.fieldChanged}
              valid={this.props.user.passwordValid}
              passwordValue={this.state.password}
              passwordConfirmValue={this.state.passwordConfirm}
              error={this.props.user.passwordErrors}
            />

            <Button
              primary
              busy={this.props.user.registering}
              disabled={!this.props.canRegister}
            >
              REGISTER
            </Button>
          </form>
        </Card>
      </span>
    );
  }
}

export default connect(selector)(Join);
