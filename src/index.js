import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
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
        <Route path="/in" component={Login} />
        <Route path="/join" component={Join} />
        <Route path="/search(/:term)" component={Search} />
        <Route path="/me" component={authOnly(User)} />
        <Route path="/me/settings" component={authOnly(Settings)} />
        <Route path="/:user" component={User} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
