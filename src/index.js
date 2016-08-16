import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import 'normalize.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'features/reducer';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import './index.less';
import App from 'features/App';
import Home from 'features/Home';
import Login from 'features/Login';
import Join from 'features/Join';
import User from 'features/User';
import Settings from 'features/Settings';
import Search from 'features/Search';
import Character from 'features/Character';
import NotFound from 'features/NotFound';
import { authEnabled, authOnly } from 'features/Auth';

const logger = __DEVELOPMENT__ && createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(...[
    thunk,
    logger,
  ].filter((n) => !!n))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={authEnabled(App)}>
        <IndexRoute component={Home} />
        <Redirect from="/in" to="/login" />
        <Redirect from="/me" to="/settings" />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
        <Route path="/search(/:term)" component={Search} />
        <Route path="/settings" component={authOnly(Settings)} />
        <Route path="/404" component={NotFound} />
        <Route path="/:alias" component={User} />
        <Route path="/:alias/characters/:character" component={Character} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
