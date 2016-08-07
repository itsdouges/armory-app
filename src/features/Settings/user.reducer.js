import {
  FETCHING_GW2_TOKENS,
  FETCH_GW2_TOKEN_RESULT,
  VALIDATING_GW2_TOKEN,
  VALIDATE_GW2_TOKEN_RESULT,
  ADDING_GW2_TOKEN,
  ADD_GW2_TOKEN_RESULT,
  INVALIDATE_GW2_TOKEN,
  REMOVE_GW2_TOKEN,
  CHANGING_PASSWORD,
  SELECT_PRIMARY_TOKEN,
} from './actions';

const addGw2TokenResultReducer = (state, action) => {
  const newState = {
    ...state,
  };

  newState.gw2Tokens.push(action.payload);

  return newState;
};

export const defaultState = {
  gw2Tokens: [],
};

export default function reducer (state, action) {
  switch (action.type) {
    case FETCHING_GW2_TOKENS:
      return {
        ...state,
        fetchingTokens: action.payload,
      };

    case FETCH_GW2_TOKEN_RESULT:
      return {
        ...state,
        gw2Tokens: action.payload,
      };

    case VALIDATING_GW2_TOKEN:
      return {
        ...state,
        validatingGw2Token: action.payload,
      };

    case VALIDATE_GW2_TOKEN_RESULT:
      return {
        ...state,
        gw2TokenError: action.error ? action.payload : undefined,
        validGw2Token: !action.error,
      };

    case ADDING_GW2_TOKEN:
      return {
        ...state,
        addingGw2Token: action.payload,
      };

    case ADD_GW2_TOKEN_RESULT:
      return addGw2TokenResultReducer(state, action);

    case INVALIDATE_GW2_TOKEN:
      return {
        ...state,
        validGw2Token: false,
      };

    case REMOVE_GW2_TOKEN:
      return {
        ...state,
        gw2Tokens: state.gw2Tokens.filter(({ token }) => token !== action.payload),
      };

    case CHANGING_PASSWORD:
      return {
        ...state,
        changingPassword: action.payload,
      };

    case SELECT_PRIMARY_TOKEN:
      return {
        ...state,
        gw2Tokens: state.gw2Tokens.map((token) => ({
          ...token,
          primary: token.token === action.payload,
        })),
      };

    default:
      return undefined;
  }
}
