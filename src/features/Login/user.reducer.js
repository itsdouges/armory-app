import {
  FETCH_TOKEN_RESULT,
  FETCHING_TOKEN,
} from './actions';

function fetchTokenResultReducer (state, action) {
  const newState = {
    ...state,
    token: action.payload,
  };

  localStorage.setItem('USER_TOKEN_LOCALSTORAGE_KEY', action.payload);

  return newState;
}

function fetchingTokenReducer (state, action) {
  return {
    ...state,
    fetchingToken: !!action.payload,
  };
}

export const defaultState = {
  token: localStorage.getItem('USER_TOKEN_LOCALSTORAGE_KEY'),
};

export default (state, action) => {
  switch (action.type) {
    case FETCH_TOKEN_RESULT:
      return fetchTokenResultReducer(state, action);

    case FETCHING_TOKEN:
      return fetchingTokenReducer(state, action);

    default:
      return undefined;
  }
};
