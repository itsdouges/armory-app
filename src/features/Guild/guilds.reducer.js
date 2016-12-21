import { FETCHING_GUILD, SELECT_GUILD, FETCH_GUILD_RESULT, FETCH_GUILD_LOGS } from './actions';
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

    default:
      return undefined;
  }
}
