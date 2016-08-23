import axios from 'axios';
import config from 'env';
import { browserHistory } from 'react-router';

export const FETCHING_TOKEN = 'FETCHING_TOKEN';
export const FETCH_TOKEN_RESULT = 'FETCH_TOKEN_RESULT';

function fetchTokenSuccess (token) {
  return {
    type: FETCH_TOKEN_RESULT,
    payload: token,
  };
}

function fetchTokenError (message) {
  return {
    type: FETCH_TOKEN_RESULT,
    error: true,
    payload: message,
  };
}

function fetchingToken (fetching) {
  return {
    type: FETCHING_TOKEN,
    payload: !!fetching,
  };
}

export function fetchToken (email, password) {
  return (dispatch) => {
    dispatch(fetchingToken(true));

    return axios
      .post(`${config.api.endpoint}token`, {
        username: email,
        password,
        grant_type: 'password',
      }, {
        headers: {
          Authorization: `Basic ${config.api.token}`,
        },
      })
      .then((response) => {
        const combinedToken = `${response.data.token_type} ${response.data.access_token}`;

        dispatch(fetchTokenSuccess(combinedToken));
        dispatch(fetchingToken(false));
        browserHistory.push('/me');
      }, ({ response }) => {
        dispatch(fetchTokenError(response.data.error_description));
        dispatch(fetchingToken(false));
      });
  };
}
