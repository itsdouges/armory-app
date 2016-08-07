import { get, put, post, delete as del } from 'axios';
import config from 'env';

export const FETCHING_GW2_TOKENS = 'FETCHING_GW2_TOKENS';
export const FETCH_GW2_TOKEN_RESULT = 'FETCH_GW2_TOKEN_RESULT';
export const SELECT_PRIMARY_TOKEN = 'SELECT_PRIMARY_TOKEN';
export const ADDING_GW2_TOKEN = 'ADDING_GW2_TOKEN';
export const ADD_GW2_TOKEN_RESULT = 'ADD_GW2_TOKEN_RESULT';
export const REMOVE_GW2_TOKEN = 'REMOVE_GW2_TOKEN';
export const INVALIDATE_GW2_TOKEN = 'INVALIDATE_GW2_TOKEN';
export const VALIDATING_GW2_TOKEN = 'VALIDATING_GW2_TOKEN';
export const VALIDATE_GW2_TOKEN_RESULT = 'VALIDATE_GW2_TOKEN_RESULT';
export const CHANGE_PASSWORD_RESULT = 'CHANGE_PASSWORD_RESULT';
export const CHANGING_PASSWORD = 'CHANGING_PASSWORD';

function changingPassword (changing) {
  return {
    type: CHANGING_PASSWORD,
    payload: !!changing,
  };
}

export function changePassword (currentPassword, password) {
  return (dispatch) => {
    dispatch(changingPassword(true));

    return put(`${config.api.endpoint}users/me/password`, {
      password,
      currentPassword,
    })
    .then(() => {
      dispatch(changingPassword(false));
    }, () => {
      dispatch(changingPassword(false));
    });
  };
}

function fetchingGw2Tokens (fetching) {
  return {
    type: FETCHING_GW2_TOKENS,
    payload: !!fetching,
  };
}

function fetchGw2TokensSuccess (tokens) {
  return {
    type: FETCH_GW2_TOKEN_RESULT,
    payload: tokens,
  };
}

function addingGw2Token (adding) {
  return {
    type: ADDING_GW2_TOKEN,
    payload: !!adding,
  };
}

function addGw2TokenResultSuccess (token) {
  return {
    type: ADD_GW2_TOKEN_RESULT,
    payload: token,
  };
}

function validateGw2TokenResultSuccess () {
  return {
    type: VALIDATE_GW2_TOKEN_RESULT,
  };
}

function validateGw2TokenResultError (message) {
  return {
    type: VALIDATE_GW2_TOKEN_RESULT,
    error: true,
    payload: message,
  };
}

function validatingGw2Token (validating) {
  return {
    type: VALIDATING_GW2_TOKEN,
    payload: !!validating,
  };
}

export function validateGw2Token (token) {
  return (dispatch) => {
    dispatch(validatingGw2Token(true));

    return get(`${config.api.endpoint}users/check/gw2-token/${token}`)
      .then(() => {
        dispatch(validateGw2TokenResultSuccess());
        dispatch(validatingGw2Token(false));
      }, ({ response }) => {
        dispatch(validateGw2TokenResultError(response.data));
        dispatch(validatingGw2Token(false));
      });
  };
}

export function addGw2Token (token) {
  return (dispatch) => {
    dispatch(addingGw2Token(true));

    return post(`${config.api.endpoint}users/me/gw2-tokens`, {
      token,
    })
    .then((response) => {
      dispatch(addGw2TokenResultSuccess(response.data));
      dispatch(invalidateGw2Token());
      dispatch(addingGw2Token(false));
    });
  };
}

export function fetchGw2Tokens () {
  return (dispatch) => {
    dispatch(fetchingGw2Tokens(true));

    return get(`${config.api.endpoint}users/me/gw2-tokens`)
      .then((response) => {
        dispatch(fetchGw2TokensSuccess(response.data));
        dispatch(fetchingGw2Tokens(false));
      });
  };
}

function deleteGw2Token (token) {
  return {
    type: REMOVE_GW2_TOKEN,
    payload: token,
  };
}

function invalidateGw2Token () {
  return {
    type: INVALIDATE_GW2_TOKEN,
  };
}

export function removeGw2Token (token) {
  return (dispatch) => {
    dispatch(deleteGw2Token(token));

    return del(`${config.api.endpoint}users/me/gw2-tokens/${token}`);
  };
}

function selectPrimaryToken (token) {
  return {
    type: SELECT_PRIMARY_TOKEN,
    payload: token,
  };
}

export function selectPrimaryGw2Token (token) {
  return (dispatch) => {
    dispatch(selectPrimaryToken(token));
    return put(`${config.api.endpoint}users/me/gw2-tokens/${token}/set-primary`);
  };
}
