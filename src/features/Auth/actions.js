import { get } from 'axios';
import config from 'config';
import { setApiToken } from 'lib/http';

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const CHECKING_AUTHENTICATION = 'CHECKING_AUTHENTICATION';

let clearApiToken;

export function clearUserData () {
  if (clearApiToken) clearApiToken();

  return {
    type: CLEAR_USER_DATA,
  };
}

function userAuthenticated (user) {
  return {
    type: AUTHENTICATE_USER,
    payload: user,
  };
}

export function checkingAuthentication (checking) {
  return {
    type: CHECKING_AUTHENTICATION,
    payload: checking,
  };
}

export function authenticateUser (token) {
  clearApiToken = setApiToken(token);

  return (dispatch) => {
    dispatch(checkingAuthentication(true));

    get(`${config.api.endpoint}users/me`, {
      headers: {
        Authorization: token,
      },
    })
    .then(({ data }) => {
      dispatch(userAuthenticated(data));
      dispatch(checkingAuthentication(false));
    }, () => {
      dispatch(checkingAuthentication(false));
      clearApiToken();
    });
  };
}
