import { FETCH_PVP_LEADERBOARD } from './actions';

export const defaultState = {
  pvp: {},
};

export default (state, action) => {
  switch (action.type) {
    case FETCH_PVP_LEADERBOARD: {
      const leaderboard = state.pvp[action.payload.region] || {};
      const newLeaderboard = {
        ...leaderboard,
        ...action.payload.data,
        rows: (leaderboard.rows || []).concat(action.payload.data.rows),
      };

      return {
        ...state,
        pvp: {
          name: newLeaderboard.name,
          ...state.pvp,
          [action.payload.region]: newLeaderboard,
        },
      };
    }

    default:
      return undefined;
  }
};
