import {
  FETCHING_GUILD,
  SELECT_GUILD,
  FETCH_GUILD_RESULT,
  FETCH_GUILD_LOGS,
  FETCH_GUILD_MEMBERS,
  FETCH_GUILD_CHARACTERS,
  UPDATE_GUILD_PRIVACY,
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

    case FETCH_GUILD_LOGS: {
      const previous = state.data[action.payload.name];

      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: {
            ...previous,
            logs: action.payload.data,
          },
        },
      };
    }

    case FETCH_GUILD_CHARACTERS: {
      const previous = state.data[action.payload.name] || {
        characters: {},
      };

      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: {
            ...previous,
            characters: {
              ...previous.characters,
              ...action.payload.data,
              rows: ((previous.characters || {}).rows || []).concat(action.payload.data.rows),
            },
          },
        },
      };
    }

    case FETCH_GUILD_MEMBERS: {
      const previous = state.data[action.payload.name] || {
        members: {},
      };

      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: {
            ...previous,
            members: {
              ...previous.members,
              ...action.payload.data,
              rows: ((previous.members || {}).rows || []).concat(action.payload.data.rows),
            },
          },
        },
      };
    }

    case UPDATE_GUILD_PRIVACY: {
      const newCharacter = {
        ...state.data[action.payload.name],
        privacy: action.payload.action === 'add'
          ? state.data[action.payload.name].privacy.concat([action.payload.prop])
          : state.data[action.payload.name].privacy.filter((priv) => priv !== action.payload.prop),
      };

      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: newCharacter,
        },
      };
    }

    default:
      return undefined;
  }
}
