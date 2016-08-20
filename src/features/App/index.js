import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import 'normalize.css';
import 'assets/fonts/menomonia.css';
import styles from './styles.less';

import Footer from './components/Footer';
import Header from './components/Header';
import Tooltip from 'common/components/Tooltip';

const selector = createSelector(
  store => store.user.alias,
  store => store.user.loggedIn,
  (userAlias, userAuthenticated) => ({
    userAlias,
    userAuthenticated,
  })
);

class App extends Component {
  static propTypes = {
    children: PropTypes.any,
    userAuthenticated: PropTypes.bool,
    userAlias: PropTypes.string,
    userToken: PropTypes.string,
  };

  static childContextTypes = {
    userAlias: PropTypes.string,
  };

  getChildContext () {
    return {
      userAlias: this.props.userAlias,
    };
  }

  render () {
    return (
      <div className={styles.app}>
        <Header
          authenticated={this.props.userAuthenticated}
          alias={this.props.userAlias}
        />

        {this.props.children}

        <Tooltip />
        <Footer />
      </div>
    );
  }
}

export default connect(selector)(App);
