import { Component, PropTypes } from 'react';

import Textbox from 'common/components/Textbox';
import Card from 'common/components/Card';
import Button from 'common/components/Button';

class Join extends Component {
  static propTypes = {
    router: PropTypes.object,
  };

  state = {
    email: '',
    alias: '',
    password: '',
    passwordConfirm: '',
    canRegister: false,
  };

  fieldChanged = ({ target: { id, value } }) => {
    const newState = {
      ...this.state,
      [id]: value,
    };

    newState.canRegister = this.validateForm(newState);

    this.setState(newState);
  };

  validateForm({ email, alias, password, passwordConfirm }) {
    return email && alias && password && passwordConfirm && password === passwordConfirm;
  }

  register = (event) => {
    event.preventDefault();
    
    if (!this.state.canRegister) {
      return;
    }

    // do stuff
  };

  render() {
    return (
      <span>
        <h2>Join</h2>
        <Card size="small">
          <form onSubmit={this.login}>
            <Textbox
              required
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.fieldChanged}
            />

            <Textbox
              required
              id="alias"
              placeholder="Alias"
              value={this.state.alias}
              onChange={this.fieldChanged}
            />

            <Textbox
              required
              id="password"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.fieldChanged}
            />

            <Textbox
              required
              id="passwordConfirm"
              placeholder="Confirm Password"
              type="password"
              value={this.state.passwordConfirm}
              onChange={this.fieldChanged}
            />

            <Button primary disabled={!this.state.canRegister}>
              REGISTER
            </Button>
          </form>
        </Card>
      </span>
    );
  }
}

export default Join;
