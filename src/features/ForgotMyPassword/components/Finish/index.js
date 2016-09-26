import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { put } from 'axios';

import Textbox from 'common/components/Textbox';
import Button from 'common/components/Button';
import PasswordForm from 'common/components/PasswordForm';
import Message from 'common/components/Message';

import { validatePasswords } from 'features/Join/actions';

import config from 'config';
import styles from '../../styles.less';

export default class Finish extends Component {
  static propTypes = {
    initialToken: PropTypes.string,
  };

  state = {
    token: this.props.initialToken || '',
    message: this.props.initialToken ? '' : 'Check your email for your reset token!',
    password: '',
    passwordConfirm: '',
    busy: false,
    valid: false,
    complete: false,
  };

  fieldChanged = ({ target: { id, value } }) => {
    const newState = {
      ...this.state,
      [id]: value,
    };

    const action = validatePasswords(newState.password, newState.passwordConfirm);
    newState.passwordError = action.error && action.payload;
    newState.valid = !action.error && !!this.state.token;

    this.setState(newState);
  };

  changePassword = (event) => {
    event.preventDefault();

    const { token, password } = this.state;

    this.setState({
      busy: true,
      error: '',
    });

    return put(`${config.api.endpoint}forgot-my-password`, {
      token,
      password,
    })
    .then(() => {
      this.setState({
        busy: false,
        complete: true,
      });
    }, ({ response }) => this.setState({
      busy: false,
      message: response.data,
    }));
  };

  render () {
    if (this.state.complete) {
      return (
        <Message>Your password has been changed. <Link to="/login">Go login!</Link></Message>
      );
    }

    return (
      <form onSubmit={this.changePassword}>
        <Message type="error">{this.state.message}</Message>

        <Textbox
          required
          id="token"
          placeholder="Token"
          value={this.state.token}
          onChange={this.fieldChanged}
        />

        <PasswordForm
          error={this.state.passwordError}
          onFieldChange={this.fieldChanged}
          valid={this.state.valid}
          passwordValue={this.state.password}
          passwordConfirmValue={this.state.passwordConfirm}
        />

        <div className={styles.buttons}>
          <Button
            type="primary"
            busy={this.state.busy}
            disabled={!this.state.valid}
          >
            Change
          </Button>
        </div>
      </form>
    );
  }
}
