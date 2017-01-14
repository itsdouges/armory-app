import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import T from 'i18n-react';

import styles from './styles.less';

import Head from 'common/components/Head';
import CardWithTitle from 'common/layouts/CardWithTitle';
import Textbox from 'common/components/Textbox';
import Message from 'common/components/Message';
import Button from 'common/components/Button';
import AffiliateAd from 'common/components/AffiliateAd';

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

    const message = error || <Link to="/join">{T.translate('login.joinCta')}</Link>;

    return (
      <div className={styles.root}>
        <CardWithTitle title={T.translate('login.name')} message={message}>
          <Head title={T.translate('login.name')} />

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
                {T.translate('login.buttons.login')}
              </Button>
            </div>
          </form>

          <Message className={styles.forgotPasswordContainer} type="small">
            <Link to="/forgot-my-password">{T.translate('login.forgotMyPasswordCta')}</Link>
          </Message>
        </CardWithTitle>

        <AffiliateAd className={styles.gw2Sale} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
