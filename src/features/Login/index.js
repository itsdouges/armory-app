import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import styles from './styles.less';

import Title from 'react-title-component';
import Textbox from 'common/components/Textbox';
import Card from 'common/components/Card';
import Message from 'common/components/Message';
import Button from 'common/components/Button';

import { fetchToken } from './actions';

class Login extends Component {
  static propTypes = {
    router: PropTypes.object,
    dispatch: PropTypes.func,
  };

  state = {
    email: '',
    password: '',
    canLogin: false,
  };

  fieldChanged = ({ target: { id, value } }) => {
    const newState = {
      ...this.state,
      [id]: value,
    };

    const canLogin = newState.email && newState.password;
    newState.canLogin = canLogin;

    this.setState(newState);
  };

  login = (event) => {
    event.preventDefault();

    this.props.dispatch(fetchToken(this.state.email, this.state.password));
  };

  render () {
    return (
      <span>
        <Title render={(title) => `Login${title}`} />

        <h2>Login</h2>
        <Card size="small">
          <Message>
            Need an account? <Link to="/join"><strong>Make one!</strong></Link>
          </Message>

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
              id="password"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.fieldChanged}
            />

            <div className={styles.buttons}>
              <Button
                primary
                disabled={!this.state.canLogin}
              >
                SIGN IN
              </Button>
            </div>
          </form>
        </Card>
      </span>
    );
  }
}

export default connect(undefined)(Login);
