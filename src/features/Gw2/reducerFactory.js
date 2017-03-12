import { clearIfPastStoreInterval, set, get } from 'lib/localStorage';
import { generateActions } from './actions';

export default function gw2ReducerFactory (resourceName, getResource, {
  afterGet,
} = {}) {
  const LS_KEY = `${resourceName.toUpperCase()}_DATA`;
  const { fetching, result } = generateActions(resourceName, getResource, afterGet);
  const initialData = get(LS_KEY);

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
            ...action.payload,
          };

          set(LS_KEY, JSON.stringify(newState));

          return newState;
        }

        default:
          return undefined;
      }
    },
    defaultState: {
      ...initialData && JSON.parse(initialData),
      fetching: false,
    },
  };
}
