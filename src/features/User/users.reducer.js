import { createSelector } from 'reselect';
import {
  FETCHING_USER,
  FETCHING_USER_RESULT,
  FETCHING_USER_CHARACTERS_RESULT,
  FETCHING_USER_CHARACTERS,
  FETCH_PVP_STATS_RESULT,
  FETCH_PVP_GAMES_RESULT,
  FETCH_PVP_STANDINGS_RESULT,
  SELECT_USER,
} from './actions';

function fetchingUserResult (state, action) {
  const newState = {
    ...state,
  };

  if (!newState.data[action.payload.alias]) {
    newState.data[action.payload.alias] = {};
  }

  newState.data[action.payload.alias] = {
    ...newState.data[action.payload.alias],
    ...action.payload,
  };

  return newState;
}

function fetchingUserCharactersResult (state, action) {
  const newState = {
    ...state,
  };

  if (!newState.data[action.payload.alias]) {
    newState.data[action.payload.alias] = {};
  }

  newState.data[action.payload.alias].characters = action.payload.characters;

  return newState;
}

function fetchPvpStatsResult (state, action) {
  const newState = {
    ...state,
  };

  if (!newState.data[action.payload.alias]) {
    newState.data[action.payload.alias] = {};
  }

  newState.data[action.payload.alias].pvpStats = action.payload.data;

  return newState;
}

function fetchPvpStandingsResult (state, action) {
  const newState = {
    ...state,
  };

  if (!newState.data[action.payload.alias]) {
    newState.data[action.payload.alias] = {};
  }

  newState.data[action.payload.alias].pvpStandings = action.payload.data.reverse();

  return newState;
}

function fetchPvpGamesResult (state, action) {
  const newState = {
    ...state,
  };

  if (!newState.data[action.payload.alias]) {
    newState.data[action.payload.alias] = {};
  }

  newState.data[action.payload.alias].pvpGames = action
    .payload.data.sort((game1, game2) => game1.ended < game2.ended);

  return newState;
}

export const selector = createSelector(
  store => store.users.data[store.users.selected],
  store => store.gw2PvpSeasons,
  (user, pvpSeasons) => ({
    user,
    pvpSeasons,
  })
);

export const defaultState = {
  data: {},
};

export default function reducer (state, action) {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        fetching: action.payload,
      };

    case SELECT_USER:
      return {
        ...state,
        selected: action.payload,
      };

    case FETCHING_USER_RESULT:
      return fetchingUserResult(state, action);

    case FETCHING_USER_CHARACTERS_RESULT:
      return fetchingUserCharactersResult(state, action);

    case FETCHING_USER_CHARACTERS:
      return {
        ...state,
        fetchingCharacters: action.payload,
      };

    case FETCH_PVP_STATS_RESULT:
      return fetchPvpStatsResult(state, action);

    case FETCH_PVP_GAMES_RESULT:
      return fetchPvpGamesResult(state, action);

    case FETCH_PVP_STANDINGS_RESULT:
      return fetchPvpStandingsResult(state, action);

    default:
      return state;
  }
}
