import upperFirst from 'lodash/upperFirst';
import T from 'i18n-react';

export const SHOW_TOOLTIP = 'SHOW_TOOLTIP';

const actions = {};
export default actions;

export function generateActions (resourceName, getResource, afterGet) {
  const actionNames = {
    fetching: `FETCHING_${resourceName.toUpperCase()}`,
    result: `FETCH_${resourceName.toUpperCase()}_RESULT`,
    error: `FETCH_${resourceName.toUpperCase()}_ERROR`,
  };

  const fetchMethodName = `fetch${upperFirst(resourceName)}`;
  const fetchingMethodName = `fetching${upperFirst(resourceName)}`;
  const fetchResultMethodName = `fetch${upperFirst(resourceName)}Result`;
  const fetchErrorMethodName = `fetch${upperFirst(resourceName)}Error`;

  actions[fetchResultMethodName] = (data) => ({
    type: actionNames.result,
    payload: data,
  });

  actions[fetchingMethodName] = (fetching) => ({
    type: actionNames.fetching,
    payload: fetching,
  });

  actions[fetchErrorMethodName] = (ids, message) => ({
    type: actionNames.error,
    payload: {
      ids,
      message,
    },
  });

  actions[fetchMethodName] = (ids) => (dispatch, getStore) => {
    if (!ids) {
      return undefined;
    }

    const store = getStore();

    const missingIds = ids.filter((id) => id).reduce((acc, id) => (
      store[resourceName][id] && !store[resourceName][id].error ? acc : acc.concat([id])
    ), []);

    if (!missingIds.length) {
      return undefined;
    }

    dispatch(actions[fetchingMethodName](true));

    return getResource(missingIds)
      .then((response) => {
        dispatch(actions[fetchResultMethodName](response));
        dispatch(actions[fetchingMethodName](false));

        return afterGet ? afterGet(dispatch, response) : response;
      }, ({ response }) => {
        const text = response.status === 404
          ? T.translate('messages.notFoundLong')
          : T.translate('messages.gw2ApiDown');

        dispatch(actions[fetchErrorMethodName](missingIds, text));
      });
  };

  return actionNames;
}

export function showTooltip (show, { type, data } = {}) {
  return {
    type: SHOW_TOOLTIP,
    payload: {
      show,
      type,
      data,
    },
  };
}
