// @flow

import { get } from 'axios';
import config from 'config';

export const FETCH_PVP_LEADERBOARD = 'FETCH_PVP_LEADERBOARD';

const fetchPvpLeaderboardSuccess = (data, region) => ({
  payload: {
    data,
    region,
  },
  type: FETCH_PVP_LEADERBOARD,
});

export function fetchPvpLeaderboard (region: 'na' | 'eu' | 'gw2a', limit: number, offset: number) {
  return (dispatch: Dispatch) => get(`${config.api.endpoint}leaderboards/pvp/${region}`, {
    ignoreAuth: true,
    params: {
      limit,
      offset,
    },
  }).then(({ data }) => dispatch(fetchPvpLeaderboardSuccess(data, region)));
}
