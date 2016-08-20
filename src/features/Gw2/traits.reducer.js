import { clearIfPastStoreInterval, set, get } from 'lib/local-storage';
import {
  FETCHING_TRAITS,
  FETCH_TRAITS_RESULT,
} from './actions';

const LOCAL_TRAITS_DATA = 'LOCAL_TRAITS_DATA';

clearIfPastStoreInterval(LOCAL_TRAITS_DATA);

export const defaultState = JSON.parse(get(LOCAL_TRAITS_DATA)) || {};

export default function reducer (state, action) {
  switch (action.type) {
    case FETCHING_TRAITS:
      return {
        ...state,
        fetching: !!action.payload,
      };

    case FETCH_TRAITS_RESULT: {
      const newState = {
        ...state,
        ...action.payload,
      };

      set(LOCAL_TRAITS_DATA, JSON.stringify(newState));

      return newState;
    }

    default:
      return undefined;
  }
}
