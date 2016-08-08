import { clearIfPastStoreInterval, set, get } from 'lib/local-storage';
import {
  FETCHING_ITEMS,
  FETCH_ITEMS_RESULT,
} from './actions';

const LOCAL_ITEMS_DATA = 'LOCAL_ITEMS_DATA';

clearIfPastStoreInterval(LOCAL_ITEMS_DATA);

export const defaultValue = JSON.parse(get(LOCAL_ITEMS_DATA)) || {};

export default function reducer (state, action) {
  switch (action.type) {
    case FETCHING_ITEMS:
      return {
        ...state,
        fetching: action.payload,
      };

    case FETCH_ITEMS_RESULT: {
      const newState = {
        ...state,
        ...action.payload,
      };

      set(LOCAL_ITEMS_DATA, JSON.stringify(newState));

      return newState;
    }

    default:
      return undefined;
  }
}
