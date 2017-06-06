// @flow

import type { AuthenticatedUser } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import T from 'i18n-react';
import debounce from 'lodash/debounce';
import qs from 'lib/qs';

import styles from './styles.less';

import Head from 'common/components/Head';
import CardWithTitle from 'common/layouts/CardWithTitle';
import Textbox from 'common/components/Textbox';
import Button from 'common/components/Button';
import PasswordForm from 'common/components/PasswordForm';
import DisplayAd from 'common/components/DisplayAd';

import {
  register,
  validateEmail,
  validateAlias,
  validatePasswords,
} from './actions';

import { validateGw2Token } from 'features/Settings/actions';

import { selector } from './user.reducer';

type State = {
  email: string,
  alias: string,
  password: string,
  passwordConfirm: string,
  claimingUser?: string,
  apiToken: string,
};

type Props = {
  route: {},
  dispatch: () => void,
  user: AuthenticatedUser,
  canRegister: boolean,
  validateEmail: (string) => void,
  validateAlias: (string) => void,
  validatePasswords: (string, string) => void,
  validateGw2Token: (string) => void,
  register: (State) => void,
};

type FieldChanged = {
  target: {
    id: string,
    value: string,
  },
};

@connect(selector, {
  validateEmail,
  validateAlias,
  validatePasswords,
  validateGw2Token,
  register,
})
export default class Join extends Component {
  props: Props;
  state: State = {
    email: '',
    alias: '',
    password: '',
    passwordConfirm: '',
    apiToken: '',
  };

  componentWillMount () {
    this.setState({
      claimingUser: qs('claiming'),
    });
  }

  fieldChanged = ({ target: { id, value } }: FieldChanged) => {
    const newState = {
      ...this.state,
      [id]: value,
    };

    const passwordChanged = id.indexOf('password') >= 0;
    const methodName = passwordChanged ? 'password' : id;
    const args = passwordChanged
      ? [newState.password, newState.passwordConfirm]
      : [value];

    // $FlowFixMe
    this[`check${methodName[0].toUpperCase() + methodName.slice(1)}`](...args);
    this.setState(newState);
  };

  checkApiToken = (value: string) => {
    this.props.validateGw2Token(value);
  };

  checkEmail = debounce((value: string) => {
    if (!value.trim()) {
      return;
    }

    this.props.validateEmail(value);
  }, 300);

  checkAlias = debounce((value: string) => {
    if (!value.trim()) {
      return;
    }

    this.props.validateAlias(value);
  }, 300);

  checkPassword = debounce(
    (password: string, passwordConfirm: string) =>
      this.props.validatePasswords(password, passwordConfirm),
      300
  );

  register = (event: SyntheticEvent) => {
    event.preventDefault();

    this.props.register(this.state);
  };

  render () {
    const { claimingUser, apiToken, alias, password, email, passwordConfirm } = this.state;
    const { user, canRegister } = this.props;

    const formValid = claimingUser
      ? this.props.user.validGw2Token && canRegister
      : canRegister;

    return (
      <div className={styles.root}>
        <CardWithTitle
          title={T.translate('join.name')}
          size="medium"
          message={
            <Link to="/login">{T.translate('join.loginCta')}</Link>
          }
        >
          <Head title={T.translate('join.name')} />
          <form onSubmit={this.register}>
            {claimingUser && (
              <Textbox
                disabled
                id="claiming-user"
                label="Claiming User"
                value={claimingUser}
              />
            )}

            {claimingUser && (
              <Textbox
                showStatus
                required
                id="apiToken"
                label="Api token"
                value={apiToken}
                valid={user.validGw2Token}
                onChange={this.fieldChanged}
                error={user.gw2TokenError}
                busy={user.validatingGw2Token}
              />
            )}

            <Textbox
              showStatus
              required
              id="email"
              label="Email"
              value={email}
              error={user.emailErrors}
              valid={user.emailValid}
              onChange={this.fieldChanged}
            />

            <Textbox
              showStatus
              required
              id="alias"
              label="Alias"
              value={alias}
              error={user.aliasErrors}
              valid={user.aliasValid}
              onChange={this.fieldChanged}
            />

            <PasswordForm
              onFieldChange={this.fieldChanged}
              valid={user.passwordValid}
              passwordValue={password}
              passwordConfirmValue={passwordConfirm}
              error={user.passwordErrors}
            />

            <div className={styles.buttons}>
              <Button
                type="primary"
                busy={user.registering}
                disabled={!formValid}
              >
                {T.translate('join.buttons.join')}
              </Button>
            </div>
          </form>
        </CardWithTitle>

        <DisplayAd type="mrec" className={styles.gw2Sale} />
      </div>
    );
  }
}
