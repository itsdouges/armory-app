// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import styles from './styles.less';

import Footer from './components/Footer';
import Header from './components/Header';
import Gw2ApiHealth from './components/Gw2ApiHealth';
import config from 'config';

const SnowStorm = config.features.christmas && require('react-snowstorm');

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
};

function shouldForceSmallHeader ({ location }: Props) {
  return location.pathname !== '/';
}

@connect(selector)
export default class App extends Component {
  props: Props;

  state = {
    smallHeader: shouldForceSmallHeader(this.props),
  };

  componentWillReceiveProps (nextProps: Props) {
    this.setState({
      smallHeader: shouldForceSmallHeader(nextProps),
    });
  }

  render () {
    return (
      <div className={styles.app}>
        <Header
          compact={this.state.smallHeader}
          authenticated={this.props.userAuthenticated}
          checkingAuthentication={this.props.checkingAuthentication}
          alias={this.props.userAlias}
        />

        {this.props.children}

        <Gw2ApiHealth />
        <Footer />

        {SnowStorm && <SnowStorm />}
      </div>
    );
  }
}
