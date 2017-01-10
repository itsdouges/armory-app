// @flow

import type { AuthenticatedUser } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { browserHistory } from 'react-router';
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

import { validatePasswords } from 'features/Join/actions';
import { clearUserData } from 'features/Auth/actions';
import {
  validateGw2Token,
  addGw2Token,
  fetchGw2Tokens,
  selectPrimaryGw2Token,
  removeGw2Token,
  changePassword,
} from './actions';

type Props = {
  router: {},
  dispatch: () => void,
  user: AuthenticatedUser,
};

type State = {
  subTitle: string,
  updateImage: boolean,
};

@connect(selector)
class Settings extends Component {
  props: Props;

  state: State = {
    subTitle: T.translate('settings.avatar.cta'),
    updateImage: false,
  };

  componentWillMount () {
    this.props.dispatch(fetchGw2Tokens());
    trackConversion();
  }

  setPrimaryToken = (token: string) => {
    this.props.dispatch(selectPrimaryGw2Token(token));
  };

  validateToken = debounce((token) => {
    if (!token.trim()) {
      return;
    }

    this.props.dispatch(validateGw2Token(token));
  });

  addToken = (token: string) => {
    this.props.dispatch(addGw2Token(token));
  };

  removeToken = (token: string) => {
    this.props.dispatch(removeGw2Token(token));
  };

  signOut = (e: SyntheticEvent) => {
    e.preventDefault();
    browserHistory.replace('/');
    this.props.dispatch(clearUserData());
  };

  validatePasswords = (newPassword: string, newPasswordConfirm: string) => {
    this.props.dispatch(validatePasswords(newPassword, newPasswordConfirm));
  };

  changePassword = (currentPassword: string, newPassword: string) => {
    this.props.dispatch(changePassword(currentPassword, newPassword));
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
