import {
  FETCHING_GUILD,
  SELECT_GUILD,
  FETCH_GUILD_RESULT,
  FETCH_GUILD_LOGS,
  FETCH_GUILD_MEMBERS,
  FETCH_GUILD_TEAMS,
} from './actions';

import { createSelector } from 'reselect';

export const defaultState = {
  data: {},
  selected: '',
  fetching: false,
};

export const selector = createSelector(
  (store) => store.guilds.data[store.guilds.selected],
  (guild) => ({
    guild,
  })
);

const createReducer = (state, action, rootName) => {
  const previous = state.data[action.payload.name];

  return {
    ...state,
    data: {
      ...state.data,
      [action.payload.name]: {
        ...previous,
        [rootName]: action.payload.data,
      },
    },
  };
};

export default function reducer (state, action) {
  switch (action.type) {
    case FETCHING_GUILD:
      return {
        ...state,
        fetching: action.payload,
      };

    case SELECT_GUILD:
      return {
        ...state,
        selected: action.payload,
      };

    case FETCH_GUILD_RESULT:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: action.payload.data,
        },
      };

    case FETCH_GUILD_LOGS:
      return createReducer(state, action, 'logs');

    case FETCH_GUILD_MEMBERS:
      return createReducer(state, action, 'members');

    case FETCH_GUILD_TEAMS:
      return createReducer(state, action, 'teams');

    default:
      return undefined;
  }
}
