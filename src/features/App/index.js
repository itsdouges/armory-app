import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import styles from './styles.less';
import Footer from './Footer';
import Header from './Header';

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
    user: PropTypes.object,
  };

  getChildContext () {
    return {
      user: {
        authenticated: this.props.userAuthenticated,
        alias: this.props.userAlias,
      },
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

        <Footer />
      </div>
    );
  }
}

export default connect(selector)(App);
