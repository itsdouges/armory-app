import { FETCH_TOKEN_RESULT, FETCHING_TOKEN } from './actions';

import * as ls from 'lib/localStorage';

export const TOKEN_KEY = 'USER_TOKEN';

export const defaultState = {
  token: ls.get(TOKEN_KEY),
};

export default (state, action) => {
  switch (action.type) {
    case FETCH_TOKEN_RESULT:
      return {
        ...state,
        token: !action.error ? ls.set(TOKEN_KEY, action.payload) || action.payload : undefined,
        fetchTokenError: action.error ? action.payload : undefined,
      };

    case FETCHING_TOKEN:
      return {
        ...state,
        fetchingToken: !!action.payload,
      };

    default:
      return undefined;
  }
};
