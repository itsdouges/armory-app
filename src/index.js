import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.less';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'features/reducer';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import Routes from './routes';

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
    <Routes />
  </Provider>,
  document.getElementById('root')
);
