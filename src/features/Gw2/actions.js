import upperFirst from 'lodash/upperFirst';
import T from 'i18n-react';

export const SHOW_TOOLTIP = 'SHOW_TOOLTIP';

const actions = {};
export default actions;

export function generateActions (resourceName, getResource, afterGet) {
  const resouceNameUpper = resourceName.toUpperCase();
  const actionNames = {
    fetching: `FETCHING_${resouceNameUpper}`,
    result: `FETCH_${resouceNameUpper}_RESULT`,
    error: `FETCH_${resouceNameUpper}_ERROR`,
  };

  const parsedResourceName = upperFirst(resourceName);
  const fetchMethodName = `fetch${parsedResourceName}`;
  const fetchingMethodName = `fetching${parsedResourceName}`;
  const fetchResultMethodName = `fetch${parsedResourceName}Result`;
  const fetchErrorMethodName = `fetch${parsedResourceName}Error`;

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

    const missingIds = ids.filter((id) => {
      const isValidId = id && id !== -1;
      const isNotInStore = !store[resourceName][id] || store[resourceName][id].error;
      return isValidId && isNotInStore;
    });

    if (!missingIds.length) {
      return undefined;
    }

    dispatch(actions[fetchingMethodName](true));

    return getResource(missingIds)
      .then((response) => {
        dispatch(actions[fetchResultMethodName](response));
        dispatch(actions[fetchingMethodName](false));

        return afterGet ? afterGet(dispatch, response) : response;
      })
      .catch((data) => {
        const text = data.response.status === 404
          ? T.translate('messages.notFoundLong')
          : T.translate('messages.gw2ApiDown');

        dispatch(actions[fetchErrorMethodName](missingIds, text));

        throw data;
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
