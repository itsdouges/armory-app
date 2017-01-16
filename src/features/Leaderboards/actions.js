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

export function fetchPvpLeaderboard (region: 'na' | 'eu' | 'gw2a') {
  return (dispatch) => get(`${config.api.endpoint}leaderboards/pvp/${region}`, {
    ignoreAuth: true,
  }).then(({ data }) => dispatch(fetchPvpLeaderboardSuccess(data, region)));
}
