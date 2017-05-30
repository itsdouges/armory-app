// @flow

import axios from 'axios';
import config from 'config';
import history from 'history';
import get from 'lodash/get';
import forEach from 'lodash/forEach';

import actions from 'features/Gw2/actions';

export const FETCH_CHARACTER_RESULT = 'FETCH_CHARACTER_RESULT';
export const FETCHING_CHARACTER = 'FETCHING_CHARACTER';
export const SELECT_CHARACTER = 'SELECT_CHARACTER';
export const SELECT_CHARACTER_MODE = 'SELECT_CHARACTER_MODE';
export const UPDATE_CHARACTER = 'UPDATE_CHARACTER';
export const UPDATE_CHARACTER_PRIVACY = 'UPDATE_CHARACTER_PRIVACY';

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

function extractIds ({ specializations, equipment, equipment_pvp, skills }) {
  const ids = {
    items: [],
    skins: [],
    specializations: [],
    amulets: [],
    pets: [],
  };

  specializations && Object.keys(specializations).forEach((key) => {
    const mode = specializations[key];
    mode.forEach((specialization) => {
      if (!specialization) {
        return;
      }

      ids.specializations.push(specialization.id);
    });
  });

  equipment && equipment.forEach((item) => {
    ids.skins.push(item.skin);
    ids.items.push(item.id);

    if (item.upgrades) {
      ids.items = ids.items.concat(item.upgrades);
    }

    if (item.infusions) {
      ids.items = ids.items.concat(item.infusions);
    }
  });

  if (equipment_pvp) {
    ids.items = ids.items.concat(equipment_pvp.sigils);
    ids.items.push(equipment_pvp.rune);
    ids.amulets.push(equipment_pvp.amulet);
  }

  forEach(skills, ({ pets }) => {
    pets && (ids.pets = ids.pets.concat(pets.terrestrial));
  });

  return ids;
}

export function fetchCharacter (character: string, { redirect404 = true, basicLoad }: {
  redirect404: boolean,
  basicLoad: boolean,
} = {}): ReduxThunk {
  return (dispatch) => {
    dispatch(fetchingCharacter(true));

    return axios.get(`${config.api.endpoint}characters/${character}`)
      .then(({ data }) => {
        dispatch(fetchCharacterResultSuccess(character, data));
        dispatch(fetchingCharacter(false));

        const { items, skins, specializations, amulets, pets } = extractIds(data);

        const skills = Object.keys(get(data, 'skills', {})).reduce((acc, key) => {
          const skillType = data.skills[key];
          return acc.concat([skillType.elite, skillType.heal]).concat(skillType.utilities);
        }, []);

        dispatch(actions.fetchItems(items));
        dispatch(actions.fetchSkins(skins));
        dispatch(actions.fetchProfessions([data.profession]));

        if (!basicLoad) {
          dispatch(actions.fetchTitles([data.title]));
          dispatch(actions.fetchPets(pets));
          dispatch(actions.fetchSkills(skills));
          dispatch(actions.fetchAmulets(amulets));
          dispatch(actions.fetchSpecializations(specializations));
        }
      }, () => redirect404 && history.replace('/404'));
  };
}

function updateCharacterAuth (name, authorization) {
  return {
    type: UPDATE_CHARACTER,
    payload: {
      name,
      authorization,
    },
  };
}

export function updateCharacter (
  name: string,
  options: {| showPublic: boolean |},
): ReduxThunk {
  return (dispatch) => {
    dispatch(updateCharacterAuth(name, options));
    return axios.put(`${config.api.endpoint}characters/${name}`, options);
  };
}

export const updatePrivacy = (name: string, prop: string, action: string) => ({
  type: UPDATE_CHARACTER_PRIVACY,
  payload: {
    name,
    prop,
    action,
  },
});

export function setPrivacy (name: string, prop: string): ReduxThunk {
  return (dispatch) => {
    dispatch(updatePrivacy(name, prop, 'add'));
    return axios.put(`${config.api.endpoint}characters/${name}/privacy`, {
      privacy: prop,
    });
  };
}

export function removePrivacy (name: string, prop: string): ReduxThunk {
  return (dispatch) => {
    dispatch(updatePrivacy(name, prop, 'remove'));
    return axios.delete(`${config.api.endpoint}characters/${name}/privacy/${prop}`);
  };
}

export const selectCharacter = (name: string) => ({
  type: SELECT_CHARACTER,
  payload: name,
});

export const selectCharacterMode = (mode: 'pvp' | 'pve' | 'wvw') => ({
  type: SELECT_CHARACTER_MODE,
  payload: mode,
});
