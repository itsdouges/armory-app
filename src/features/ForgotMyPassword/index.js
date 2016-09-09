import { Component } from 'react';
import Title from 'react-title-component';
import { post, put } from 'axios';

import config from 'env';
import styles from './styles.less';

import qs from 'lib/qs';
import Textbox from 'common/components/Textbox';
import Card from 'common/components/Card';
import Message from 'common/components/Message';
import Button from 'common/components/Button';
import PasswordForm from 'common/components/PasswordForm';

import { validatePasswords } from 'features/Join/actions';

export default class ForgotMyPassword extends Component {
  state = {
    email: '',
    token: qs('token'),
    startScreen: !qs('token'),
    complete: false,
    busy: false,
    valid: true,
    password: '',
    passwordConfirm: '',
    passwordError: '',
    passwordValid: false,
  };

  setStart () {
    return (
      <form onSubmit={this.begin}>
        <Message>
          Enter your account's email to get started.
        </Message>

        <Textbox
          required
          id="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.fieldChanged}
        />

        <div className={styles.buttons}>
          <Button
            type="primary"
            busy={this.state.busy}
            disabled={!this.state.valid}
          >
            Start
          </Button>
        </div>
      </form>
    );
  }

  setFinish () {
    return (
      <form onSubmit={this.changePassword}>
        <Message>
          Finish message.
        </Message>

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
          valid={this.state.passwordValid}
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

  begin = (event) => {
    event.preventDefault();

    this.setState({
      busy: true,
    });

    return post(`${config.api.endpoint}forgot-my-password`, {
      email: this.state.email,
    })
    .then(() => {
      this.setState({
        busy: false,
        startScreen: false,
      });
    });
  };

  changePassword = (event) => {
    event.preventDefault();

    const { token, password } = this.state;

    this.setState({
      busy: true,
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
    });
  };

  fieldChanged = ({ target: { id, value } }) => {
    const newState = {
      ...this.state,
      [id]: value,
    };

    if (id.indexOf('password') >= 0) {
      const action = validatePasswords(newState.password, newState.passwordConfirm);
      newState.passwordError = action.error && action.payload;
      newState.passwordValid = !action.error;
    }

    this.setState(newState);
  };

  render () {
    return (
      <span className={styles.root}>
        <Title render={(title) => `Forgot My Password${title}`} />

        <h2>Forgot My Password</h2>
        <Card size="small">
          {this.state.startScreen ? this.setStart() : this.setFinish()}
        </Card>
      </span>
    );
  }
}
