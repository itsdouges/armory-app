import { Component, PropTypes } from 'react';

import Textbox from 'common/components/Textbox';
import Card from 'common/components/Card';
import Button from 'common/components/Button';

export default class ChangePassword extends Component {
  static propTypes = {
    change: PropTypes.func,
    valid: PropTypes.bool,
    validate: PropTypes.func,
    error: PropTypes.string,
  };

  state = {
    password: '',
    passwordConfirm: '',
  };

  fieldChanged = ({ target: { id, value } }) => {
    this.setState({
      ...this.state,
      [id]: value,
    });

    this.props.validate(value);
  };

  changePassword = () => {
    this.props.change(this.state.password, this.state.passwordConfirm);
  };

  render () {
    return (
      <span>
        <h2>Password</h2>
        <Card size="small">
          <form onSubmit={this.changePassword}>
            <Textbox
              showStatus
              required
              id="password"
              placeholder="Password"
              type="password"
              value={this.state.password}
              valid={this.props.valid}
              onChange={this.fieldChanged}
            />

            <Textbox
              showStatus
              required
              id="passwordConfirm"
              placeholder="Confirm Password"
              type="password"
              value={this.state.passwordConfirm}
              error={this.props.error}
              valid={this.props.valid}
              onChange={this.fieldChanged}
            />

            <Button
              primary
              disabled={!this.props.valid}
            >
              ADD
            </Button>
          </form>
        </Card>
      </span>
    );
  }
}
