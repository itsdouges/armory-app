// @flow

import { get } from 'axios';
import config from 'config';
import { paginatedThunk } from 'lib/redux';

export const FETCH_PVP_LEADERBOARD = 'FETCH_PVP_LEADERBOARD';

const fetchPvpLeaderboardSuccess = (data, region) => ({
  payload: {
    data,
    region,
  },
  type: FETCH_PVP_LEADERBOARD,
});

export function fetchPvpLeaderboard (region: 'na' | 'eu' | 'gw2a', limit: number, offset: number) {
  return paginatedThunk((dispatch: Dispatch) => {
    return get(`${config.api.endpoint}leaderboards/pvp/${region}`, {
      params: {
        limit,
        offset,
      },
    })
    .then(({ data }) => dispatch(fetchPvpLeaderboardSuccess(data, region)));
  }, `leaderboards.pvp[${region}]`, limit, offset);
}
