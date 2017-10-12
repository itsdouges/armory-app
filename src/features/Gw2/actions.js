import upperFirst from 'lodash/upperFirst';
import uniq from 'lodash/uniq';
import T from 'i18n-react';
import batchFunction from 'function-batch';

export const SHOW_TOOLTIP = 'SHOW_TOOLTIP';
export const FETCH_CALCULATED_ITEMSTATS = 'FETCH_CALCULATED_ITEMSTATS';

const actions = {};
export default actions;

const GW2API_REQUEST_LIMIT = 200;

function flattenResponses (responses) {
  return responses.reduce((obj, response) => ({
    ...obj,
    ...response,
  }), {});
}

const getActualId = (id) => id && +(typeof id === 'object' ? (id.calculatedId || id.id) : id);

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

  actions[fetchResultMethodName] = (data, noCache = []) => ({
    type: actionNames.result,
    payload: {
      data,
      noCache,
    },
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

  actions[fetchProxyMethodName] = batchFunction((ids, noCache, dispatch, getStore) => {
    if (!ids) {
      return undefined;
    }

    const store = getStore();

    const idsToFetch = uniq(ids.filter((id) => {
      // Sometimes we'll call with more complicated objects for the request
      // We filter them, then pass them along to the service (for example lib/gw2/readCalculatedItemStats)
      // If calculatedId exists, use that.
      const actualId = getActualId(id);
      const isValidId = (id === 'all') || (actualId && actualId !== -1);
      if (!isValidId) {
        return false;
      }

      const isNotInStore = !store[resourceName][actualId] || !!store[resourceName][actualId].error;
      return isNotInStore;
    }));

    if (!idsToFetch.length) {
      return undefined;
    }

    dispatch(actions[fetchingMethodName](true));

    const requests = [];
    const idsToSlice = [].concat(idsToFetch);
    while (idsToSlice.length) {
      const slicedIds = idsToSlice.splice(0, GW2API_REQUEST_LIMIT);
      requests.push(getResource(slicedIds));
    }

    return Promise.all(requests)
      .then(flattenResponses)
      .then((response) => {
        dispatch(actions[fetchResultMethodName](response, noCache));
        dispatch(actions[fetchingMethodName](false));

        const missingIds = idsToFetch.map(getActualId).filter((id) => !response[id]);
        if (missingIds.length) {
          dispatch(actions[fetchErrorMethodName](missingIds, T.translate('messages.notFoundLong')));
        }

        return afterGet ? afterGet(dispatch, response) : response;
      })
      .catch((data) => {
        const text = data.response && data.response.status === 404
          ? T.translate('messages.notFoundLong')
          : T.translate('messages.gw2ApiDown');

        dispatch(actions[fetchErrorMethodName](idsToFetch, text));

        throw data;
      });
  }, 50);

  actions[fetchMethodName] = (ids, noCache = []) => (dispatch, getStore) => {
    // Redux actions need to appear synchronous, so we have to
    // immediately returning a function. Internally however we're
    // proxying the implementation so all calls are collected
    // and then only one is fired instead of many.
    // This could use tweaking, but it works for now.
    return actions[fetchProxyMethodName](ids, noCache, dispatch, getStore);
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
