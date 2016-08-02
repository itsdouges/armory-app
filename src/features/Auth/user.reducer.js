import {
  CLEAR_USER_DATA,
  AUTHENTICATE_USER,
  CHECKING_AUTHENTICATION,
} from './actions';

function clearUserDataReducer () {
  localStorage.removeItem('USER_TOKEN_LOCALSTORAGE_KEY');
  return {};
}

function authenticateUserReducer (state, action) {
  return {
    ...state,
    ...action.payload,
    loggedIn: true,
  };
}

function checkingAuthReducer (state, action) {
  return {
    ...state,
    checkingAuthentication: action.payload,
  };
}

export const defaultState = {
  checkingAuthentication: true,
};

export default (state, action) => {
  switch (action.type) {
    case CLEAR_USER_DATA:
      return clearUserDataReducer(state);

    case AUTHENTICATE_USER:
      return authenticateUserReducer(state, action);

    case CHECKING_AUTHENTICATION:
      return checkingAuthReducer(state, action);

    default:
      return undefined;
  }
};
