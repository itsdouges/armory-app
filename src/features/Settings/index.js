// @flow

import type { AuthenticatedUser } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { history } from 'Router';
import T from 'i18n-react';

import styles from './styles.less';

import ChangePassword from './components/ChangePassword';
import { selector } from './user.reducer';
import ApiTokens from './components/ApiTokens';

import Head from 'common/components/Head';
import ImageUpload from 'common/components/ImageUpload';
import ContentCard from 'common/components/ContentCard';
import Button from 'common/components/Button';
import { conversion as trackConversion } from 'lib/tracking';

import * as joinActions from 'features/Join/actions';
import * as authActions from 'features/Auth/actions';
import * as actions from './actions';

type Props = {
  router: {},
  user: AuthenticatedUser,
  validateGw2Token: (string) => void,
  addGw2Token: (string) => void,
  fetchGw2Tokens: () => void,
  selectPrimaryGw2Token: (string) => void,
  removeGw2Token: (string) => void,
  changePassword: (string, string) => void,
  validatePasswords: (string, string) => void,
  clearUserData: () => void,
};

type State = {
  subTitle: string,
  updateImage: boolean,
};

@connect(selector, {
  validateGw2Token: actions.validateGw2Token,
  addGw2Token: actions.addGw2Token,
  fetchGw2Tokens: actions.fetchGw2Tokens,
  selectPrimaryGw2Token: actions.selectPrimaryGw2Token,
  removeGw2Token: actions.removeGw2Token,
  changePassword: actions.changePassword,
  clearUserData: authActions.clearUserData,
  validatePasswords: joinActions.validatePasswords,
})
class Settings extends Component {
  props: Props;

  state: State = {
    subTitle: T.translate('settings.avatar.cta'),
    updateImage: false,
  };

  componentWillMount () {
    this.props.fetchGw2Tokens();
    trackConversion();
  }

  setPrimaryToken = (token: string) => {
    this.props.selectPrimaryGw2Token(token);
  };

  validateToken = debounce((token) => {
    if (!token.trim()) {
      return;
    }

    this.props.validateGw2Token(token);
  });

  addToken = (token: string) => {
    this.props.addGw2Token(token);
  };

  removeToken = (token: string) => {
    this.props.removeGw2Token(token);
  };

  signOut = (e: SyntheticEvent) => {
    e.preventDefault();
    history.replace('/');
    this.props.clearUserData();
  };

  validatePasswords = (newPassword: string, newPasswordConfirm: string) => {
    this.props.validatePasswords(newPassword, newPasswordConfirm);
  };

  changePassword = (currentPassword: string, newPassword: string) => {
    this.props.changePassword(currentPassword, newPassword);
  };

  finishedUploading = () => {
    this.setState({
      subTitle: T.translate('settings.avatar.finished'),
      updateImage: true,
    });
  };

  render () {
    const { alias } = this.props.user;
    const { updateImage, subTitle } = this.state;

    const content = {
      alias,
      accountName: subTitle,
    };

    return (
      <span>
        <Head title={T.translate('settings.name')} />

        <ImageUpload
          hintText={<span>{T.translate('settings.avatar.label')}<br />128 x 128</span>}
          uploadName="avatar"
          onUploadComplete={this.finishedUploading}
        >
          <ContentCard
            className={styles.contentCard}
            content={content}
            type="users"
            size="big"
            forceUpdate={updateImage}
          />
        </ImageUpload>

        <div className={styles.spaceBelow}>
          <ApiTokens
            valid={this.props.user.validGw2Token}
            validating={this.props.user.validatingGw2Token}
            tokens={this.props.user.gw2Tokens}
            error={this.props.user.gw2TokenError}
            add={this.addToken}
            remove={this.removeToken}
            validate={this.validateToken}
            setPrimary={this.setPrimaryToken}
            adding={this.props.user.addingGw2Token}
          />
        </div>

        <div className={styles.spaceBelow}>
          <ChangePassword
            valid={this.props.user.passwordValid}
            change={this.changePassword}
            validate={this.validatePasswords}
            error={this.props.user.passwordErrors}
            busy={this.props.user.changingPassword}
            message={this.props.user.passwordSuccess}
          />
        </div>

        <div style={{ textAlign: 'center' }} className={styles.spaceBelow}>
          <Button type="secondary" onClick={this.signOut}>
            {T.translate('settings.buttons.logout')}
          </Button>
        </div>
      </span>
    );
  }
}

export default Settings;
