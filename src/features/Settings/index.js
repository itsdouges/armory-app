import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selector } from './user.reducer';
import ApiTokens from './components/ApiTokens';
import ChangePassword from './components/ChangePassword';
import debounce from 'lodash/debounce';
import { browserHistory } from 'react-router';
import Head from 'common/components/Head';

import styles from './styles.less';
import ImageUpload from 'common/components/ImageUpload';
import ContentCard from 'common/components/ContentCard';
import Button from 'common/components/Button';

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

class Settings extends Component {
  static propTypes = {
    router: PropTypes.object,
    dispatch: PropTypes.func,
    user: PropTypes.object,
  };

  state = {
    subTitle: 'Click to change your avatar',
    updateImage: false,
  };

  componentWillMount () {
    this.props.dispatch(fetchGw2Tokens());
  }

  setPrimaryToken = (token) => {
    this.props.dispatch(selectPrimaryGw2Token(token));
  };

  validateToken = debounce((token) => {
    if (!token.trim()) {
      return;
    }

    this.props.dispatch(validateGw2Token(token));
  });

  addToken = (token) => {
    this.props.dispatch(addGw2Token(token));
  };

  removeToken = (token) => {
    this.props.dispatch(removeGw2Token(token));
  };

  signOut = (e) => {
    e.preventDefault();
    browserHistory.replace('/');
    this.props.dispatch(clearUserData());
  };

  validatePasswords = (newPassword, newPasswordConfirm) => {
    this.props.dispatch(validatePasswords(newPassword, newPasswordConfirm));
  };

  changePassword = (currentPassword, newPassword) => {
    this.props.dispatch(changePassword(currentPassword, newPassword));
  };

  finishedUploading = () => {
    this.setState({
      subTitle: 'Looking good ;-)',
      updateImage: true,
    });
  };

  render () {
    const { alias, avatar } = this.props.user;
    const { updateImage, subTitle } = this.state;

    const content = {
      alias,
      accountName: subTitle,
      avatar,
    };

    return (
      <span>
        <Head title="Settings" />

        <br />

        <ImageUpload
          hintText={<span>Change your avatar<br />128 x 128</span>}
          uploadName="avatar"
          onUploadComplete={this.finishedUploading}
        >
          <ContentCard content={content} type="users" size="big" forceUpdate={updateImage} />
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
          <Button type="secondary" onClick={this.signOut}>LOGOUT</Button>
        </div>
      </span>
    );
  }
}

export default connect(selector)(Settings);
