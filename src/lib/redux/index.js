// @flow

import get from 'lodash/get';

// eslint-disable-next-line import/prefer-default-export
export const paginatedThunk = (thunk: ReduxThunk, selector: string, limit: number, offset: number) =>
  (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    const selected = get(state, selector, {});
    const needsFetch = !selected.rows || !selected.rows.slice(offset, limit).length;

    if (!needsFetch) {
      return Promise.resolve();
    }

    return thunk(dispatch, getState);
  };
