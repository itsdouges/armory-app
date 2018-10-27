// @flow

import 'babel-polyfill';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import PageView from 'common/components/PageView';
// Base has to be imported before the app because of the
// dynamic creation of the redux reducers.
import Base from './Base';
import App from 'features/App';
import authenticatedApp from 'features/Auth/app';

import history from './lib/history';
import bootstrapTooltip from 'lib/tooltip';
import attachFastClick from 'fastclick';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Base>
    <Router history={history}>
      <PageView>
        <Route path="/" component={authenticatedApp(App)} />
      </PageView>
    </Router>
  </Base>,
  document.getElementById('root')
);

attachFastClick.attach(document.body);
bootstrapTooltip();
registerServiceWorker();
