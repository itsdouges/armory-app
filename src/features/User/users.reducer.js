import { reduceById } from 'lib/reduce';

import {
  FETCHING_USER,
  FETCHING_USER_RESULT,
  FETCHING_USER_CHARACTERS_RESULT,
  FETCHING_USER_CHARACTERS,
  FETCH_PVP_STATS_RESULT,
  FETCH_PVP_GAMES_RESULT,
  FETCH_PVP_STANDINGS_RESULT,
  FETCH_USER_ACHIEVEMENTS_RESULT,
  FETCH_SHARED_INVENTORY_RESULT,
  FETCH_BANK_RESULT,
  SELECT_USER,
  UPDATE_USER_PRIVACY,
  FETCH_WALLET_RESULT,
} from './actions';

function fetchingUserResult(state, action) {
  const newState = {
    ...state,
  };

  const oldUser = newState.data[action.payload.alias];

  newState.data[action.payload.alias] = {
    ...oldUser,
    ...action.payload,
  };

  return newState;
}

function fetchAchievementsResult(state, action) {
  const newState = {
    ...state,
  };

  const oldUser = newState.data[action.payload.alias];

  newState.data[action.payload.alias] = {
    ...oldUser,
    ...action.payload,
    achievementsMap: reduceById(action.payload.achievements),
  };

  return newState;
}

function fetchingUserCharactersResult(state, action) {
  const newState = {
    ...state,
  };

  const oldUser = newState.data[action.payload.alias];

  newState.data[action.payload.alias] = {
    ...oldUser,
    characters: action.payload.characters,
  };

  return newState;
}

const fetchGenericResult = (key, transform) => (state, action) => {
  const newState = {
    ...state,
  };

  const oldUser = newState.data[action.payload.alias];
  const data = transform ? transform(action.payload.data) : action.payload.data;

  newState.data[action.payload.alias] = {
    ...oldUser,
    [key]: data,
  };

  return newState;
};

function fetchPvpStatsResult(state, action) {
  const newState = {
    ...state,
  };

  const oldUser = newState.data[action.payload.alias];

  newState.data[action.payload.alias] = {
    ...oldUser,
    pvpStats: action.payload.data,
  };

  return newState;
}

function fetchPvpStandingsResult(state, action) {
  const newState = {
    ...state,
  };

  const oldUser = newState.data[action.payload.alias];

  newState.data[action.payload.alias] = {
    ...oldUser,
    pvpStandings: action.payload.data.reverse(),
  };

  return newState;
}

function fetchPvpGamesResult(state, action) {
  const newState = {
    ...state,
  };

  const oldUser = newState.data[action.payload.alias];

  newState.data[action.payload.alias] = {
    ...oldUser,
    pvpGames: action.payload.data.sort((game1, game2) => game1.ended < game2.ended),
  };

  return newState;
}

export const defaultState = {
  data: {},
  selected: '',
  fetching: false,
};

export default function reducer(state, action) {
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

    case FETCH_USER_ACHIEVEMENTS_RESULT:
      return fetchAchievementsResult(state, action);

    case FETCH_BANK_RESULT:
      return fetchGenericResult('bank')(state, action);

    case FETCH_SHARED_INVENTORY_RESULT:
      return fetchGenericResult('sharedInventory')(state, action);

    case FETCH_WALLET_RESULT:
      return fetchGenericResult('wallet')(state, action);

    case 'FETCH_USER_MATERIALS_RESULT':
      return fetchGenericResult('materials', reduceById)(state, action);

    case UPDATE_USER_PRIVACY: {
      const newUser = {
        ...state.data[action.payload.name],
        privacy:
          action.payload.action === 'add'
            ? state.data[action.payload.name].privacy.concat([action.payload.prop])
            : state.data[action.payload.name].privacy.filter(priv => priv !== action.payload.prop),
      };

      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: newUser,
        },
      };
    }

    default:
      return state;
  }
}
