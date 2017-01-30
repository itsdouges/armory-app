import { get, post } from 'axios';

import { fetchToken } from 'features/Login/actions';
import config from 'config';

export const REGISTERING_USER = 'REGISTERING_USER';
export const REGISTER_USER_RESULT = 'REGISTER_USER_RESULT';
export const INVALIDATE_EMAIL = 'INVALIDATE_EMAIL';
export const VALIDATE_EMAIL_RESULT = 'VALIDATE_EMAIL_RESULT';
export const VALIDATING_EMAIL = 'VALIDATING_EMAIL';
export const INVALIDATE_ALIAS = 'INVALIDATE_ALIAS';
export const VALIDATE_ALIAS_RESULT = 'VALIDATE_ALIAS_RESULT';
export const VALIDATING_ALIAS = 'VALIDATING_ALIAS';
export const VALIDATE_PASSWORDS = 'VALIDATE_PASSWORDS';

function isRegistering (registering) {
  return {
    type: REGISTERING_USER,
    payload: !!registering,
  };
}

function registerResultSuccess () {
  return {
    type: REGISTER_USER_RESULT,
  };
}

function registerResultError (message) {
  return {
    type: REGISTER_USER_RESULT,
    payload: message,
    error: true,
  };
}

export function register (user) {
  return (dispatch) => {
    dispatch(isRegistering(true));

    const mappedUser = {
      alias: user.alias,
      email: user.email,
      password: user.password,
      apiToken: user.apiToken,
    };

    const url = mappedUser.apiToken
      ? `${config.api.endpoint}claim/user`
      : `${config.api.endpoint}users`;

    return post(url, mappedUser)
      .then(() => {
        dispatch(registerResultSuccess());
        dispatch(fetchToken(mappedUser.email, mappedUser.password));
      }, (response) => {
        dispatch(registerResultError(response.data));
        dispatch(isRegistering(false));
      });
  };
}

function validatingEmail (validating) {
  return {
    type: VALIDATING_EMAIL,
    payload: validating,
  };
}

function validateEmailSuccess (email) {
  return {
    type: VALIDATE_EMAIL_RESULT,
    payload: email,
  };
}

function validateEmailError (error) {
  return {
    type: VALIDATE_EMAIL_RESULT,
    payload: error[0],
    error: true,
  };
}

export function invalidateEmail () {
  return {
    type: INVALIDATE_EMAIL,
  };
}

export function validateEmail (email) {
  return (dispatch) => {
    dispatch(validatingEmail(true));

    return get(`${config.api.endpoint}users/check/email/${email}`)
      .then(() => {
        dispatch(validateEmailSuccess(email));
        dispatch(validatingEmail(false));
      }, ({ response }) => {
        dispatch(validateEmailError(response.data));
        dispatch(validatingEmail(false));
      });
  };
}

export function invalidateAlias () {
  return {
    type: INVALIDATE_ALIAS,
  };
}

function validatingAlias (validating) {
  return {
    type: VALIDATING_ALIAS,
    payload: validating,
  };
}

function checkAliasSuccess (alias) {
  return {
    type: VALIDATE_ALIAS_RESULT,
    payload: alias,
  };
}

function checkAliasError (error) {
  return {
    type: VALIDATE_ALIAS_RESULT,
    payload: error[0],
    error: true,
  };
}

export function validateAlias (alias) {
  return (dispatch) => {
    if (!alias) {
      dispatch(invalidateAlias());
    }

    dispatch(validatingAlias(true));

    return get(`${config.api.endpoint}users/check/alias/${alias}`)
      .then(() => {
        dispatch(checkAliasSuccess(alias));
        dispatch(validatingAlias(false));
      }, ({ response }) => {
        dispatch(checkAliasError(response.data));
        dispatch(validatingAlias(false));
      });
  };
}

function checkPasswordsSuccess (password) {
  return {
    type: VALIDATE_PASSWORDS,
    payload: password,
  };
}

function checkPasswordsFailure (errors) {
  return {
    type: VALIDATE_PASSWORDS,
    payload: errors[0],
    error: true,
  };
}

export function validatePasswords (password1, password2) {
  const isStrong = /(?=^.{8,}$)(?=.*[A-Z])(?=.*[a-z]).*$/.test(password1);
  const passwordsMatch = password1 === password2;

  const errors = [];

  if (!isStrong) {
    errors.push(
      'Needs 8 or more characters with at least one being uppercase.'
    );
  }

  if (!passwordsMatch) {
    errors.push('Make your passwords match!');
  }

  if (errors.length) {
    return checkPasswordsFailure(errors);
  }

  return checkPasswordsSuccess(password1);
}
