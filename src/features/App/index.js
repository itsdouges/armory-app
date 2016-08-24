import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Title from 'react-title-component';

import 'normalize.css';
import 'assets/fonts/menomonia.css';
import styles from './styles.less';

import Footer from './components/Footer';
import Header from './components/Header';
import Gw2ApiHealth from './components/Gw2ApiHealth';
import Tooltip from 'common/components/Tooltip';

const selector = createSelector(
  store => store.user.alias,
  store => store.user.loggedIn,
  store => store.user.checkingAuthentication,
  (userAlias, userAuthenticated, checkingAuthentication) => ({
    userAlias,
    userAuthenticated,
    checkingAuthentication,
  })
);

/* eslint react/prefer-stateless-function:0 */
class App extends Component {
  static propTypes = {
    children: PropTypes.any,
    userAuthenticated: PropTypes.bool,
    userAlias: PropTypes.string,
    userToken: PropTypes.string,
    checkingAuthentication: PropTypes.bool,
  };

  render () {
    return (
      <span>
        <Gw2ApiHealth />
        <div className={styles.app}>
          <Title render=" | Guild Wars 2 Armory" />

          <Header
            authenticated={this.props.userAuthenticated}
            checkingAuthentication={this.props.checkingAuthentication}
            alias={this.props.userAlias}
          />

          {this.props.children}

          <Tooltip />
          <Footer />
        </div>
      </span>
    );
  }
}

export default connect(selector)(App);
