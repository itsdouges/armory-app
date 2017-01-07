import { get } from 'axios';
import config from 'config';

export const FETCH_PVP_LEADERBOARD = 'FETCH_PVP_LEADERBOARD';

const fetchPvpLeaderboardSuccess = (data) => ({
  payload: data.slice(0, 250),
  type: FETCH_PVP_LEADERBOARD,
});

export function fetchPvpLeaderboard () {
  return (dispatch) => get(`${config.api.endpoint}leaderboards/pvp`, {
    ignoreAuth: true,
  }).then(({ data }) => dispatch(fetchPvpLeaderboardSuccess(data)));
}
