import {
  CLEAR_USER_DATA,
  AUTHENTICATE_USER,
  CHECKING_AUTHENTICATION,
} from './actions';

import { TOKEN_KEY } from 'features/Login/user.reducer';
import { clear } from 'lib/local-storage';

export const defaultState = {
  checkingAuthentication: true,
};

export default (state, action) => {
  switch (action.type) {
    case CLEAR_USER_DATA:
      clear(TOKEN_KEY);
      return {};

    case AUTHENTICATE_USER:
      return {
        ...state,
        ...action.payload,
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
