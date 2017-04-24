// @flow

import axios from 'axios';
import config from 'config';
import { browserHistory } from 'react-router';
import { paginatedThunk } from 'lib/redux';

export const FETCHING_GUILD = 'FETCHING_GUILD';
export const SELECT_GUILD = 'SELECT_GUILD';
export const FETCH_GUILD_RESULT = 'FETCH_GUILD_RESULT';
export const FETCH_GUILD_LOGS = 'FETCH_GUILD_LOGS';
export const FETCH_GUILD_MEMBERS = 'FETCH_GUILD_MEMBERS';
export const FETCH_GUILD_CHARACTERS = 'FETCH_GUILD_CHARACTERS';

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

const fetchGuildLogsResult = (name: string, data) => ({
  type: FETCH_GUILD_LOGS,
  payload: {
    name,
    data,
  },
});

const fetchGuildMembersResult = (name: string, data) => ({
  type: FETCH_GUILD_MEMBERS,
  payload: {
    name,
    data,
  },
});

const fetchGuildCharactersResult = (name: string, data) => ({
  type: FETCH_GUILD_CHARACTERS,
  payload: {
    name,
    data,
  },
});

export const fetchGuildLogs = (name: string) => (dispatch: Dispatch) => axios
  .get(`${config.api.endpoint}guilds/${name}/logs`)
  .then((response) => {
    dispatch(fetchGuildLogsResult(name, response.data));
  });

export function fetchGuildMembers (name: string, limit: number, offset: number) {
  return paginatedThunk((dispatch: Dispatch) => {
    return axios.get(`${config.api.endpoint}guilds/${name}/members`, {
      params: {
        limit,
        offset,
      },
    })
    .then((response) => {
      dispatch(fetchGuildMembersResult(name, response.data));
    });
  }, `guilds[${name}].members`, limit, offset);
}

export function fetchGuildCharacters (name: string, limit: number, offset: number) {
  return paginatedThunk((dispatch: Dispatch) => {
    return axios.get(`${config.api.endpoint}guilds/${name}/characters`, {
      params: {
        limit,
        offset,
      },
    })
    .then((response) => {
      dispatch(fetchGuildCharactersResult(name, response.data));
    });
  }, `guilds[${name}].characters`, limit, offset);
}

export const fetchGuild = (name: string) => (dispatch: Dispatch) => {
  dispatch(fetchingGuild(true));

  return axios.get(`${config.api.endpoint}guilds/${name}`)
    .then((response) => {
      dispatch(fetchGuildResult(name, response.data));
      dispatch(fetchingGuild(false));
    }, () => browserHistory.replace('/404'));
};
