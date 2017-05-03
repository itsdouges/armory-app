// @flow

import type { SubmitNotification } from './app.reducer';

import { Component } from 'react';
import { connect } from 'react-redux';
import 'normalize.css';

import '../../styles.less';
import styles from './styles.less';

import notifications from './notifications';
import Footer from './components/Footer';
import Header from './components/Header';
import NotificationBox from './components/NotificationBox';
import { determineApiHealth, submitNotification } from './actions';

type Props = {
  children?: any,
  userAuthenticated: boolean,
  userAlias: string,
  userToken: string,
  location: {
    pathname: string,
  },
  checkingAuthentication: boolean,
  determineApiHealth?: () => void,
  submitNotification?: SubmitNotification,
};

function shouldForceSmallHeader ({ location }: Props) {
  return location.pathname !== '/';
}

@connect(null, {
  determineApiHealth,
  submitNotification,
})
export default class App extends Component {
  props: Props;

  state = {
    smallHeader: shouldForceSmallHeader(this.props),
  };

  componentWillMount () {
    this.props.determineApiHealth && this.props.determineApiHealth();

    notifications.forEach((notification) => {
      this.props.submitNotification && this.props.submitNotification(
        notification.id,
        notification.message,
        notification.options,
      );
    });
  }

  componentWillReceiveProps (nextProps: Props) {
    this.setState({
      smallHeader: shouldForceSmallHeader(nextProps),
    });
  }

  render () {
    return (
      <div className={styles.root}>
        <Header compact={this.state.smallHeader} />

        {this.props.children}

        <NotificationBox className={styles.notificationBox} />
        <Footer />
      </div>
    );
  }
}
