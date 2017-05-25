// @flow

import type { SubmitNotification } from './app.reducer';

import 'normalize.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import '../../styles.less';
import styles from './styles.less';

import Home from 'features/Home';
import Login from 'features/Login';
import Join from 'features/Join';
import User from 'features/User';
import ForgotMyPassword from 'features/ForgotMyPassword';
import Guild from 'features/Guild';
import Settings from 'features/Settings';
import Embeds from 'features/Embeds';
import Search from 'features/Search';
import Character from 'features/Character';
import NotFound from 'features/NotFound';
import Statistics from 'features/Statistics';
import Leaderboards from 'features/Leaderboards';
import authenticatedRoute from 'features/Auth/route';
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

        <Switch>
          <Route exact path="/embeds" component={Embeds} />
          <Route exact path="/statistics" component={Statistics} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/search/:term" component={Search} />
          <Route exact path="/settings" component={authenticatedRoute(Settings)} />
          <Route exact path="/forgot-my-password" component={ForgotMyPassword} />
          <Route exact path="/leaderboards/:type" component={Leaderboards} />
          <Route exact path="/leaderboards/:type/:region" component={Leaderboards} />
          <Route exact path="/404" component={NotFound} />
          <Route path="/g/:guildName" component={Guild} />
          <Route path="/:alias" component={User} />
          <Route path="/:alias/c/:character" component={Character} />
          <Route exact path="/" component={Home} />
        </Switch>

        <NotificationBox className={styles.notificationBox} />
        <Footer />
      </div>
    );
  }
}
