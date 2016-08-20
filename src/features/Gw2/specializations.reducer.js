import { clearIfPastStoreInterval, set, get } from 'lib/local-storage';
import {
  FETCHING_SPECIALIZATIONS,
  FETCH_SPECIALIZATIONS_RESULT,
} from './actions';

const LOCAL_SPECS_DATA = 'LOCAL_SPECS_DATA';

clearIfPastStoreInterval(LOCAL_SPECS_DATA);

export const defaultState = JSON.parse(get(LOCAL_SPECS_DATA)) || {};

export default function reducer (state, action) {
  switch (action.type) {
    case FETCHING_SPECIALIZATIONS:
      return {
        ...state,
        fetching: action.payload,
      };

    case FETCH_SPECIALIZATIONS_RESULT: {
      const newState = {
        ...state,
        ...action.payload,
      };


      set(LOCAL_SPECS_DATA, JSON.stringify(newState));

      return newState;
    }

    default:
      return undefined;
  }
}
