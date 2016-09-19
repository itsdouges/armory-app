import { get } from 'axios';
import config from 'env';
import { browserHistory } from 'react-router';
import actions from 'features/Gw2/actions';

export const FETCH_CHARACTER_RESULT = 'FETCH_CHARACTER_RESULT';
export const FETCHING_CHARACTER = 'FETCHING_CHARACTER';
export const SELECT_CHARACTER = 'SELECT_CHARACTER';
export const SELECT_CHARACTER_MODE = 'SELECT_CHARACTER_MODE';

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

function extractIds ({ specializations = {}, equipment }) {
  const ids = {
    items: [],
    skins: [],
    specializations: [],
  };

  Object.keys(specializations).forEach((key) => {
    const mode = specializations[key];
    mode.forEach((specialization) => {
      if (!specialization) {
        return;
      }

      ids.specializations.push(specialization.id);
    });
  });

  equipment.forEach((item) => {
    ids.skins.push(item.skin);
    ids.items.push(item.id);

    if (item.upgrades) {
      ids.items = ids.items.concat(item.upgrades);
    }

    if (item.infusions) {
      ids.items = ids.items.concat(item.infusions);
    }
  });

  return ids;
}

export function fetchCharacter (character) {
  return (dispatch) => {
    dispatch(fetchingCharacter(true));

    return get(`${config.api.endpoint}characters/${character}`)
      .then(({ data }) => {
        dispatch(fetchCharacterResultSuccess(character, data));
        dispatch(fetchingCharacter(false));

        const { items, skins, specializations } = extractIds(data);

        const skills = Object.keys(data.skills).reduce((acc, key) => {
          const skillType = data.skills[key];
          return acc.concat([skillType.elite, skillType.heal]).concat(skillType.utilities);
        }, []);

        dispatch(actions.fetchSkills(skills));
        dispatch(actions.fetchItems(items));
        dispatch(actions.fetchSkins(skins));
        dispatch(actions.fetchSpecializations(specializations));
      }, () => browserHistory.replace('/404'));
  };
}

export const selectCharacter = (name) => ({
  type: SELECT_CHARACTER,
  payload: name,
});

export const selectCharacterMode = (mode) => ({
  type: SELECT_CHARACTER_MODE,
  payload: mode,
});
