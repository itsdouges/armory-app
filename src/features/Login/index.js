// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import T from 'i18n-react';

import styles from './styles.less';

import Head from 'common/components/Head';
import CardWithTitle from 'common/layouts/CardWithTitle';
import Textbox from 'common/components/Textbox';
import Message from 'common/components/Message';
import Button from 'common/components/Button';
import DisplayAd from 'common/components/DisplayAd';

import { fetchToken } from './actions';

function mapStateToProps(state) {
  return {
    error: state.user.fetchTokenError,
    busy: state.user.fetchingToken,
  };
}

type Props = {
  error?: string,
  busy?: boolean,
  fetchToken: (string, string) => Promise<>,
};

export default connect(
  mapStateToProps,
  {
    fetchToken,
  }
)(
  class Login extends Component<Props, *> {
    props: Props;

    state = {
      email: '',
      password: '',
      canLogin: false,
    };

    fieldChanged = ({ target: { id, value } }: SyntheticInputEvent<*>) => {
      this.setState(prevState => ({
        [id]: value,
        canLogin: prevState.email && prevState.password,
      }));
    };

    login = event => {
      event.preventDefault();

      this.props.fetchToken(this.state.email, this.state.password);
    };

    render() {
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
                label="Email"
                value={this.state.email}
                onChange={this.fieldChanged}
              />

              <Textbox
                required
                id="password"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.fieldChanged}
              />

              <div className={styles.buttons}>
                <Button type="primary" busy={this.props.busy} disabled={!this.state.canLogin}>
                  {T.translate('login.buttons.login')}
                </Button>
              </div>
            </form>

            <Message className={styles.forgotPasswordContainer} type="small">
              <Link to="/forgot-my-password">{T.translate('login.forgotMyPasswordCta')}</Link>
            </Message>
          </CardWithTitle>

          <DisplayAd type="mrec" className={styles.gw2Sale} />
        </div>
      );
    }
  }
);
