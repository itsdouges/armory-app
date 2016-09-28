import { PropTypes } from 'react';
import rootReducer from 'features/reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import 'airbnb-js-shims';

import './styles.less';
import 'normalize.css';
import 'assets/fonts/menomonia.css';

const logger = __DEVELOPMENT__ && createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(...[
    thunk,
    logger,
  ].filter((n) => !!n))
);

const Base = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

Base.propTypes = {
  children: PropTypes.any,
};

export default Base;
