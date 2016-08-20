import { get } from 'axios';
import config from 'env';
import { browserHistory } from 'react-router';

export const FETCHING_GUILD = 'FETCHING_GUILD';
export const SELECT_GUILD = 'SELECT_GUILD';
export const FETCH_GUILD_RESULT = 'FETCH_GUILD_RESULT';

const fetchingGuild = (fetching) => ({
  type: FETCHING_GUILD,
  payload: fetching,
});

export const selectGuild = (name) => ({
  type: SELECT_GUILD,
  payload: name,
});

const fetchGuildResult = (name, data) => ({
  type: FETCH_GUILD_RESULT,
  payload: {
    name,
    data,
  },
});

export const fetchGuild = (name) => (dispatch) => {
  dispatch(fetchingGuild(true));

  return get(`${config.api.endpoint}guilds/${name}`)
    .then((response) => {
      dispatch(fetchGuildResult(name, response.data));
      dispatch(fetchingGuild(false));
    }, () => browserHistory.push('/404'));
};
