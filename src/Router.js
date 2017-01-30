// @flow

import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import { pageView } from 'lib/tracking';

import App from 'features/App';
import Home from 'features/Home';
import Login from 'features/Login';
import Join from 'features/Join';
import User from 'features/User';
import ForgotMyPassword from 'features/ForgotMyPassword';
import Guild from 'features/Guild';
import Settings from 'features/Settings';
import Search from 'features/Search';
import Character from 'features/Character';
import NotFound from 'features/NotFound';
import Statistics from 'features/Statistics';
import Leaderboards from 'features/Leaderboards';
// import EmbedExamples from 'features/EmbedExamples';
import { authEnabled, authOnly } from 'features/Auth';

function onRouteUpdate () {
  window.scrollTo(0, 0);
  pageView();
}

const Routes = () => (
  <Router onUpdate={onRouteUpdate} history={browserHistory}>
    <Route path="/" component={authEnabled()(App)}>
      <IndexRoute component={Home} />

      <Redirect from="/in" to="/login" />
      <Redirect from="/me" to="/settings" />
      <Redirect from="/stats" to="/statistics" />
      <Redirect from="/leaderboards" to="/leaderboards/pvp" />
      <Redirect from="/me/*" to="/settings" />
      <Redirect from="/g/:guildName/" to="/g/:guildName" />
      <Redirect from="/g/:guildName(/:subRoute)/" to="/g/:guildName(/:subRoute)" />
      <Redirect from="/:alias/" to="/:alias" />
      <Redirect from="/:alias/c" to="/:alias/characters" />
      <Redirect from="/:alias(/:subRoute)/" to="/:alias(/:subRoute)" />
      <Redirect from="/:alias/characters/:character" to="/:alias/c/:character" />

      {/* <Route path="/embeds" component={EmbedExamples} /> */}
      <Route path="/statistics" component={Statistics} />
      <Route path="/login" component={Login} />
      <Route path="/join" component={Join} />
      <Route path="/search(/:term)" component={Search} />
      <Route path="/settings" component={authOnly()(Settings)} />
      <Route path="/forgot-my-password" component={ForgotMyPassword} />
      <Route path="/leaderboards/:type(/:region)" component={Leaderboards} />
      <Route path="/404" component={NotFound} />
      <Route path="/g/:guildName" component={Guild} />
      <Route path="/g/:guildName(/:subRoute)" component={Guild} />
      <Route path="/:alias" component={User} />
      <Route path="/:alias(/:subRoute)" component={User} />
      <Route path="/:alias/c/:character" component={Character} />

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;
