// @flow

import 'airbnb-js-shims';
import 'normalize.css';
import 'lib/i18n';
import 'assets/fonts/menomonia.css';
import 'assets/fonts/opensans.css';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import rootReducer from 'features/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
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
