import { combineReducers } from 'redux';

const reducerModules = require.context('./', true, /.\.reducer\.js$/);

/**
 * Imports all [name].reducer.js found in features.
 *
 * Each [name]ed reducer requires at least one default state.
 *
 * Each reducer should export a default 'reduce' function,
 * and an optional 'defaultState' named export.
 */

const definitions = reducerModules.keys().reduce((acc, key) => {
  const module = reducerModules(key);

  const splitKey = key.split('/');
  const cleanedKey = splitKey[splitKey.length - 1].split('.')[0];

  /* eslint no-param-reassign:0 */
  if (!acc[cleanedKey]) {
    acc[cleanedKey] = {
      reducers: [],
      defaultState: undefined,
    };
  }

  acc[cleanedKey].reducers.push(module.default);

  acc[cleanedKey].defaultState = {
    ...acc[cleanedKey].defaultState,
    ...module.defaultState,
  };

  return acc;
}, {});

const reducers = Object.keys(definitions).reduce((acc, key) => {
  const definition = definitions[key];

  if (__DEVELOPMENT__ && !definition.defaultState) {
    console.error(`DefaultState for ${key} has not been defined.`);
  }

  acc[key] = (state = definition.defaultState, action) => {
    let result;

    definition.reducers.forEach((reducer) => {
      if (result) {
        return;
      }

      result = reducer(state, action);
    });

    return result || state;
  };

  return acc;
}, {});

/* eslint no-console:0 */
if (__DEVELOPMENT__) console.log('IMPORTED REDUCERS: ', reducerModules.keys(), reducers);

export default combineReducers(reducers);
