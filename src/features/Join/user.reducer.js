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

export const selector = createSelector(
  (state) => state.user,
  (state) => !!state.user.aliasValid && !!state.user.emailValid && !!state.user.passwordValue,
  (user, canRegister) => ({
    user,
    canRegister,
  })
);

export default (state, action) => {
  switch (action.type) {
    case REGISTERING_USER:
      return {
        ...state,
        registering: action.payload,
      };

    case REGISTER_USER_RESULT:
      return action.error ? {
        ...state,
        registerErrors: action.error ? action.payload : undefined,
      } : {};

    case INVALIDATE_EMAIL:
      return {
        ...state,
        emailValid: false,
      };

    case VALIDATE_EMAIL_RESULT:
      return {
        ...state,
        emailErrors: action.error ? action.payload : undefined,
        emailValue: !action.error ? action.payload : undefined,
        emailValid: !action.error,
      };

    case VALIDATING_EMAIL:
      return {
        ...state,
        emailValidating: action.payload,
      };

    case INVALIDATE_ALIAS:
      return {
        ...state,
        aliasValid: false,
      };

    case VALIDATE_ALIAS_RESULT:
      return {
        ...state,
        aliasErrors: action.error ? action.payload : undefined,
        aliasValue: !action.error ? action.payload : undefined,
        aliasValid: !action.error,
      };

    case VALIDATING_ALIAS:
      return {
        ...state,
        aliasValidating: action.payload,
      };

    case VALIDATE_PASSWORDS:
      return {
        ...state,
        passwordErrors: action.error ? action.payload : undefined,
        passwordValue: !action.error ? action.payload : undefined,
        passwordValid: !action.error,
      };

    default:
      return undefined;
  }
};
