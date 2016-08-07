import { get } from 'axios';

import config from 'env';
import gw2Parse from 'lib/gw2/parse';
// import * as gw2 from '../gw2-data';

export const FETCH_CHARACTER_RESULT = 'FETCH_CHARACTER_RESULT';
export const FETCHING_CHARACTER = 'FETCHING_CHARACTER';
export const SELECT_CHARACTER = 'SELECT_CHARACTER';

export const fetchingCharacter = (fetching) => ({
  type: FETCHING_CHARACTER,
  payload: fetching,
});

export const fetchCharacterResultSuccess = (name, data) => ({
  type: FETCH_CHARACTER_RESULT,
  payload: {
    name,
    data,
  },
});

// TODO: Action is getting a bit beefy. Refactortractor needed.
export function fetchCharacterThunk (character, authenticated) {
    return (dispatch, getState) => {
        dispatch(fetchingCharacter(true));

        let url = authenticated ? `${config.api.endpoint}users/me/characters/${character}` : `${config.api.endpoint}characters/${character}`;

        return axios
            .get(url)
            .then((response) => {
                let data = gw2Parse.parseCharacter(response.data);
                dispatch(fetchCharacterResultSuccess(character, data));
                dispatch(fetchingCharacter(false));
                
                let state = getState();
                let ids = filterIdsToFetch(state, response.data);

                if (ids.items.length) {
                    dispatch(gw2.actionCreators.fetchItemsThunk(ids.items));
                }

                if (ids.skins.length) {
                    dispatch(gw2.actionCreators.fetchSkinsThunk(ids.skins));
                }

                if (ids.specializations.length) {
                    dispatch(gw2.actionCreators.fetchSpecializationsThunk(ids.specializations));
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };
}

export function filterIdsToFetch (state, character) {
  const ids = {
    items: [],
    skins: [],
    specializations: []
  };

  const currentItems = state.gw2.items.data;
  const currentSkins = state.gw2.skins.data;
  const currentSpecializations = state.gw2.specializations.data;

  for (let gameMode in character.specializations) {
      if (!character.specializations.hasOwnProperty(gameMode)) {
          continue;
      }

      character.specializations[gameMode].forEach((specialization) => {
          if (!specialization) {
              return;
          }

          if (!currentSpecializations.hasOwnProperty(specialization.id) && ids.specializations.indexOf(specialization.id) === -1) {
              ids.specializations.push(specialization.id);
          }
      });
  }

  character.equipment.forEach((item) => {
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

// export const fetchUserCharactersThunk = (user) => (dispatch) =>
//   get(`${config.api.endpoint}users/me/characters`)
//   .then((response) => {
//     dispatch(fetchUserCharactersResult(user, response.data));
//   });

export const selectCharacter = (name) => ({
  type: SELECT_CHARACTER,
  payload: name,
});
