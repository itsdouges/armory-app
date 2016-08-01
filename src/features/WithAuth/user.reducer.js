import {
  CLEAR_USER_DATA,
  AUTHENTICATE_USER,
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

export default (state, action) => {
  switch (action.type) {
    case CLEAR_USER_DATA:
      return clearUserDataReducer(state);

    case AUTHENTICATE_USER:
      return authenticateUserReducer(state, action);

    default:
      return undefined;
  }
};
