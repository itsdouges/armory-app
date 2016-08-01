import { createSelector } from 'reselect';

import {
  REGISTERING_USER,
  REGISTER_USER_RESULT,
  INVALIDATE_EMAIL,
  VALIDATE_EMAIL_RESULT,
  VALIDATING_EMAIL,
  INVALIDATE_ALIAS,
  VALIDATE_ALIAS_RESULT,
  VALIDATING_ALIAS,
  VALIDATE_PASSWORDS,
} from './actions';

function registeringUserReducer (state, action) {
  const newState = {
    ...state,
    registering: action.payload,
  };

  return newState;
}

function registeringUserResultReducer (state, action) {
  const newState = {
    ...state,
    registerErrors: action.error ? action.payload : undefined,
    registerSuccess: !action.error,
  };

  return newState;
}

function invalidateEmail (state) {
  const newState = {
    ...state,
    emailValid: false,
  };

  return newState;
}

function validateEmailResultReducer (state, action) {
  const newState = {
    ...state,
    emailErrors: action.error ? action.payload : undefined,
    emailValue: !action.error ? action.payload : undefined,
    emailValid: !action.error,
  };

  return newState;
}

function validatingEmailReducer (state, action) {
  const newState = {
    ...state,
    emailValidating: action.payload,
  };

  return newState;
}

function invalidateAlias (state) {
  const newState = {
    ...state,
    aliasValid: false,
  };

  return newState;
}

function validateAliasResultReducer (state, action) {
  const newState = {
    ...state,
    aliasErrors: action.error ? action.payload : undefined,
    aliasValue: !action.error ? action.payload : undefined,
    aliasValid: !action.error,
  };

  return newState;
}

function validatingAliasReducer (state, action) {
  const newState = {
    ...state,
    aliasValidating: action.payload,
  };

  return newState;
}

function validatePasswordsReducer (state, action) {
  const newState = {
    ...state,
    passwordErrors: action.error ? action.payload : undefined,
    passwordValue: !action.error ? action.payload : undefined,
    passwordValid: !action.error,
  };

  return newState;
}

export const selector = createSelector(
  state => state.user,
  state => !!state.user.aliasValid && !!state.user.emailValid && !!state.user.passwordValue,
  (user, canRegister) => ({
    user,
    canRegister,
  })
);

export default function reduce (state = {}, action) {
  switch (action.type) {
    case REGISTERING_USER:
      return registeringUserReducer(state, action);

    case REGISTER_USER_RESULT:
      return registeringUserResultReducer(state, action);

    case INVALIDATE_EMAIL:
      return invalidateEmail(state);

    case VALIDATE_EMAIL_RESULT:
      return validateEmailResultReducer(state, action);

    case VALIDATING_EMAIL:
      return validatingEmailReducer(state, action);

    case INVALIDATE_ALIAS:
      return invalidateAlias(state);

    case VALIDATE_ALIAS_RESULT:
      return validateAliasResultReducer(state, action);

    case VALIDATING_ALIAS:
      return validatingAliasReducer(state, action);

    case VALIDATE_PASSWORDS:
      return validatePasswordsReducer(state, action);

    default:
      return state;
  }
}
