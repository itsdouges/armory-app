// @flow

import axios from 'axios';
import config from 'config';
import { browserHistory } from 'react-router';

export const FETCHING_GUILD = 'FETCHING_GUILD';
export const SELECT_GUILD = 'SELECT_GUILD';
export const FETCH_GUILD_RESULT = 'FETCH_GUILD_RESULT';

const fetchingGuild = (fetching: boolean) => ({
  type: FETCHING_GUILD,
  payload: fetching,
});

export const selectGuild = (name: string) => ({
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

export const fetchGuild = (name: string) => (dispatch: Dispatch) => {
  dispatch(fetchingGuild(true));

  return axios.get(`${config.api.endpoint}guilds/${name}`)
    .then((response) => {
      dispatch(fetchGuildResult(name, response.data));
      dispatch(fetchingGuild(false));
    }, () => browserHistory.replace('/404'));
};
