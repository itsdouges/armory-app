import { clearIfPastStoreInterval, set, get } from 'lib/local-storage';
import { generateActions } from './actions';

export default function gw2ReducerFactory (resourceName, getResource, customResultReducer) {
  const LS_KEY = `LOCAL-${resourceName}-DATA`;
  const { fetching, result } = generateActions(resourceName, getResource);

  clearIfPastStoreInterval(LS_KEY);

  return {
    reducer: (state, action) => {
      switch (action.type) {
        case fetching:
          return {
            ...state,
            fetching: action.payload,
          };

        case result: {
          const newState = {
            ...state,
            ...customResultReducer ? customResultReducer(action.payload) : action.payload,
          };

          set(LS_KEY, JSON.stringify(newState));

          return newState;
        }

        default:
          return undefined;
      }
    },
    defaultState: JSON.parse(get(LS_KEY)) || {},
  };
}
