import { combineReducers } from 'redux';

const reducerModules = require.context('./', true, /.\.reducer\.js$/);

const reducers = reducerModules.keys().reduce((acc, key) => {
  const module = reducerModules(key);

  const splitKey = key.split('/');
  const cleanedKey = splitKey[splitKey.length - 1].split('.')[0];

  /* eslint no-param-reassign:0 */
  acc[cleanedKey] = module.default;

  return acc;
}, {});

export default combineReducers(reducers);
