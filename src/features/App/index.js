// @flow

import type { SubmitNotification } from './app.reducer';

import 'normalize.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import '../../styles.less';
import styles from './styles.less';

import withScroll from 'common/decorators/scrollTopOnMount';
import authenticatedRoute from 'features/Auth/route';

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

const HomeWithScroll = withScroll(Home);
const LoginWithScroll = withScroll(Login);
const JoinWithScroll = withScroll(Join);
const UserWithScroll = withScroll(User);
const ForgotMyPasswordWithScroll = withScroll(ForgotMyPassword);
const GuildWithScroll = withScroll(Guild);
const SettingsWithScroll = withScroll(authenticatedRoute(Settings));
const EmbedsWithScroll = withScroll(Embeds);
const CharacterWithScroll = withScroll(Character);
const SearchWithScroll = withScroll(Search);
const NotFoundWithScroll = withScroll(NotFound);
const StatisticsWithScroll = withScroll(Statistics);
const LeaderboardsWithScroll = withScroll(Leaderboards);

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
          <Route exact path="/" component={HomeWithScroll} />
          <Route exact path="/embeds" component={EmbedsWithScroll} />
          <Route exact path="/statistics" component={StatisticsWithScroll} />
          <Route exact path="/login" component={LoginWithScroll} />
          <Route exact path="/join" component={JoinWithScroll} />
          <Route exact path="/search/:term" component={SearchWithScroll} />
          <Route exact path="/settings" component={SettingsWithScroll} />
          <Route exact path="/forgot-my-password" component={ForgotMyPasswordWithScroll} />
          <Route exact path="/404" component={NotFoundWithScroll} />
          <Route path="/leaderboards/pvp" component={LeaderboardsWithScroll} />
          <Route path="/g/:guildName" component={GuildWithScroll} />
          <Route path="/:alias/c/:character" component={CharacterWithScroll} />
          <Route path="/:alias" component={UserWithScroll} />
        </Switch>

        <NotificationBox className={styles.notificationBox} />
        <Footer />
      </div>
    );
  }
}
