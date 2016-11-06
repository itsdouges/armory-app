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
      <Redirect from="/me/*" to="/settings" />
      <Route path="/statistics" component={Statistics} />
      <Route path="/login" component={Login} />
      <Route path="/join" component={Join} />
      <Route path="/search(/:term)" component={Search} />
      <Route path="/settings" component={authOnly()(Settings)} />
      <Route path="/forgot-my-password" component={ForgotMyPassword} />
      <Route path="/404" component={NotFound} />
      <Route path="/g/:guildName" component={Guild} />
      <Route path="/:alias" component={User} />
      <Redirect from="/:alias/characters" to="/:alias" />
      <Redirect from="/:alias/c" to="/:alias" />
      <Redirect from="/:alias/characters/:character" to="/:alias/c/:character" />
      <Route path="/:alias/c/:character" component={Character} />
      <Redirect from="/:alias/*" to="/:alias" />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;
