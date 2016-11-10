// @flow

import rootReducer from 'features/reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import 'airbnb-js-shims';
import 'normalize.css';

import 'lib/i18n';
import 'assets/fonts/menomonia.css';
import './styles.less';

const middlewares = [thunk];

if (__DEVELOPMENT__) {
  middlewares.push(createLogger());
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

type BaseProps = {
  children?: Element<any>,
};

const Base = ({ children }: BaseProps) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default Base;
