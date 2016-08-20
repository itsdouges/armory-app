import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import App from 'features/App';
import Home from 'features/Home';
import Login from 'features/Login';
import Join from 'features/Join';
import User from 'features/User';
import Guild from 'features/Guild';
import Settings from 'features/Settings';
import Search from 'features/Search';
import Character from 'features/Character';
import NotFound from 'features/NotFound';
import { authEnabled, authOnly } from 'features/Auth';

const Routes = () => (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={authEnabled(App)}>
      <IndexRoute component={Home} />
      <Redirect from="/in" to="/login" />
      <Redirect from="/me" to="/settings" />
      <Route path="/login" component={Login} />
      <Route path="/join" component={Join} />
      <Route path="/search(/:term)" component={Search} />
      <Route path="/settings" component={authOnly(Settings)} />
      <Route path="/404" component={NotFound} />
      <Route path="/g/:guildName" component={Guild} />
      <Route path="/:alias" component={User} />
      <Redirect from="/:alias/characters" to="/:alias" />
      <Route path="/:alias/characters/:character" component={Character} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;
