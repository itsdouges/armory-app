// @flow

import 'babel-polyfill';
import 'normalize.css';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import PageView from 'common/components/PageView';
// Base has to be imported before the app because of the
// dynamic creation of the redux reducers.
import Base from './Base';
import App from 'features/App';
import authenticatedApp from 'features/Auth/app';

import history from './history';
import bootstrapTooltip from 'lib/tooltip';
import attachFastClick from 'fastclick';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Base>
    <Router history={history}>
      <PageView>
        <Switch>
          <Route path="/" component={authenticatedApp(App)} />
        </Switch>
      </PageView>
    </Router>
  </Base>,
  document.getElementById('root')
);

attachFastClick.attach(document.body);
bootstrapTooltip();
registerServiceWorker();
