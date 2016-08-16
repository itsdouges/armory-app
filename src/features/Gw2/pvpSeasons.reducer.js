import { clearIfPastStoreInterval, set, get } from 'lib/local-storage';
import {
  FETCH_PVP_SEASON_RESULT,
} from './actions';

const LOCAL_PVP_SEASON_DATA = 'LOCAL_SKINS_DATA';

clearIfPastStoreInterval(LOCAL_PVP_SEASON_DATA);

export const defaultValue = JSON.parse(get(LOCAL_PVP_SEASON_DATA)) || {};

export default function reducer (state, action) {
  switch (action.type) {
    case FETCH_PVP_SEASON_RESULT: {
      const newState = {
        ...state,
        [action.payload.id]: action.payload,
      };

      set(LOCAL_PVP_SEASON_DATA, JSON.stringify(newState));

      return newState;
    }

    default:
      return undefined;
  }
}
