// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import 'normalize.css';
import '../../styles.less';
import styles from './styles.less';

import Footer from './components/Footer';
import Header from './components/Header';
import NotificationBox from './components/NotificationBox';
import { determineApiHealth } from './actions';

const selector = createSelector(
  (store) => store.user.alias,
  (store) => store.user.loggedIn,
  (store) => store.user.checkingAuthentication,
  (userAlias, userAuthenticated, checkingAuthentication) => ({
    userAlias,
    userAuthenticated,
    checkingAuthentication,
  })
);

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
};

function shouldForceSmallHeader ({ location }: Props) {
  return location.pathname !== '/';
}

@connect(selector, {
  determineApiHealth,
})
export default class App extends Component {
  props: Props;

  state = {
    smallHeader: shouldForceSmallHeader(this.props),
  };

  componentWillMount () {
    this.props.determineApiHealth && this.props.determineApiHealth();
  }

  componentWillReceiveProps (nextProps: Props) {
    this.setState({
      smallHeader: shouldForceSmallHeader(nextProps),
    });
  }

  render () {
    return (
      <div className={styles.root}>
        <Header
          compact={this.state.smallHeader}
          authenticated={this.props.userAuthenticated}
          checkingAuthentication={this.props.checkingAuthentication}
          alias={this.props.userAlias}
        />

        {this.props.children}

        <NotificationBox className={styles.notificationBox} />
        <Footer />
      </div>
    );
  }
}
