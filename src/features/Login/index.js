import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Head from 'common/components/Head';

import styles from './styles.less';

import Textbox from 'common/components/Textbox';
import Card from 'common/components/Card';
import Message from 'common/components/Message';
import Button from 'common/components/Button';

import { fetchToken } from './actions';

function mapStateToProps (state) {
  return {
    error: state.user.fetchTokenError,
    busy: state.user.fetchingToken,
  };
}

class Login extends Component {
  static propTypes = {
    router: PropTypes.object,
    dispatch: PropTypes.func,
    busy: PropTypes.bool,
    error: PropTypes.string,
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
    const { error } = this.props;

    const message = error || (
      <span>
        Don't have an account? <Link to="/join"><strong>Join us!</strong></Link>
      </span>
    );

    return (
      <span className={styles.root}>
        <Head title="Login" />

        <h2>Login</h2>
        <Card size="small">
          <Message type={error ? 'error' : 'info'}>
            {message}
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
                type="primary"
                busy={this.props.busy}
                disabled={!this.state.canLogin}
              >
                SIGN IN
              </Button>
            </div>
          </form>

          <Message className={styles.forgotPasswordContainer} type="small">
            <Link to="/forgot-my-password">Forgot my password</Link>
          </Message>
        </Card>
      </span>
    );
  }
}

export default connect(mapStateToProps)(Login);
