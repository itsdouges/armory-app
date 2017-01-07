import {
  FETCH_PVP_LEADERBOARD,
} from './actions';

export const defaultState = {
  pvp: [],
};

export default (state, action) => {
  switch (action.type) {
    case FETCH_PVP_LEADERBOARD:
      return {
        ...state,
        pvp: action.payload,
      };

    default:
      return undefined;
  }
};
