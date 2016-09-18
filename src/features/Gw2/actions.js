import upperFirst from 'lodash/upperFirst';

import {
  readSpecializations,
} from 'lib/gw2';

export const SHOW_TOOLTIP = 'SHOW_TOOLTIP';
export const FETCHING_SPECIALIZATIONS = 'FETCHING_SPECIALIZATIONS';
export const FETCH_SPECIALIZATIONS_RESULT = 'FETCH_SPECIALIZATIONS_RESULT';

const actions = {};
export default actions;

export function generateActions (resourceName, getResource) {
  const actionNames = {
    fetching: `FETCHING_${resourceName.toUpperCase()}`,
    result: `FETCH_${resourceName.toUpperCase()}_RESULT`,
  };

  const fetchMethodName = `fetch${upperFirst(resourceName)}`;
  const fetchingMethodName = `fetching${upperFirst(resourceName)}`;
  const fetchResultMethodName = `fetch${upperFirst(resourceName)}Result`;

  actions[fetchResultMethodName] = (data) => ({
    type: actionNames.result,
    payload: data,
  });

  actions[fetchingMethodName] = (fetching) => ({
    type: actionNames.fetching,
    payload: fetching,
  });

  actions[fetchMethodName] = (ids) => (dispatch) => {
    if (!ids) {
      return undefined;
    }

    dispatch(actions[fetchingMethodName](true));

    return getResource(ids)
      .then((response) => {
        dispatch(actions[fetchResultMethodName](response));
        dispatch(actions[fetchingMethodName](false));
      });
  };

  return actionNames;
}

export const fetchSpecializationsResultSuccess = (specializations) => ({
  type: FETCH_SPECIALIZATIONS_RESULT,
  payload: specializations,
});

export const fetchingSpecializations = (fetching) => ({
  type: FETCHING_SPECIALIZATIONS,
  payload: fetching,
});

export function fetchSpecializations (ids) {
  return (dispatch) => {
    dispatch(fetchingSpecializations(true));

    return readSpecializations(ids)
      .then((specializations) => {
        dispatch(fetchSpecializationsResultSuccess(specializations));
        dispatch(fetchingSpecializations(false));

        let traitsToAdd = [];

        Object.keys(specializations).forEach((key) => {
          const speciailization = specializations[key];

          traitsToAdd = traitsToAdd
            .concat(speciailization.major_traits, speciailization.minor_traits);
        });

        dispatch(actions.fetchTraits(traitsToAdd));
      });
  };
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
