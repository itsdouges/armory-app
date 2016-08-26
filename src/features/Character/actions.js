import { get } from 'axios';
import config from 'env';
import { browserHistory } from 'react-router';
import {
  fetchItems,
  fetchSkins,
  fetchSpecializations,
} from 'features/Gw2/actions';

export const FETCH_CHARACTER_RESULT = 'FETCH_CHARACTER_RESULT';
export const FETCHING_CHARACTER = 'FETCHING_CHARACTER';
export const SELECT_CHARACTER = 'SELECT_CHARACTER';

const fetchingCharacter = (fetching) => ({
  type: FETCHING_CHARACTER,
  payload: fetching,
});

const fetchCharacterResultSuccess = (name, data) => ({
  type: FETCH_CHARACTER_RESULT,
  payload: {
    name,
    data,
  },
});

function filterIdsToFetch (state, { specializations = {}, equipment }) {
  const ids = {
    items: [],
    skins: [],
    specializations: [],
  };

  const currentSpecializations = state.specializations;
  const currentItems = state.items;
  const currentSkins = state.skins;

  Object.keys(specializations).forEach((key) => {
    const mode = specializations[key];
    mode.forEach((specialization) => {
      if (!specialization) {
        return;
      }

      if (!currentSpecializations.hasOwnProperty(specialization.id) &&
        ids.specializations.indexOf(specialization.id) === -1) {
        ids.specializations.push(specialization.id);
      }
    });
  });

  equipment.forEach((item) => {
    if (item.skin && !currentSkins.hasOwnProperty(item.skin)) {
      ids.skins.push(item.skin);
    }

    if (!currentItems.hasOwnProperty(item.id)) {
      ids.items.push(item.id);

      if (item.upgrades) {
        ids.items = ids.items.concat(item.upgrades);
      }
    }
  });

  return ids;
}

export function fetchCharacter (character) {
  return (dispatch, getState) => {
    dispatch(fetchingCharacter(true));

    return get(`${config.api.endpoint}characters/${character}`)
      .then(({ data }) => {
        dispatch(fetchCharacterResultSuccess(character, data));
        dispatch(fetchingCharacter(false));

        const currentState = getState();
        const idsForFetching = filterIdsToFetch(currentState, data);

        if (idsForFetching.items.length) {
          dispatch(fetchItems(idsForFetching.items));
        }

        if (idsForFetching.skins.length) {
          dispatch(fetchSkins(idsForFetching.skins));
        }

        if (idsForFetching.specializations.length) {
          dispatch(fetchSpecializations(idsForFetching.specializations));
        }
      }, () => browserHistory.replace('/404'));
  };
}

export const selectCharacter = (name) => ({
  type: SELECT_CHARACTER,
  payload: name,
});
