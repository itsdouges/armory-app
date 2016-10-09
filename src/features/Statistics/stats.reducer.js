import {
  FETCH_STATISTICS,
} from './actions';

export const defaultState = {
  stats: {},
};

export default function reducer (state, action) {
  switch (action.type) {
    case FETCH_STATISTICS:
      return {
        ...action.payload,
      };

    default:
      return undefined;
  }
}
