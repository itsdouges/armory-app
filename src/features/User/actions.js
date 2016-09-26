import { get } from 'axios';
import { browserHistory } from 'react-router';

import { readPvpSeasonIds } from 'lib/gw2';
import config from 'config';
import actions from 'features/Gw2/actions';

export const FETCHING_USER = 'FETCHING_USER';
export const FETCHING_USER_CHARACTERS = 'FETCHING_USER_CHARACTERS';
export const FETCHING_USER_RESULT = 'FETCHING_USER_RESULT';
export const FETCHING_USER_CHARACTERS_RESULT = 'FETCHING_USER_CHARACTERS_RESULT';
export const FETCH_PVP_STATS_RESULT = 'FETCH_PVP_STATS_RESULT';
export const FETCH_PVP_GAMES_RESULT = 'FETCH_PVP_GAMES_RESULT';
export const FETCH_PVP_STANDINGS_RESULT = 'FETCH_PVP_STANDINGS_RESULT';
export const SELECT_USER = 'SELECT_USER';

const fetchingUser = (fetching) => ({
  type: FETCHING_USER,
  payload: fetching,
});

const fetchUserResult = (user) => ({
  type: FETCHING_USER_RESULT,
  payload: user,
});

const fetchUserCharactersResult = (alias, characters) => ({
  type: FETCHING_USER_CHARACTERS_RESULT,
  payload: {
    alias,
    characters,
  },
});

const fetchingUserCharacters = (fetching) => ({
  type: FETCHING_USER_CHARACTERS,
  payload: fetching,
});

export const fetchUserCharacters = (alias) => (dispatch) => {
  dispatch(fetchingUserCharacters(true));

  return get(`${config.api.endpoint}users/${alias}/characters`)
    .then((response) => {
      dispatch(fetchUserCharactersResult(alias, response.data));
      dispatch(fetchingUserCharacters(false));
    });
};

export const fetchPvpStatsSuccess = (alias, data) => ({
  type: FETCH_PVP_STATS_RESULT,
  payload: {
    alias,
    data,
  },
});

export const fetchPvpGamesSuccess = (alias, data) => ({
  type: FETCH_PVP_GAMES_RESULT,
  payload: {
    alias,
    data,
  },
});

export const fetchPvpStandingsSuccess = (alias, data) => ({
  type: FETCH_PVP_STANDINGS_RESULT,
  payload: {
    alias,
    data,
  },
});

export const selectUser = (alias) => ({
  type: SELECT_USER,
  payload: alias,
});

export const fetchPvpStats = (alias) => (dispatch) =>
  get(`${config.api.endpoint}users/${alias}/pvp/stats`)
  .then((response) => {
    dispatch(fetchPvpStatsSuccess(alias, response.data));
  });

export const fetchPvpGames = (alias) => (dispatch) =>
  get(`${config.api.endpoint}users/${alias}/pvp/games`)
  .then(({ data }) => {
    dispatch(fetchPvpGamesSuccess(alias, data));

    const ids = data.reduce((acc, standing) => acc.concat([standing.map_id]), []);
    dispatch(actions.fetchMaps(ids));
  });

export const fetchPvpStandings = (alias) => (dispatch) =>
  get(`${config.api.endpoint}users/${alias}/pvp/standings`)
  .then(({ data }) => {
    dispatch(fetchPvpStandingsSuccess(alias, data));
    return readPvpSeasonIds();
  })
  .then((ids) => dispatch(actions.fetchPvpSeasons(ids)));

export const fetchUser = (alias) => (dispatch) => {
  dispatch(fetchingUser(true));
  dispatch(fetchPvpStandings(alias));
  dispatch(fetchPvpGames(alias));
  dispatch(fetchPvpStats(alias));

  return get(`${config.api.endpoint}users/${alias}`)
    .then((response) => {
      dispatch(fetchUserResult(response.data));
      dispatch(fetchingUser(false));
    }, ({ response: { status } }) => status === 404 && browserHistory.replace('/404'));
};
