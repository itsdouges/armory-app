import { Component, PropTypes } from 'react';

import Textbox from 'common/components/Textbox';
import Card from 'common/components/Card';
import Button from 'common/components/Button';
import PasswordForm from 'common/components/PasswordForm';
import Message from 'common/components/Message';

export default class ChangePassword extends Component {
  static propTypes = {
    change: PropTypes.func,
    valid: PropTypes.bool,
    validate: PropTypes.func,
    error: PropTypes.string,
    busy: PropTypes.bool,
    message: PropTypes.string,
  };

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
    return (
      <span>
        <h2>Password</h2>
        <Card size="medium">
          {this.props.message && <Message type="success">{this.props.message}</Message>}

          <form onSubmit={this.changePassword}>
            <Textbox
              required
              id="currentPassword"
              placeholder="Current password"
              type="password"
              value={this.state.currentPassword}
              onChange={this.fieldChanged}
            />

            <PasswordForm
              onFieldChange={this.fieldChanged}
              valid={this.props.valid}
              passwordValue={this.state.password}
              passwordConfirmValue={this.state.passwordConfirm}
              error={this.props.error}
            />

            <Button
              busy={this.props.busy}
              primary
              disabled={!this.props.valid}
            >
              CHANGE
            </Button>
          </form>
        </Card>
      </span>
    );
  }
}
