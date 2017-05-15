// @flow

import 'babel-polyfill';
import 'lib/i18n';
import 'assets/fonts/menomonia.css';
import 'assets/fonts/opensans.css';

import rootReducer from 'features/reducer';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [
  thunk,
];

if (__DEVELOPMENT__) {
  // TODO: https://github.com/madou/armory-react/issues/243
  // middleware.push(require('redux-freeze'));
}

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(
    ...middleware,
  ),
));

type BaseProps = {
  children?: Element<any>,
};

const Base = ({ children }: BaseProps) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default Base;
