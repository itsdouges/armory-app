import upperFirst from 'lodash/upperFirst';
import T from 'i18n-react';

import proxyFunc from 'lib/proxy';

export const SHOW_TOOLTIP = 'SHOW_TOOLTIP';

const actions = {};
export default actions;

const GW2API_REQUEST_LIMIT = 200;

function flattenResponses (responses) {
  return responses.reduce((obj, response) => ({
    ...obj,
    ...response,
  }), {});
}

export function generateActions (resourceName, getResource, afterGet) {
  const resouceNameUpper = resourceName.toUpperCase();
  const actionNames = {
    fetching: `FETCHING_${resouceNameUpper}`,
    result: `FETCH_${resouceNameUpper}_RESULT`,
    error: `FETCH_${resouceNameUpper}_ERROR`,
  };

  const parsedResourceName = upperFirst(resourceName);
  const fetchMethodName = `fetch${parsedResourceName}`;
  const fetchProxyMethodName = `__proxy__fetch${parsedResourceName}`;
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

  actions[fetchProxyMethodName] = proxyFunc(50)((ids, dispatch, getStore) => {
    if (!ids) {
      return undefined;
    }

    const store = getStore();

    const idsToFetch = ids.filter((id) => {
      const isValidId = id && +id !== -1;
      const isNotInStore = !store[resourceName][id] || store[resourceName][id].error;
      return isValidId && isNotInStore;
    });

    if (!idsToFetch.length) {
      return undefined;
    }

    dispatch(actions[fetchingMethodName](true));

    const requests = [];
    const idsToSlice = idsToFetch.concat([]);
    while (idsToSlice.length) {
      const slicedIds = idsToSlice.splice(0, GW2API_REQUEST_LIMIT);
      requests.push(getResource(slicedIds));
    }

    return Promise.all(requests)
      .then(flattenResponses)
      .then((response) => {
        dispatch(actions[fetchResultMethodName](response));
        dispatch(actions[fetchingMethodName](false));

        return afterGet ? afterGet(dispatch, response) : response;
      })
      .catch((data) => {
        const text = data.response.status === 404
          ? T.translate('messages.notFoundLong')
          : T.translate('messages.gw2ApiDown');

        dispatch(actions[fetchErrorMethodName](idsToFetch, text));

        throw data;
      });
  });

  actions[fetchMethodName] = (ids) => (dispatch, getStore) => {
    // Redux actions need to appear synchronous, so we have to
    // immediately returning a function. Internally however we're
    // proxying the implementation so all calls are collected
    // and then only one is fired instead of many.
    // This could use tweaking, but it works for now.
    return actions[fetchProxyMethodName](ids, dispatch, getStore);
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
