import { CLEAR_USER_DATA, AUTHENTICATE_USER, CHECKING_AUTHENTICATION } from './actions';

import { setApiToken } from 'lib/http';
import { TOKEN_KEY } from 'features/Login/user.reducer';
import * as ls from 'lib/localStorage';

const ALIAS_KEY = 'USER_ALIAS';

export const defaultState = {
  checkingAuthentication: true,
  token: ls.get(TOKEN_KEY),
  alias: ls.get(ALIAS_KEY),
  ejectHttpAuth: setApiToken(ls.get(TOKEN_KEY)),
};

export default (state, action) => {
  switch (action.type) {
    case CLEAR_USER_DATA:
      state.ejectHttpAuth && state.ejectHttpAuth();
      ls.clear(TOKEN_KEY);
      ls.clear(ALIAS_KEY);

      return {};

    case AUTHENTICATE_USER:
      ls.set(ALIAS_KEY, action.payload.alias);
      state.ejectHttpAuth && state.ejectHttpAuth();

      return {
        ...state,
        ...action.payload,
        ejectHttpAuth: setApiToken(action.payload.token),
        loggedIn: true,
      };

    case CHECKING_AUTHENTICATION:
      return {
        ...state,
        checkingAuthentication: action.payload,
      };

    default:
      return undefined;
  }
};
