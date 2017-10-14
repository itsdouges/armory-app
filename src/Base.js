// @flow

import type { Node } from 'react';

import './publicPath';
import React from 'react';
import { get as getLang } from 'lib/i18n';
// $FlowFixMe
import '!!style-loader!css-loader!armory-component-ui/styles.css'; // eslint-disable-line

import { initialise as initialiseLs } from 'lib/localStorage';
import rootReducer from 'features/reducer';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { LanguageProvider } from 'armory-component-ui';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [
  thunk,
];

if (__DEVELOPMENT__) {
  middleware.push(require('redux-freeze'));
}

initialiseLs();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(
    ...middleware,
  ),
));

type BaseProps = {
  children: Node,
};

const Base = ({ children }: BaseProps) => (
  <Provider store={store}>
    <LanguageProvider lang={getLang()}>
      {children}
    </LanguageProvider>
  </Provider>
);

export default Base;
