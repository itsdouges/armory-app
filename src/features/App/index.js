import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Head from 'common/components/Head';

import styles from './styles.less';

import Footer from './components/Footer';
import Header from './components/Header';
import Gw2ApiHealth from './components/Gw2ApiHealth';

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

class App extends Component {
  static propTypes = {
    children: PropTypes.any,
    userAuthenticated: PropTypes.bool,
    userAlias: PropTypes.string,
    userToken: PropTypes.string,
    checkingAuthentication: PropTypes.bool,
    location: PropTypes.object,
  };

  state = {
    simpleHeader: this.props.location.pathname === '/',
  };

  componentWillReceiveProps (nextProps) {
    this.setState({
      simpleHeader: nextProps.location.pathname === '/',
    });
  }

  render () {
    return (
      <span>
        <Gw2ApiHealth />
        <div className={styles.app}>
          <Head />

          <Header
            simple={this.state.simpleHeader}
            authenticated={this.props.userAuthenticated}
            checkingAuthentication={this.props.checkingAuthentication}
            alias={this.props.userAlias}
          />

          {/* Empty div to abuse justify-content: space-between */}
          <div />
          {this.props.children}
          <Footer />
        </div>
      </span>
    );
  }
}

export default connect(selector)(App);
