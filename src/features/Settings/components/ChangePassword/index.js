import { Component } from 'react';
import T from 'i18n-react';

import styles from './styles.less';

import CardWithTitle from 'common/layouts/CardWithTitle';
import Textbox from 'common/components/Textbox';
import Button from 'common/components/Button';
import PasswordForm from 'common/components/PasswordForm';

export default class ChangePassword extends Component {
  state = {
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  };

  fieldChanged = ({ target: { id, value } }) => {
    const newState = {
      ...this.state,
      [id]: value,
    };

    this.setState(newState);

    this.props.validate(newState.password, newState.passwordConfirm);
  };

  changePassword = (e) => {
    e.preventDefault();
    this.props.change(this.state.currentPassword, this.state.password);
  };

  render () {
    const { message, error, busy, valid } = this.props;
    const { currentPassword, password, passwordConfirm } = this.state;

    return (
      <CardWithTitle
        size="medium"
        title={T.translate('settings.changePassword.name')}
        message={message}
      >
        <form onSubmit={this.changePassword}>
          <Textbox
            required
            id="currentPassword"
            placeholder={T.translate('settings.changePassword.inputs.current')}
            type="password"
            value={currentPassword}
            onChange={this.fieldChanged}
          />

          <PasswordForm
            onFieldChange={this.fieldChanged}
            valid={valid}
            passwordValue={password}
            passwordConfirmValue={passwordConfirm}
            error={error}
          />

          <div className={styles.buttons}>
            <Button
              busy={busy}
              type="primary"
              disabled={!valid}
            >
              {T.translate('forgotPassword.changeCta')}
            </Button>
          </div>
        </form>
      </CardWithTitle>
    );
  }
}
