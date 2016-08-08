import { clearIfPastStoreInterval, set, get } from 'lib/local-storage';
import {
  FETCHING_SKINS,
  FETCH_SKINS_RESULT,
} from './actions';

const LOCAL_SKINS_DATA = 'LOCAL_SKINS_DATA';

clearIfPastStoreInterval(LOCAL_SKINS_DATA);

export const defaultValue = JSON.parse(get(LOCAL_SKINS_DATA)) || {};

export default function reducer (state, action) {
  switch (action.type) {
    case FETCHING_SKINS:
      return {
        ...state,
        fetching: !!action.payload,
      };

    case FETCH_SKINS_RESULT: {
      const newState = {
        ...state,
        ...action.payload,
      };

      set(LOCAL_SKINS_DATA, JSON.stringify(newState));

      return newState;
    }

    default:
      return undefined;
  }
}
