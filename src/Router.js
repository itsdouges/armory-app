// @flow

import createHistory from 'history/createBrowserHistory'
import { Router, Route, Switch } from 'react-router-dom';

import { pageView } from 'lib/tracking';

import App from 'features/App';
import authenticatedApp from 'features/Auth/app';

function onRouteUpdate () {
  window.scrollTo(0, 0);
  pageView();
}

export const history = createHistory();

const Routes = () => (
  <Router history={history} onUpdate={onRouteUpdate}>
    <Switch>
      <Route path="/" component={authenticatedApp(App)} />
    </Switch>
  </Router>
);

export default Routes;
